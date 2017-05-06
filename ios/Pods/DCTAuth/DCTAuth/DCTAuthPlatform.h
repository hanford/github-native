//
//  DCTAuthPlatform.h
//  DCTAuth
//
//  Created by Daniel Tull on 31/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

@import Foundation;

typedef void(^DCTAuthPlatformCompletion)(BOOL success);
typedef void(^DCTAuthPlatformExpirationHandler)();

@interface DCTAuthPlatform : NSObject

+ (instancetype)sharedPlatform;

@property (nonatomic, copy) void (^URLOpener) (NSURL *URL, DCTAuthPlatformCompletion completion);

// Used by DCTAuthAccount subclasses to open a webpage

- (void)openURL:(NSURL *)URL completion:(DCTAuthPlatformCompletion)completion;

@end
