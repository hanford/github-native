//
//  DCTOAuth2RequestType.m
//  DCTAuth
//
//  Created by Daniel Tull on 17.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

#import "DCTOAuth2RequestType.h"

const struct DCTOAuth2RequestType DCTOAuth2RequestType = {
	.accessToken = @"DCTOAuth2AccountAccessTokenRequestType",
	.authorize = @"DCTOAuth2AccountAuthorizeRequestType",
	.refresh = @"DCTOAuth2AccountRefreshRequestType",
	.signing = @"DCTOAuth2AccountSigningRequestType"
};
