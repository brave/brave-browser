
# Android Development Environment

## Making Debug Build for Android

To ensure the output format is APK, add `--target_android_output_format=apk` to the build command:

```bash
npm run build -- Debug --target_os=android --target_arch=arm --target_android_output_format=apk
```

To change the target SDK level, add `--target_android_base`:

```bash
npm run build -- Debug --target_os=android --target_arch=arm --target_android_output_format=apk --target_android_base=mono
```

## Installing a Build on Android

For devices or an emulator:

```bash
./src/build/android/adb_install_apk.py ./src/out/android_Debug_x86/apks/Bravex86.apk
```

Or:

```bash
adb install ./src/out/android_Debug_x86/apks/Bravex86.apk
```

If you have an AAB file:

```bash
bundletool build-apks --connected-device --bundle=out/android_Debug_x86/apks/Bravex86.aab --output=out/android_Debug_x86/apks/Bravex86.apks
bundletool install-apks --apks=out/android_Debug_x86/apks/Bravex86.apks
```

## Getting Crash Dumps for Android

```bash
adb logcat -d | third_party/android_platform/development/scripts/stack --output-directory out/android_Component_arm
```

## Other Debugging Instructions for Android

Refer to the [Chromium debugging instructions](https://chromium.googlesource.com/chromium/src/+/main/docs/android_debugging_instructions.md).

## Setting Up an Android Emulator

To set up an Android emulator, follow these steps:

1. Install Android Studio from the [official website](https://developer.android.com/studio).
2. Open Android Studio and navigate to the AVD Manager.
3. Create a new virtual device and select the desired phone model and system image.
4. Configure the emulator settings and finish the setup.
5. Start the emulator from the AVD Manager.
