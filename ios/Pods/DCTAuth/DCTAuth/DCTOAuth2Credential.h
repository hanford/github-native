//
//  DCTOAuth2Credential.h
//  DCTAuth
//
//  Created by Daniel Tull on 23/02/2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccountCredential.h"

typedef NS_ENUM(NSInteger, DCTOAuth2CredentialType) {
	DCTOAuth2CredentialTypeParamter,
	DCTOAuth2CredentialTypeBearer
};

@interface DCTOAuth2Credential : NSObject <DCTAuthAccountCredential>

/**
 *  Creates a credential for an OAuth 2 account.
 *
 *  @param clientID The client ID.
 *  @param clientSecret The client secret.
 *  @param password The password.
 *  @param accessToken The access token.
 *  @param refreshToken The refresh token.
 *  @param type The credential type.
 *
 *  @return Newly initialized credential.
 */
- (instancetype)initWithClientID:(NSString *)clientID
					clientSecret:(NSString *)clientSecret
						password:(NSString *)password
					 accessToken:(NSString *)accessToken
					refreshToken:(NSString *)refreshToken
							type:(DCTOAuth2CredentialType)type;

/** The client ID. */
@property (nonatomic, readonly) NSString *clientID;

/** The client secret. */
@property (nonatomic, readonly) NSString *clientSecret;

/** The password. */
@property (nonatomic, readonly) NSString *password;

/** The access token. */
@property (nonatomic, readonly) NSString *accessToken;

/** The refresh token. */
@property (nonatomic, readonly) NSString *refreshToken;

/** The credential type. */
@property (nonatomic, readonly) DCTOAuth2CredentialType type;

/** Generated authorization header. */
@property (nonatomic, readonly) NSString *authorizationHeader;

@end
