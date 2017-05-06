//
//  DCTOAuth2Keys.m
//  DCTAuth
//
//  Created by Daniel Tull on 17.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

#import "DCTOAuth2Keys.h"

const struct DCTOAuth2Keys DCTOAuth2Keys = {
	.clientID = @"client_id",
	.clientSecret = @"client_secret",
	.responseType = @"response_type",
	.scope = @"scope",
	.state = @"state",
	.redirectURI = @"redirect_uri",
	.error = @"error",
	.errorDescription = @"error_description",
	.errorURI = @"error_uri",
	.grantType = @"grant_type",
	.code = @"code",
	.accessToken = @"access_token",
	.tokenType = @"token_type",
	.expiresIn = @"expires_in",
	.username = @"username",
	.password = @"password",
	.refreshToken = @"refresh_token",
	.token = @"token",
	.authorizationCode = @"authorization_code",
	.oauthToken = @"oauth_token",
	.bearer = @"Bearer"
};
