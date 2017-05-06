//
//  DCTOAuth1SignatureType.h
//  DCTAuth
//
//  Created by Daniel Tull on 17.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;

/**
 *  The different OAuth signature types.
 */
typedef NS_ENUM(NSInteger, DCTOAuth1SignatureType) {
	/**
	 *  Encode using HMAC-SHA1.
	 */
	DCTOAuth1SignatureTypeHMAC_SHA1 = 0,
	/**
	 *  Encode using plaintext.
	 *
	 *  This should be used for debugging purposes only.
	 */
	DCTOAuth1SignatureTypePlaintext
};
