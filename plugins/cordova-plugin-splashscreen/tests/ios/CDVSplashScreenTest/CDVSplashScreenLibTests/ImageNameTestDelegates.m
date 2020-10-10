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
#import "ImageNameTestDelegates.h"

@implementation PortraitOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

@implementation PortraitUpsideDownOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortraitUpsideDown;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

@implementation AllPortraitOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait | UIInterfaceOrientationMaskPortraitUpsideDown;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end


@implementation LandscapeLeftOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskLandscapeLeft;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

@implementation LandscapeRightOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskLandscapeRight;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

@implementation AllLandscapeOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskLandscapeLeft | UIInterfaceOrientationMaskLandscapeRight;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end


@implementation AllOrientations

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskAll;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

@implementation PortraitAndLandscapeLeftOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait | UIInterfaceOrientationMaskLandscapeLeft;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

@implementation PortraitAndLandscapeRightOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait | UIInterfaceOrientationMaskLandscapeRight;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

@implementation PortraitUpsideDownAndLandscapeLeftOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortraitUpsideDown | UIInterfaceOrientationMaskLandscapeLeft;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

@implementation PortraitUpsideDownAndLandscapeRightOnly

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortraitUpsideDown | UIInterfaceOrientationMaskLandscapeRight;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return [self supportedInterfaceOrientations] & (1 << interfaceOrientation) ;
}

- (BOOL)shouldAutorotate {
    return YES;
}

@end

