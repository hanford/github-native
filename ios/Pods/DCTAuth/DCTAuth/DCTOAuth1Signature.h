//
//  DCTOAuth1Signature.h
//  DCTAuth
//
//  Created by Daniel Tull on 04.07.2010.
//  Copyright 2010 Daniel Tull. All rights reserved.
//

@import Foundation;
#import "DCTOAuth1SignatureType.h"

@interface DCTOAuth1Signature : NSObject

- (instancetype)initWithRequest:(NSURLRequest *)request
				 consumerSecret:(NSString *)consumerSecret
					secretToken:(NSString *)secretToken
						  items:(NSArray *)items
						   type:(DCTOAuth1SignatureType)type;

- (instancetype)initWithRequest:(NSURLRequest *)request
				 consumerSecret:(NSString *)consumerSecret
					secretToken:(NSString *)secretToken
						  items:(NSArray *)items
						   type:(DCTOAuth1SignatureType)type
					  timestamp:(NSString *)timestamp
						  nonce:(NSString *)nonce;

@property (nonatomic, readonly) NSString *authorizationHeader;
@property (nonatomic, readonly) NSArray *authorizationItems;

@property (nonatomic, readonly) NSString *signatureBaseString;
@property (nonatomic, readonly) NSString *signatureString;

@end
