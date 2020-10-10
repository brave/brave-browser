/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#import <UIKit/UIKit.h>
#import <XCTest/XCTest.h>
#import <Cordova/CDVScreenOrientationDelegate.h>
#import "CDVSplashScreen.h"
#import "ImageNameTestDelegates.h"

const CDV_iOSDevice CDV_iOSDeviceZero = { 0, 0, 0, 0, 0, 0 };

@interface ImageNameTest : XCTestCase

@property (nonatomic, strong) CDVSplashScreen* plugin;

@end

@interface CDVSplashScreen ()

// expose private interface
- (NSString*)getImageName:(UIInterfaceOrientation)currentOrientation delegate:(id<CDVScreenOrientationDelegate>)orientationDelegate device:(CDV_iOSDevice)device;

@end

@implementation ImageNameTest

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
    
    self.plugin = [[CDVSplashScreen alloc] init];
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void) orientationHelper:(id<CDVScreenOrientationDelegate>)delegate expectedImageNameDictionary:(NSDictionary*)expectedImageNameDictionary device:(CDV_iOSDevice)device{
    
    NSString* name = nil;
    NSString* expectedImageName = nil;
    UIInterfaceOrientation currentOrientation;
    NSString* deviceName = device.iPad? @"iPad" : device.iPhone6Plus? @"iPhone6Plus": device.iPhone6? @"iPhone6": device.iPhone5? @"iPhone5" : @"iPhone";
    
    // LandscapeLeft, should always return expectedImageName
    currentOrientation = UIInterfaceOrientationLandscapeLeft;
    name = [self.plugin getImageName:currentOrientation delegate:delegate device:device];
    expectedImageName = [expectedImageNameDictionary objectForKey:@"landscapeLeft"];
    XCTAssertTrue([expectedImageName isEqualToString:name], @"%@ - %@ failed (%@)", @"Landscape", deviceName, name);
    
    // LandscapeRight - should always return expectedImageName
    currentOrientation = UIInterfaceOrientationLandscapeRight;
    name = [self.plugin getImageName:currentOrientation delegate:delegate device:device];
    expectedImageName = [expectedImageNameDictionary objectForKey:@"landscapeRight"];
    XCTAssertTrue([expectedImageName isEqualToString:name], @"%@ - %@ failed (%@)", @"Landscape", deviceName, name);
    
    // Portrait - should always return expectedImageName
    currentOrientation = UIInterfaceOrientationPortrait;
    name = [self.plugin getImageName:currentOrientation delegate:delegate device:device];
    expectedImageName = [expectedImageNameDictionary objectForKey:@"portrait"];
    XCTAssertTrue([expectedImageName isEqualToString:name], @"%@ - %@ failed (%@)", @"Portrait", deviceName, name);
    
    // PortraitUpsideDown - should always return expectedImageName
    currentOrientation = UIInterfaceOrientationPortraitUpsideDown;
    name = [self.plugin getImageName:currentOrientation delegate:delegate device:device];
    expectedImageName = [expectedImageNameDictionary objectForKey:@"portraitUpsideDown"];
    XCTAssertTrue([expectedImageName isEqualToString:name], @"%@ - %@ failed (%@)", @"Portrait", deviceName, name);
}

