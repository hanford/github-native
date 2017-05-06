//
//  DCTAuthRequestMethod.h
//  DCTAuth
//
//  Created by Daniel Tull on 21.10.2014.
//  Copyright (c) 2014 Daniel Tull. All rights reserved.
//

@import Foundation;

/** The potential request methods that can be used.
 */
typedef NS_ENUM(NSUInteger, DCTAuthRequestMethod) {

	/** GET request. */
	DCTAuthRequestMethodGET,

	/** POST request. */
	DCTAuthRequestMethodPOST,

	/** DELETE request. */
	DCTAuthRequestMethodDELETE,

	/** HEAD request. */
	DCTAuthRequestMethodHEAD,

	/** PUT request. */
	DCTAuthRequestMethodPUT,

	/** PATCH request. */
	DCTAuthRequestMethodPATCH,

	/** OPTIONS request. */
	DCTAuthRequestMethodOPTIONS,

	/** TRACE request. */
	DCTAuthRequestMethodTRACE
};

/** The potential request methods that can be used.
 */
NSString * NSStringFromDCTAuthRequestMethod(DCTAuthRequestMethod method);
