//
//  DCTOAuth1Keys.h
//  DCTAuth
//
//  Created by Daniel Tull on 22.10.2014.
//  Copyright (c) 2014 Daniel Tull. All rights reserved.
//

@import Foundation;

extern const struct DCTOAuth1Keys {
	__unsafe_unretained NSString *version;
	__unsafe_unretained NSString *nonce;
	__unsafe_unretained NSString *timestamp;
	__unsafe_unretained NSString *signature;
	__unsafe_unretained NSString *signatureMethod;
	__unsafe_unretained NSString *callback;
	__unsafe_unretained NSString *comsumerKey;
	__unsafe_unretained NSString *consumerSecret;
	__unsafe_unretained NSString *token;
	__unsafe_unretained NSString *tokenSecret;
	__unsafe_unretained NSString *verifier;
	__unsafe_unretained NSString *OAuth;
} DCTOAuth1Keys;