- (void)testiPadOrientation {
    
    CDV_iOSDevice device = CDV_iOSDeviceZero;
    device.iPad = YES;
    
    // One orientation
    
    PortraitOnly* delegate = [[PortraitOnly alloc] init];
    [self orientationHelper:delegate expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Portrait",
                                                                    @"landscapeRight" : @"Default-Portrait",
                                                                    @"portrait" : @"Default-Portrait",
                                                                    @"portraitUpsideDown" : @"Default-Portrait"
                                                                    }
                     device:device];
    
    PortraitUpsideDownOnly* delegate2 = [[PortraitUpsideDownOnly alloc] init];
    [self orientationHelper:delegate2 expectedImageNameDictionary:@{
                                                                   @"landscapeLeft" : @"Default-Portrait",
                                                                   @"landscapeRight" : @"Default-Portrait",
                                                                   @"portrait" : @"Default-Portrait",
                                                                   @"portraitUpsideDown" : @"Default-Portrait"
                                                                   }
                     device:device];
    
    LandscapeLeftOnly* delegate3 = [[LandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate3 expectedImageNameDictionary:@{
                                                                   @"landscapeLeft" : @"Default-Landscape",
                                                                   @"landscapeRight" : @"Default-Landscape",
                                                                   @"portrait" : @"Default-Landscape",
                                                                   @"portraitUpsideDown" : @"Default-Landscape"
                                                                   }
                     device:device];
    
    LandscapeRightOnly* delegate4 = [[LandscapeRightOnly alloc] init];
    [self orientationHelper:delegate4 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape",
                                                                    @"landscapeRight" : @"Default-Landscape",
                                                                    @"portrait" : @"Default-Landscape",
                                                                    @"portraitUpsideDown" : @"Default-Landscape"
                                                                    }
                     device:device];

    // All Portrait

    AllPortraitOnly* delegate5 = [[AllPortraitOnly alloc] init];
    [self orientationHelper:delegate5 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Portrait",
                                                                    @"landscapeRight" : @"Default-Portrait",
                                                                    @"portrait" : @"Default-Portrait",
                                                                    @"portraitUpsideDown" : @"Default-Portrait"
                                                                    }
                     device:device];

    // All Landscape
    
    AllLandscapeOnly* delegate6 = [[AllLandscapeOnly alloc] init];
    [self orientationHelper:delegate6 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape",
                                                                    @"landscapeRight" : @"Default-Landscape",
                                                                    @"portrait" : @"Default-Landscape",
                                                                    @"portraitUpsideDown" : @"Default-Landscape"
                                                                    }
                     device:device];
    
    
    // All orientations
    
    AllOrientations* delegate7 = [[AllOrientations alloc] init];
    [self orientationHelper:delegate7 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape",
                                                                    @"landscapeRight" : @"Default-Landscape",
                                                                    @"portrait" : @"Default-Portrait",
                                                                    @"portraitUpsideDown" : @"Default-Portrait"
                                                                    }
                     device:device];

    // Portrait and Landscape Left
    
    PortraitAndLandscapeLeftOnly* delegate8 = [[PortraitAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate8 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape",
                                                                    @"landscapeRight" : @"Default-Landscape",
                                                                    @"portrait" : @"Default-Portrait",
                                                                    @"portraitUpsideDown" : @"Default-Portrait"
                                                                    }
                     device:device];

    // Portrait and Landscape Right
    
    PortraitAndLandscapeRightOnly* delegate9 = [[PortraitAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate9 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape",
                                                                    @"landscapeRight" : @"Default-Landscape",
                                                                    @"portrait" : @"Default-Portrait",
                                                                    @"portraitUpsideDown" : @"Default-Portrait"
                                                                    }
                     device:device];

    // PortraitUpsideDown and Landscape Left
    
    PortraitUpsideDownAndLandscapeLeftOnly* delegate10 = [[PortraitUpsideDownAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate10 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape",
                                                                    @"landscapeRight" : @"Default-Landscape",
                                                                    @"portrait" : @"Default-Portrait",
                                                                    @"portraitUpsideDown" : @"Default-Portrait"
                                                                    }
                     device:device];

    // PortraitUpsideDown and Landscape Right
    
    PortraitUpsideDownAndLandscapeRightOnly* delegate11 = [[PortraitUpsideDownAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate11 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default-Landscape",
                                                                     @"landscapeRight" : @"Default-Landscape",
                                                                     @"portrait" : @"Default-Portrait",
                                                                     @"portraitUpsideDown" : @"Default-Portrait"
                                                                     }
                     device:device];
}

