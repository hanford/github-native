//
//  DCTOAuth2RequestType.h
//  DCTAuth
//
//  Created by Daniel Tull on 17.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;


#ifdef APPLEDOC

/**
 The types of request that a DCTOAuth2Account performs. Use these
 values to add extra query items to the requests with -[DCTAuthAccount setItems:forRequestType:].
 
 @see -[DCTAuthAccount setItems:forRequestType:] 
 */
typedef NS_ENUM(NSString, DCTOAuth2RequestType) {

	/** The request when fetching the access token. */
	DCTOAuth2RequestType.accessToken,

	/** The request when authorizing the user. */
	DCTOAuth2RequestType.authorize,

	/** The request when refreshing the access token. */
	DCTOAuth2RequestType.refresh,

	/** Used for signing parameters. */
	DCTOAuth2RequestType.signing
};

#else

extern const struct DCTOAuth2RequestType {
	__unsafe_unretained NSString *accessToken;
	__unsafe_unretained NSString *authorize;
	__unsafe_unretained NSString *refresh;
	__unsafe_unretained NSString *signing;
} DCTOAuth2RequestType;

#endif
