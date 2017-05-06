//
//  DCTOAuth2Account.h
//  DCTAuth
//
//  Created by Daniel Tull on 26/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccount.h"
#import "DCTOAuth2Credential.h"

/** Implementation of OAuth 2.0. */
@interface DCTOAuth2Account : DCTAuthAccount

/**
 *  Creates an account using OAuth 2.0.
 *
 *  If nil is provided for accessTokenURL and clientSecret, the returned account
 *  will authenticate using the "implicit" method, where the access token
 *  is returned from the authorize step. See the
 *  [draft for the OAuth 2.0 Authorization Framework](http://tools.ietf.org/html/draft-ietf-oauth-v2-31#section-1.3.2)
 *  for more information.
 *
 *  @param type The type of the account.
 *  @param authorizeURL The URL to perform the OAuth 2.0 authorization.
 *  @param accessTokenURL The URL to retrieve the OAuth 2.0 access token or nil.
 *  @param clientID The client ID for the app.
 *  @param clientSecret The client secret for the app or nil.
 *  @param scopes The desired OAuth 2.0 scopes, if any, for this acccount.
 *
 *  @return Newly initialized account.
 */
- (instancetype)initWithType:(NSString *)type
				authorizeURL:(NSURL *)authorizeURL
			  accessTokenURL:(NSURL *)accessTokenURL
					clientID:(NSString *)clientID
				clientSecret:(NSString *)clientSecret
					  scopes:(NSArray *)scopes;

/**
 *  Creates an account using OAuth 2.0.
 *
 *
 *  @param type The type of the account.
 *  @param authorizeURL The URL to retrieve the OAuth 2.0 access token or nil.
 *  @param username Username
 *  @param password Password
 *  @param scopes The desired OAuth 2.0 scopes, if any, for this acccount.
 *
 *  @return Newly initialized account.
 */
- (instancetype)initWithType:(NSString *)type
				authorizeURL:(NSURL *)authorizeURL
					username:(NSString *)username
					password:(NSString *)password
					  scopes:(NSArray *)scopes;

/**
 *  Creates an account using OAuth 2.0.
 *
 *  @param type The type of the account.
 *  @param authorizeURL The URL to retrieve the OAuth 2.0 access token or nil.
 *  @param clientID The client ID for the app.
 *  @param clientSecret The client secret for the app or nil.
 *  @param username Username
 *  @param password Password
 *  @param scopes The desired OAuth 2.0 scopes, if any, for this acccount.
 *
 *  @return Newly initialized account.
 */
- (instancetype)initWithType:(NSString *)type
				authorizeURL:(NSURL *)authorizeURL
					clientID:(NSString *)clientID
				clientSecret:(NSString *)clientSecret
					username:(NSString *)username
					password:(NSString *)password
					  scopes:(NSArray *)scopes;

/** The authorization URL. */
@property (nonatomic, readonly) NSURL *authorizeURL;

/** The access token URL if one was given. */
@property (nonatomic, readonly) NSURL *accessTokenURL;

/** The client ID if one was given. */
@property (nonatomic, readonly) NSString *clientID;

/** The client secret if one was given. */
@property (nonatomic, readonly) NSString *clientSecret;

/** The username if one was given. */
@property (nonatomic, readonly) NSString *username;

/** The password if one was given. */
@property (nonatomic, readonly) NSString *password;

/** The scopes if one was given. */
@property (nonatomic, readonly) NSArray *scopes;

/** The credential for the account. */
@property (nonatomic) DCTOAuth2Credential *credential;

@end
