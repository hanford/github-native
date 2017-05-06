//
//  DCTAuthURLOpenerOperation.h
//  DCTAuth
//
//  Created by Daniel Tull on 27.09.2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

@import Foundation;
#import "DCTAuthResponse.h"

@interface DCTAuthURLOpenerOperation : NSOperation

- (instancetype)initWithURL:(NSURL *)URL callbackURL:(NSURL *)callbackURL handler:(void (^)(DCTAuthResponse *response))handler;
@property (nonatomic, readonly) NSURL *URL;
@property (nonatomic, readonly) NSURL *callbackURL;
@property (nonatomic, readonly) void (^handler)(DCTAuthResponse *response);

- (BOOL)handleURL:(NSURL *)URL;

@end
