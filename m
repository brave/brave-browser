/* Copyright (c) 2022 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

package org.chromium.chrome.browser.app.helpers;

import static org.chromium.ui.base.ViewUtils.dpToPx;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Rect;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.text.TextUtils;
import android.util.Base64;
import android.util.DisplayMetrics;
import android.webkit.URLUtil;
import android.widget.ImageView;

import com.bumptech.glide.Priority;
import com.bumptech.glide.RequestBuilder;
import com.bumptech.glide.RequestManager;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.load.resource.bitmap.BitmapTransformation;
import com.bumptech.glide.load.resource.bitmap.CircleCrop;
import com.bumptech.glide.load.resource.bitmap.FitCenter;
import com.bumptech.glide.load.resource.bitmap.RoundedCorners;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.CustomTarget;
import com.bumptech.glide.request.target.Target;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;
import org.xmlpull.v1.XmlSerializer;

import org.chromium.base.Callbacks;
import org.chromium.base.ContextUtils;
import org.chromium.chrome.browser.app.BraveActivity;
import org.chromium.chrome.browser.content.WebContentsFactory;
import org.chromium.chrome.browser.crypto_wallet.util.Utils;
import org.chromium.chrome.browser.crypto_wallet.util.WalletConstants;
import org.chromium.chrome.browser.profiles.Profile;
import org.chromium.chrome.browser.ui.favicon.FaviconHelper;
import org.chromium.chrome.browser.util.ConfigurationUtils;
import org.chromium.components.image_fetcher.ImageFetcher;
import org.chromium.components.image_fetcher.ImageFetcher.Params;
import org.chromium.components.image_fetcher.ImageFetcherConfig;
import org.chromium.components.image_fetcher.ImageFetcherFactory;
import org.chromium.content_public.browser.WebContents;
import org.chromium.net.NetId;
import org.chromium.url.GURL;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.ref.WeakReference;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ImageLoader {
    private static final String TAG = "ImageLoader";
    private static final String UNUSED_CLIENT_NAME = "unused";
    private static final String BASE64_ENCODING_PATTERN =
            "^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$";
    private static final String ATT_VALUE_1000_PX = "1000px";
    private static final String SVG_TAG = "svg";
    private static final String DATA_IMAGE_SVG_UTF8_PREFIX = "data:image/svg+xml;utf8,";

    private static FaviconHelper sFaviconHelper;
    private static FaviconHelper.DefaultFaviconHelper sFaviconThemeHelper;

    private static void downloadImage(String url, final RequestManager requestManager,
            final boolean isCircular, final int roundedCorners, final ImageView imageView,
            final CustomTarget<Drawable> customTarget, final Callback callback) {
        if (!isValidImgUrl(url)) {
            if (callback != null) callback.onLoadFailed();
            return;
        }

        Resources resources = ContextUtils.getApplicationContext().getResources();
        Profile profile = Utils.getProfile(false);
        if (isSvg(url)) {
            final String validUrl;
            if (URLUtil.isDataUrl(url)) {
                if (isBase64Encoded(url)) {
                    String decodedUrl = decodeBase64SvgUrl(url);
                    validUrl = sanitizeSvg(decodedUrl);
                } else if (isUtf8(url)) {
                    validUrl = sanitizeSvg(url);
                } else {
                    // Unsupported URL type.
                    if (callback != null) callback.onLoadFailed();
                    return;
                }
                if (TextUtils.isEmpty(validUrl)) {
                    // This may happen for invalid, or corrupted URLs.
                    if (callback != null) callback.onLoadFailed();
                    return;
                }
            } else {
                validUrl = url;
            }

            WebContents webContents =
                    WebContentsFactory.createWebContentsWithWarmRenderer(
                            profile, true, NetId.INVALID);
            webContents.downloadImage(
                    new GURL(validUrl), // Url
                    false, // isFavIcon
                    WalletConstants.MAX_BITMAP_SIZE_FOR_DOWNLOAD, // maxBitmapSize
                    false, // bypassCache
                    (id, httpStatusCode, imageUrl, bitmaps, originalImageSizes) -> { // callback
                        ImageFetcherFacade imageFetcherFacade;
                        Iterator<Bitmap> iterBitmap = bitmaps.iterator();
                        Iterator<Rect> iterSize = originalImageSizes.iterator();
                        Bitmap bestBitmap = null;
                        Rect bestSize = new Rect(0, 0, 0, 0);
                        while (iterBitmap.hasNext() && iterSize.hasNext()) {
                            Bitmap bitmap = iterBitmap.next();
                            Rect size = iterSize.next();
                            if (size.width() > bestSize.width()
                                    && size.height() > bestSize.height()) {
                                bestBitmap = bitmap;
                                bestSize = size;
                            }
                        }
                        if (bestSize.width() == 0 || bestSize.height() == 0) {
                            imageFetcherFacade = null;
                        } else {
                            BitmapDrawable bitmapDrawable =
                                    new BitmapDrawable(resources, bestBitmap);
                            imageFetcherFacade = new ImageFetcherFacade(bitmapDrawable);
                        }
                        loadImage(
                                imageFetcherFacade,
                                requestManager,
                                isCircular,
                                roundedCorners,
                                imageView,
                                customTarget,
                                callback);
                    });
        } else {
            ImageFetcher imageFetcher =
                    ImageFetcherFactory.createImageFetcher(
                            ImageFetcherConfig.NETWORK_ONLY, profile.getProfileKey());
            if (isGif(url)) {
                imageFetcher.fetchGif(
                        Params.create(new GURL(url), UNUSED_CLIENT_NAME),
                        gifImage -> {
                            ImageFetcherFacade imageFetcherFacade =
                                    new ImageFetcherFacade(gifImage.getData());
                            loadImage(
                                    imageFetcherFacade,
                                    requestManager,
                                    isCircular,
                                    roundedCorners,
                                    imageView,
                                    customTarget,
                                    callback);
                        });
            } else {
                imageFetcher.fetchImage(
                        Params.create(new GURL(url), UNUSED_CLIENT_NAME),
                        bitmap -> {
                            BitmapDrawable bitmapDrawable = new BitmapDrawable(resources, bitmap);
                            ImageFetcherFacade imageFetcherFacade =
                                    new ImageFetcherFacade(bitmapDrawable);
                            loadImage(
                                    imageFetcherFacade,
                                    requestManager,
                                    isCircular,
                                    roundedCorners,
                                    imageView,
                                    customTarget,
                                    callback);
                        });
            }
        }
    }

    /**
     * Downloads an image from a given URL, including support for GIF and SVG image types.
     * @param url URL of the image to download.
     * @param RequestManager Glide request manager for applying transformations.
     * @param isCircular When {@code true}, a circular transformation will be applied.
     * @param roundedCorners Radius of the circle used to round the corners in dip. Unused when
     *         {@code isCircular} is {@code true}.
     * @param customTarget Custom target where the downloaded image will be used.
     * @param callback Callback used to notify if the image has been set correctly. It can be {@code
     *         null}.
     */
    public static void downloadImage(String url, final RequestManager requestManager,
            final boolean isCircular, final int roundedCorners,
            final CustomTarget<Drawable> customTarget, final Callback callback) {
        downloadImage(
                url, requestManager, isCircular, roundedCorners, null, customTarget, callback);
    }

    /**
     * Downloads an image from a given URL, including support for GIF and SVG image types.
     * @param url URL of the image to download.
     * @param RequestManager Glide request manager for applying transformations.
     * @param isCircular When {@code true}, a circular transformation will be applied.
     * @param roundedCorners Radius of the circle used to round the corners in dip. Unused when
     *         {@code isCircular} is {@code true}.
     * @param imageView ImageView where the downloaded image will be set.
     * @param callback Callback used to notify if the image has been set correctly. It can be {@code
     *         null}.
     */
    public static void downloadImage(String url, final RequestManager requestManager,
            final boolean isCircular, final int roundedCorners, final ImageView imageView,
            final Callback callback) {
        downloadImage(url, requestManager, isCircular, roundedCorners, imageView, null, callback);
    }

    /**
     * Parses an input string as an XML document, manipulates it to add the missing attributes to
     * the svg tag, and then serializes it back to a string. If the input string is not a valid SVG
     * image, the method returns null.
     * <p>
     * Note that this implementation assumes that the input string is a valid SVG image and does
     * not perform any further validation or sanitation of the contents of the image.
     *
     * @param input Input string to sanitize.
     * @return sanitized string with 'width' and 'height' attributes set in the 'svg' tag.
     */
    public static String sanitizeSvg(String input) {
        try {
            // Create an XmlPullParser instance.
            XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
            XmlPullParser parser = factory.newPullParser();

            // Set input source for parser.
            parser.setInput(new StringReader(input));

            // Find start tag.
            int eventType = parser.getEventType();
            while (eventType != XmlPullParser.START_TAG) {
                eventType = parser.next();
            }

            // Check if the start tag is an SVG tag.
            if (!parser.getName().equalsIgnoreCase(SVG_TAG)) {
                // Input is not an SVG image.
                return null;
            }

            // Check if the SVG tag has width and height attributes.
            boolean widthFound = false;
            boolean heightFound = false;
            String width = null;
            String height = null;

            for (int i = 0; i < parser.getAttributeCount(); i++) {
                String attrName = parser.getAttributeName(i);
                String attrValue = parser.getAttributeValue(i);

                if (attrName.equalsIgnoreCase(ConfigurationUtils.WIDTH)) {
                    widthFound = true;
                    width = attrValue;
                } else if (attrName.equalsIgnoreCase(ConfigurationUtils.HEIGHT)) {
                    heightFound = true;
                    height = attrValue;
                }
            }

            if (widthFound && heightFound) {
                // Width and height attributes are declared.
                // There's no need to modify the current SVG.
                return input;
            }

            // Add missing width and height attributes to SVG tag.
            if (!widthFound) {
                width = ATT_VALUE_1000_PX;
            }

            if (!heightFound) {
                height = ATT_VALUE_1000_PX;
            }

            // Serialize the modified XML document to a string and return it.
            XmlSerializer serializer = XmlPullParserFactory.newInstance().newSerializer();
            StringWriter writer = new StringWriter();
            serializer.setOutput(writer);

            while (eventType != XmlPullParser.END_DOCUMENT) {
                if (eventType == XmlPullParser.START_TAG) {
                    serializer.startTag(null, parser.getName());

                    for (int i = 0; i < parser.getAttributeCount(); i++) {
                        String name = parser.getAttributeName(i);
                        String value = parser.getAttributeValue(i);
                        serializer.attribute(null, name, value);
                    }
                    if (parser.getName().equalsIgnoreCase(SVG_TAG)) {
                        if (!widthFound) {
                            serializer.attribute(null, ConfigurationUtils.WIDTH, width);
                        }
                        if (!heightFound) {
                            serializer.attribute(null, ConfigurationUtils.HEIGHT, height);
                        }
                    }
                } else if (eventType == XmlPullParser.TEXT) {
                    serializer.text(parser.getText());
                } else if (eventType == XmlPullParser.END_TAG) {
                    serializer.endTag(null, parser.getName());
                } else if (eventType == XmlPullParser.IGNORABLE_WHITESPACE) {
                    serializer.ignorableWhitespace(parser.getText());
                }

                eventType = parser.next();
            }

            serializer.flush();
            return DATA_IMAGE_SVG_UTF8_PREFIX + writer.toString();
        } catch (XmlPullParserException | IOException e) {
            return null;
        }
    }

    private static void loadImage(
            ImageFetcherFacade imageFetcherFacade,
            RequestManager requestManager,
            boolean isCircular,
            final int roundedCorners,
            ImageView imageView,
            CustomTarget<Drawable> customTarget,
            Callback callback) {
        if (imageFetcherFacade == null
                || (imageFetcherFacade.mData == null && imageFetcherFacade.mDrawable == null)) {
            if (callback != null) callback.onLoadFailed();
            return;
        }
        RequestBuilder<Drawable> request =
                requestManager
                        .load(
                                imageFetcherFacade.mData != null
                                        ? imageFetcherFacade.mData
                                        : imageFetcherFacade.mDrawable)
                        .transform(getTransformations(isCircular, roundedCorners))
                        .diskCacheStrategy(DiskCacheStrategy.NONE)
                        .priority(Priority.IMMEDIATE)
                        .listener(
                                new RequestListener<Drawable>() {
                                    @Override
                                    public boolean onLoadFailed(
                                            GlideException glideException,
                                            Object model,
                                            Target<Drawable> target,
                                            boolean isFirstResource) {
                                        return callback != null && callback.onLoadFailed();
                                    }

                                    @Override
                                    public boolean onResourceReady(
                                            Drawable resource,
                                            Object model,
                                            Target<Drawable> target,
                                            DataSource dataSource,
                                            boolean isFirstResource) {
                                        return callback != null
                                                && callback.onResourceReady(resource, target);
                                    }
                                });

        if (imageView != null) {
            request.into(imageView);
        } else {
            request.into(customTarget);
        }
    }

    private static BitmapTransformation[] getTransformations(
            boolean isCircular, final int roundedCorners) {
        if (isCircular) {
            return new BitmapTransformation[] {new FitCenter(), new CircleCrop()};
        }

        DisplayMetrics displayMetrics =
                ContextUtils.getApplicationContext().getResources().getDisplayMetrics();
        return new BitmapTransformation[] {
                new FitCenter(), new RoundedCorners(dpToPx(displayMetrics, roundedCorners))};
    }

    /**
     * Returns {@code true} if a given URL is supported for download.
     * @param url Given URL to check
     * @return {@code true} if a given URL is supported for download, {@code false} otherwise.
     */
    public static boolean isSupported(String url) {
        return isValidImgUrl(url);
    }

    /**
     * Checks if the given URL string represents an SVG image file.
     * @param url a string representing a URL to an image file.
     * @return {@code true} if the URL string represents an SVG image file, {@code false} otherwise.
     */
    public static boolean isSvg(String url) {
        if (!isValidImgUrl(url)) return false;
        // Converts the URL to lowercase to make the matching case-insensitive.
        url = url.toLowerCase(Locale.ENGLISH);
        return url.startsWith("data:image/svg") || url.endsWith(".svg");
    }

    /**
     * Checks if the given URL string represents a GIF image file.
     * @param url a string representing a URL to an image file.
     * @return {@code true} if the URL string represents an SVG image file, {@code false} otherwise.
     */
    public static boolean isGif(String url) {
        if (!isValidImgUrl(url)) return false;
        // Converts the URL to lowercase to make the matching case-insensitive.
        url = url.toLowerCase(Locale.ENGLISH);
        return url.endsWith(".gif") || url.endsWith("=gif");
    }

    public static void fetchFavIcon(String originSpecUrl, WeakReference<Context> context,
            Callbacks.Callback1<Bitmap> callback) {
        try {
            BraveActivity activity = BraveActivity.getBraveActivity();
            FaviconHelper.FaviconImageCallback imageCallback = (bitmap, iconUrl) -> {
                if (context.get() != null) {
                    if (bitmap == null) {
                        bitmap = getFaviconThemeHelper().getDefaultFaviconBitmap(
                                context.get(), iconUrl, true);
                    }
                    callback.call(bitmap);
                }
            };
            // 0 is a max bitmap size for download
            getFaviconHelper().getLocalFaviconImageForURL(
                    activity.getCurrentProfile(), new GURL(originSpecUrl), 0, imageCallback);

        } catch (Exception ignored) {
        }
    }

    public static FaviconHelper getFaviconHelper() {
        if (sFaviconHelper == null) {
            sFaviconHelper = new FaviconHelper();
        }
        return sFaviconHelper;
    }

    private static FaviconHelper.DefaultFaviconHelper getFaviconThemeHelper() {
        if (sFaviconThemeHelper == null) {
            sFaviconThemeHelper = new FaviconHelper.DefaultFaviconHelper();
        }
        return sFaviconThemeHelper;
    }

    private static boolean isValidImgUrl(String url) {
        // Only "data:" or HTTPS URLs.
        return URLUtil.isDataUrl(url) || URLUtil.isHttpsUrl(url);
    }

    private static String decodeBase64SvgUrl(String url) {
        String dataSection = getDataSection(url);

        if (dataSection.isEmpty() || !isBase64(dataSection)) {
            // Not a valid base64 encoded string.
            return null;
        }
        try {
            byte[] data = Base64.decode(dataSection, Base64.DEFAULT);
            ByteBuffer byteBuffer = ByteBuffer.wrap(data);
            String decoded = new String(byteBuffer.array(), StandardCharsets.UTF_8);
            return decoded;
        } catch (Exception ex) {
            return null;
        }
    }

    private static boolean isBase64(String input) {
        Pattern base64 = Pattern.compile(BASE64_ENCODING_PATTERN);
        Matcher matcher = base64.matcher(input);
        return matcher.find();
    }

    private static boolean isBase64Encoded(String url) {
        String encodingType = extractEncodingType(url);
        return encodingType != null && encodingType.startsWith("base64");
    }

    private static boolean isUtf8(String url) {
        String encodingType = extractEncodingType(url);
        return encodingType != null && encodingType.startsWith("utf8");
    }

    private static String extractEncodingType(String input) {
        int startOfEncodingSection = input.indexOf(';');
        if (startOfEncodingSection == -1 || startOfEncodingSection == input.length() - 1) {
            return null;
        }
        return input.substring(startOfEncodingSection + 1).toLowerCase(Locale.ENGLISH);
    }

    private static String getDataSection(String input) {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs.
        int startOfBase64Section = input.indexOf(',');
        if (startOfBase64Section == -1 || startOfBase64Section == input.length() - 1) {
            return "";
        }
        return input.substring(startOfBase64Section + 1);
    }

    /**
     * Callback used to notify if the image has been downloaded successfully.
     * @see #downloadImage(String, RequestManager, boolean, int, ImageView, Callback)
     */
    public interface Callback {
        boolean onLoadFailed();
        boolean onResourceReady(Drawable resource, Target<Drawable> target);
    }

    private static class ImageFetcherFacade {
        final byte[] mData;
        final Drawable mDrawable;

        public ImageFetcherFacade(byte[] data) {
            mData = data;
            mDrawable = null;
        }

        ImageFetcherFacade(Drawable drawable) {
            mDrawable = drawable;
            mData = null;
        }
    }
}
