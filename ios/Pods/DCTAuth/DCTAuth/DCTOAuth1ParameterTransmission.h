//
//  DCTOAuth1ParameterTransmission.h
//  DCTAuth
//
//  Created by Daniel Tull on 17.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;

/**
 *  Defines how parameters should be transmitted to the server,
 *  Which is shown in section 3.5 of the OAuth spec.
 *  http://tools.ietf.org/html/rfc5849#section-3.5
 */
typedef NS_ENUM(NSInteger, DCTOAuth1ParameterTransmission) {
	/**
	 *  Transmit parameters as an Authorization header.
	 */
	DCTOAuth1ParameterTransmissionAuthorizationHeader = 0,
	/**
	 *  Transmit parameters in the URL query.
	 */
	DCTOAuth1ParameterTransmissionURLQuery
};