- (void)testiPhoneOrientation {
    
    CDV_iOSDevice device = CDV_iOSDeviceZero;
    device.iPhone = YES;
    
    // One orientation
    
    PortraitOnly* delegate = [[PortraitOnly alloc] init];
    [self orientationHelper:delegate expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    PortraitUpsideDownOnly* delegate2 = [[PortraitUpsideDownOnly alloc] init];
    [self orientationHelper:delegate2 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    LandscapeLeftOnly* delegate3 = [[LandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate3 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    LandscapeRightOnly* delegate4 = [[LandscapeRightOnly alloc] init];
    [self orientationHelper:delegate4 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    // All Portrait
    
    AllPortraitOnly* delegate5 = [[AllPortraitOnly alloc] init];
    [self orientationHelper:delegate5 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    // All Landscape
    
    AllLandscapeOnly* delegate6 = [[AllLandscapeOnly alloc] init];
    [self orientationHelper:delegate6 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    
    // All orientations
    
    AllOrientations* delegate7 = [[AllOrientations alloc] init];
    [self orientationHelper:delegate7 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    // Portrait and Landscape Left
    
    PortraitAndLandscapeLeftOnly* delegate8 = [[PortraitAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate8 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    // Portrait and Landscape Right
    
    PortraitAndLandscapeRightOnly* delegate9 = [[PortraitAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate9 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default",
                                                                    @"landscapeRight" : @"Default",
                                                                    @"portrait" : @"Default",
                                                                    @"portraitUpsideDown" : @"Default"
                                                                    }
                     device:device];
    
    // PortraitUpsideDown and Landscape Left
    
    PortraitUpsideDownAndLandscapeLeftOnly* delegate10 = [[PortraitUpsideDownAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate10 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default",
                                                                     @"landscapeRight" : @"Default",
                                                                     @"portrait" : @"Default",
                                                                     @"portraitUpsideDown" : @"Default"
                                                                     }
                     device:device];
    
    // PortraitUpsideDown and Landscape Right
    
    PortraitUpsideDownAndLandscapeRightOnly* delegate11 = [[PortraitUpsideDownAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate11 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default",
                                                                     @"landscapeRight" : @"Default",
                                                                     @"portrait" : @"Default",
                                                                     @"portraitUpsideDown" : @"Default"
                                                                     }
                     device:device];
}

- (void)testiPhone5Orientation {
    
    CDV_iOSDevice device = CDV_iOSDeviceZero;
    device.iPhone = YES;
    device.iPhone5 = YES;
    
    // One orientation
    
    PortraitOnly* delegate = [[PortraitOnly alloc] init];
    [self orientationHelper:delegate expectedImageNameDictionary:@{
                                                                   @"landscapeLeft" : @"Default-568h",
                                                                   @"landscapeRight" : @"Default-568h",
                                                                   @"portrait" : @"Default-568h",
                                                                   @"portraitUpsideDown" : @"Default-568h"
                                                                   }
                     device:device];
    
    PortraitUpsideDownOnly* delegate2 = [[PortraitUpsideDownOnly alloc] init];
    [self orientationHelper:delegate2 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-568h",
                                                                    @"landscapeRight" : @"Default-568h",
                                                                    @"portrait" : @"Default-568h",
                                                                    @"portraitUpsideDown" : @"Default-568h"
                                                                    }
                     device:device];
    
    LandscapeLeftOnly* delegate3 = [[LandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate3 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-568h",
                                                                    @"landscapeRight" : @"Default-568h",
                                                                    @"portrait" : @"Default-568h",
                                                                    @"portraitUpsideDown" : @"Default-568h"
                                                                    }
                     device:device];
    
    LandscapeRightOnly* delegate4 = [[LandscapeRightOnly alloc] init];
    [self orientationHelper:delegate4 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-568h",
                                                                    @"landscapeRight" : @"Default-568h",
                                                                    @"portrait" : @"Default-568h",
                                                                    @"portraitUpsideDown" : @"Default-568h"
                                                                    }
                     device:device];
    
    // All Portrait
    
    AllPortraitOnly* delegate5 = [[AllPortraitOnly alloc] init];
    [self orientationHelper:delegate5 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-568h",
                                                                    @"landscapeRight" : @"Default-568h",
                                                                    @"portrait" : @"Default-568h",
                                                                    @"portraitUpsideDown" : @"Default-568h"
                                                                    }
                     device:device];
    
    // All Landscape
    
    AllLandscapeOnly* delegate6 = [[AllLandscapeOnly alloc] init];
    [self orientationHelper:delegate6 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-568h",
                                                                    @"landscapeRight" : @"Default-568h",
                                                                    @"portrait" : @"Default-568h",
                                                                    @"portraitUpsideDown" : @"Default-568h"
                                                                    }
                     device:device];
    
    
    // All orientations
    
    AllOrientations* delegate7 = [[AllOrientations alloc] init];
    [self orientationHelper:delegate7 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-568h",
                                                                    @"landscapeRight" : @"Default-568h",
                                                                    @"portrait" : @"Default-568h",
                                                                    @"portraitUpsideDown" : @"Default-568h"
                                                                    }
                     device:device];
    
    // Portrait and Landscape Left
    
    PortraitAndLandscapeLeftOnly* delegate8 = [[PortraitAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate8 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-568h",
                                                                    @"landscapeRight" : @"Default-568h",
                                                                    @"portrait" : @"Default-568h",
                                                                    @"portraitUpsideDown" : @"Default-568h"
                                                                    }
                     device:device];
    
    // Portrait and Landscape Right
    
    PortraitAndLandscapeRightOnly* delegate9 = [[PortraitAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate9 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-568h",
                                                                    @"landscapeRight" : @"Default-568h",
                                                                    @"portrait" : @"Default-568h",
                                                                    @"portraitUpsideDown" : @"Default-568h"
                                                                    }
                     device:device];
    
    // PortraitUpsideDown and Landscape Left
    
    PortraitUpsideDownAndLandscapeLeftOnly* delegate10 = [[PortraitUpsideDownAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate10 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default-568h",
                                                                     @"landscapeRight" : @"Default-568h",
                                                                     @"portrait" : @"Default-568h",
                                                                     @"portraitUpsideDown" : @"Default-568h"
                                                                     }
                     device:device];
    
    // PortraitUpsideDown and Landscape Right
    
    PortraitUpsideDownAndLandscapeRightOnly* delegate11 = [[PortraitUpsideDownAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate11 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default-568h",
                                                                     @"landscapeRight" : @"Default-568h",
                                                                     @"portrait" : @"Default-568h",
                                                                     @"portraitUpsideDown" : @"Default-568h"
                                                                     }
                     device:device];
}

- (void)testiPhone6Orientation {
    
    CDV_iOSDevice device = CDV_iOSDeviceZero;
    device.iPhone = YES;
    device.iPhone6 = YES;
    
    // One orientation
    
    PortraitOnly* delegate = [[PortraitOnly alloc] init];
    [self orientationHelper:delegate expectedImageNameDictionary:@{
                                                                   @"landscapeLeft" : @"Default-667h",
                                                                   @"landscapeRight" : @"Default-667h",
                                                                   @"portrait" : @"Default-667h",
                                                                   @"portraitUpsideDown" : @"Default-667h"
                                                                   }
                     device:device];
    
    PortraitUpsideDownOnly* delegate2 = [[PortraitUpsideDownOnly alloc] init];
    [self orientationHelper:delegate2 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-667h",
                                                                    @"landscapeRight" : @"Default-667h",
                                                                    @"portrait" : @"Default-667h",
                                                                    @"portraitUpsideDown" : @"Default-667h"
                                                                    }
                     device:device];
    
    LandscapeLeftOnly* delegate3 = [[LandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate3 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-667h",
                                                                    @"landscapeRight" : @"Default-667h",
                                                                    @"portrait" : @"Default-667h",
                                                                    @"portraitUpsideDown" : @"Default-667h"
                                                                    }
                     device:device];
    
    LandscapeRightOnly* delegate4 = [[LandscapeRightOnly alloc] init];
    [self orientationHelper:delegate4 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-667h",
                                                                    @"landscapeRight" : @"Default-667h",
                                                                    @"portrait" : @"Default-667h",
                                                                    @"portraitUpsideDown" : @"Default-667h"
                                                                    }
                     device:device];
    
    // All Portrait
    
    AllPortraitOnly* delegate5 = [[AllPortraitOnly alloc] init];
    [self orientationHelper:delegate5 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-667h",
                                                                    @"landscapeRight" : @"Default-667h",
                                                                    @"portrait" : @"Default-667h",
                                                                    @"portraitUpsideDown" : @"Default-667h"
                                                                    }
                     device:device];
    
    // All Landscape
    
    AllLandscapeOnly* delegate6 = [[AllLandscapeOnly alloc] init];
    [self orientationHelper:delegate6 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-667h",
                                                                    @"landscapeRight" : @"Default-667h",
                                                                    @"portrait" : @"Default-667h",
                                                                    @"portraitUpsideDown" : @"Default-667h"
                                                                    }
                     device:device];
    
    
    // All orientations
    
    AllOrientations* delegate7 = [[AllOrientations alloc] init];
    [self orientationHelper:delegate7 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-667h",
                                                                    @"landscapeRight" : @"Default-667h",
                                                                    @"portrait" : @"Default-667h",
                                                                    @"portraitUpsideDown" : @"Default-667h"
                                                                    }
                     device:device];
    
    // Portrait and Landscape Left
    
    PortraitAndLandscapeLeftOnly* delegate8 = [[PortraitAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate8 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-667h",
                                                                    @"landscapeRight" : @"Default-667h",
                                                                    @"portrait" : @"Default-667h",
                                                                    @"portraitUpsideDown" : @"Default-667h"
                                                                    }
                     device:device];
    
    // Portrait and Landscape Right
    
    PortraitAndLandscapeRightOnly* delegate9 = [[PortraitAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate9 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-667h",
                                                                    @"landscapeRight" : @"Default-667h",
                                                                    @"portrait" : @"Default-667h",
                                                                    @"portraitUpsideDown" : @"Default-667h"
                                                                    }
                     device:device];
    
    // PortraitUpsideDown and Landscape Left
    
    PortraitUpsideDownAndLandscapeLeftOnly* delegate10 = [[PortraitUpsideDownAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate10 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default-667h",
                                                                     @"landscapeRight" : @"Default-667h",
                                                                     @"portrait" : @"Default-667h",
                                                                     @"portraitUpsideDown" : @"Default-667h"
                                                                     }
                     device:device];
    
    // PortraitUpsideDown and Landscape Right
    
    PortraitUpsideDownAndLandscapeRightOnly* delegate11 = [[PortraitUpsideDownAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate11 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default-667h",
                                                                     @"landscapeRight" : @"Default-667h",
                                                                     @"portrait" : @"Default-667h",
                                                                     @"portraitUpsideDown" : @"Default-667h"
                                                                     }
                     device:device];
}

