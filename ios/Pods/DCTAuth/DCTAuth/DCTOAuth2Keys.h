//
//  DCTOAuth2Keys.h
//  DCTAuth
//
//  Created by Daniel Tull on 17.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;

extern const struct DCTOAuth2Keys {
	__unsafe_unretained NSString *clientID;
	__unsafe_unretained NSString *clientSecret;
	__unsafe_unretained NSString *responseType;
	__unsafe_unretained NSString *scope;
	__unsafe_unretained NSString *state;
	__unsafe_unretained NSString *redirectURI;
	__unsafe_unretained NSString *error;
	__unsafe_unretained NSString *errorDescription;
	__unsafe_unretained NSString *errorURI;
	__unsafe_unretained NSString *grantType;
	__unsafe_unretained NSString *code;
	__unsafe_unretained NSString *accessToken;
	__unsafe_unretained NSString *tokenType;
	__unsafe_unretained NSString *expiresIn;
	__unsafe_unretained NSString *username;
	__unsafe_unretained NSString *password;
	__unsafe_unretained NSString *refreshToken;
	__unsafe_unretained NSString *token;
	__unsafe_unretained NSString *authorizationCode;
	__unsafe_unretained NSString *oauthToken;
	__unsafe_unretained NSString *bearer;
} DCTOAuth2Keys;
