//
//  DCTOAuth1Credential.h
//  DCTAuth
//
//  Created by Daniel Tull on 22/02/2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccountCredential.h"

@interface DCTOAuth1Credential : NSObject <DCTAuthAccountCredential>

/**
 *  Creates a credential for an OAuth 1 account.
 *
 *  @param consumerKey The consumer key.
 *  @param consumerSecret The consumer secret.
 *  @param oauthToken The OAuth token.
 *  @param oauthTokenSecret The OAuth secret token.
 *
 *  @return Newly initialized credential.
 */
- (instancetype)initWithConsumerKey:(NSString *)consumerKey
					 consumerSecret:(NSString *)consumerSecret
						 oauthToken:(NSString *)oauthToken
				   oauthTokenSecret:(NSString *)oauthTokenSecret;

/** Consumer key. */
@property (nonatomic, readonly) NSString *consumerKey;

/** Consumer secret. */
@property (nonatomic, readonly) NSString *consumerSecret;

/** OAuth token. */
@property (nonatomic, readonly) NSString *oauthToken;

/** OAuth secret token. */
@property (nonatomic, readonly) NSString *oauthTokenSecret;

@end