- (void)testiPhone6PlusOrientation {
    
    CDV_iOSDevice device = CDV_iOSDeviceZero;
    device.iPhone = YES;
    device.iPhone6Plus = YES;
    
    // One orientation
    
    PortraitOnly* delegate = [[PortraitOnly alloc] init];
    [self orientationHelper:delegate expectedImageNameDictionary:@{
                                                                   @"landscapeLeft" : @"Default-736h",
                                                                   @"landscapeRight" : @"Default-736h",
                                                                   @"portrait" : @"Default-736h",
                                                                   @"portraitUpsideDown" : @"Default-736h"
                                                                   }
                     device:device];
    
    PortraitUpsideDownOnly* delegate2 = [[PortraitUpsideDownOnly alloc] init];
    [self orientationHelper:delegate2 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-736h",
                                                                    @"landscapeRight" : @"Default-736h",
                                                                    @"portrait" : @"Default-736h",
                                                                    @"portraitUpsideDown" : @"Default-736h"
                                                                    }
                     device:device];
    
    LandscapeLeftOnly* delegate3 = [[LandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate3 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape-736h",
                                                                    @"landscapeRight" : @"Default-Landscape-736h",
                                                                    @"portrait" : @"Default-Landscape-736h",
                                                                    @"portraitUpsideDown" : @"Default-Landscape-736h"
                                                                    }
                     device:device];
    
    LandscapeRightOnly* delegate4 = [[LandscapeRightOnly alloc] init];
    [self orientationHelper:delegate4 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape-736h",
                                                                    @"landscapeRight" : @"Default-Landscape-736h",
                                                                    @"portrait" : @"Default-Landscape-736h",
                                                                    @"portraitUpsideDown" : @"Default-Landscape-736h"
                                                                    }
                     device:device];
    
    // All Portrait
    
    AllPortraitOnly* delegate5 = [[AllPortraitOnly alloc] init];
    [self orientationHelper:delegate5 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-736h",
                                                                    @"landscapeRight" : @"Default-736h",
                                                                    @"portrait" : @"Default-736h",
                                                                    @"portraitUpsideDown" : @"Default-736h"
                                                                    }
                     device:device];
    
    // All Landscape
    
    AllLandscapeOnly* delegate6 = [[AllLandscapeOnly alloc] init];
    [self orientationHelper:delegate6 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape-736h",
                                                                    @"landscapeRight" : @"Default-Landscape-736h",
                                                                    @"portrait" : @"Default-Landscape-736h",
                                                                    @"portraitUpsideDown" : @"Default-Landscape-736h"
                                                                    }
                     device:device];
    
    
    // All orientations
    
    AllOrientations* delegate7 = [[AllOrientations alloc] init];
    [self orientationHelper:delegate7 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape-736h",
                                                                    @"landscapeRight" : @"Default-Landscape-736h",
                                                                    @"portrait" : @"Default-736h",
                                                                    @"portraitUpsideDown" : @"Default-736h"
                                                                    }
                     device:device];
    
    // Portrait and Landscape Left
    
    PortraitAndLandscapeLeftOnly* delegate8 = [[PortraitAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate8 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape-736h",
                                                                    @"landscapeRight" : @"Default-Landscape-736h",
                                                                    @"portrait" : @"Default-736h",
                                                                    @"portraitUpsideDown" : @"Default-736h"
                                                                    }
                     device:device];
    
    // Portrait and Landscape Right
    
    PortraitAndLandscapeRightOnly* delegate9 = [[PortraitAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate9 expectedImageNameDictionary:@{
                                                                    @"landscapeLeft" : @"Default-Landscape-736h",
                                                                    @"landscapeRight" : @"Default-Landscape-736h",
                                                                    @"portrait" : @"Default-736h",
                                                                    @"portraitUpsideDown" : @"Default-736h"
                                                                    }
                     device:device];
    
    // PortraitUpsideDown and Landscape Left
    
    PortraitUpsideDownAndLandscapeLeftOnly* delegate10 = [[PortraitUpsideDownAndLandscapeLeftOnly alloc] init];
    [self orientationHelper:delegate10 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default-Landscape-736h",
                                                                     @"landscapeRight" : @"Default-Landscape-736h",
                                                                     @"portrait" : @"Default-736h",
                                                                     @"portraitUpsideDown" : @"Default-736h"
                                                                     }
                     device:device];
    
    // PortraitUpsideDown and Landscape Right
    
    PortraitUpsideDownAndLandscapeRightOnly* delegate11 = [[PortraitUpsideDownAndLandscapeRightOnly alloc] init];
    [self orientationHelper:delegate11 expectedImageNameDictionary:@{
                                                                     @"landscapeLeft" : @"Default-Landscape-736h",
                                                                     @"landscapeRight" : @"Default-Landscape-736h",
                                                                     @"portrait" : @"Default-736h",
                                                                     @"portraitUpsideDown" : @"Default-736h"
                                                                     }
                     device:device];
}



@end
