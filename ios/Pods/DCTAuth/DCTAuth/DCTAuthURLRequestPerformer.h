//
//  DCTAuthURLRequestPerformer.h
//  DCTAuth
//
//  Created by Daniel Tull on 20.01.2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTAuthRequest.h"

@interface DCTAuthURLRequestPerformer : NSObject

+ (instancetype)sharedURLRequestPerformer;

- (void)performRequest:(NSURLRequest *)URLRequest withHandler:(DCTAuthRequestHandler)handler;

@property (nonatomic, copy) void(^URLRequestPerformer)(NSURLRequest *request, DCTAuthRequestHandler handler);

@end
