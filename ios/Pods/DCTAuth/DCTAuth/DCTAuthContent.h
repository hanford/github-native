//
//  DCTAuthContent.h
//  DCTAuth
//
//  Created by Daniel Tull on 23.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;
#import "DCTAuthContentType.h"

@interface DCTAuthContentItem : NSObject

- (instancetype)initWithName:(NSString *)name value:(id)value;

@property (nonatomic, readonly) NSString *name;
@property (nonatomic, readonly) id value;


@end

@interface DCTAuthContent : NSObject

- (instancetype)initWithRequest:(NSURLRequest *)request;
- (instancetype)initWithEncoding:(NSStringEncoding)encoding type:(DCTAuthContentType)type items:(NSArray<DCTAuthContentItem *> *)items;

@property (nonatomic, readonly) DCTAuthContentType type;
@property (nonatomic, readonly) NSArray *items;
@property (nonatomic, readonly) NSStringEncoding encoding;

@property (nonatomic, readonly) NSString *contentType;
@property (nonatomic, readonly) NSString *contentLength;
@property (nonatomic, readonly) NSData *HTTPBody;

@end
