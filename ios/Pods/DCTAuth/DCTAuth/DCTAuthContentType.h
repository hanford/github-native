//
//  DCTAuthContentType.h
//  DCTAuth
//
//  Created by Daniel Tull on 30.01.2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

@import Foundation;

/**
 * Defines how to encode the body of a HTTP request.
 */
typedef NS_ENUM(NSUInteger, DCTAuthContentType) {

	/** Encode as a standard HTTP form. */
	DCTAuthContentTypeForm,

	/** Encode as JSON. */
	DCTAuthContentTypeJSON
};
