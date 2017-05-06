//
//  DCTOAuth1Keys.m
//  DCTAuth
//
//  Created by Daniel Tull on 22.10.2014.
//  Copyright (c) 2014 Daniel Tull. All rights reserved.
//

#import "DCTOAuth1Keys.h"

const struct DCTOAuth1Keys DCTOAuth1Keys = {
	.version = @"oauth_version",
	.nonce = @"oauth_nonce",
	.timestamp = @"oauth_timestamp",
	.signature = @"oauth_signature",
	.signatureMethod = @"oauth_signature_method",
	.callback = @"oauth_callback",
	.comsumerKey = @"oauth_consumer_key",
	.consumerSecret = @"oauth_consumer_secret",
	.token = @"oauth_token",
	.tokenSecret = @"oauth_token_secret",
	.verifier = @"oauth_verifier",
	.OAuth = @"OAuth"
};
