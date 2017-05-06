//
//  DCTAuthResponse.h
//  DCTAuth
//
//  Created by Daniel Tull on 22.01.2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

@import Foundation;

/** 
 *  DCTAuthResponse wraps two forms of response, either a standard
 *  HTTP URL response or a URL callback, such as one received when
 *  performing an OAuth authentication. The main goal is to abstract the
 *  contentObject, which aims to be populated with relavent native object.
 *
 *  In the case of a URL callback, it will take the values in the
 *  query and fragment components of the URL and populate a dictionary.
 *
 *  In the case of a HTTP URL response, it will use the MIME type and
 *  try to create a dictionary (in the case of JSON, Plist or form data)
 *  or an image (in the case of image data).
 */
@interface DCTAuthResponse : NSObject <NSCoding>

/// @name Initializing Requests

/** 
 *  Initializes an auth response object with data and a HTTP URL response.
 *
 *  @param data The data received from the connection.
 *  @param URLResponse The response from the connection.
 *  @return The newly initialized request object.
 */
- (instancetype)initWithData:(NSData *)data URLResponse:(NSURLResponse *)URLResponse;

/** 
 *  For use when the response is a callback URL.
 *
 *  @param URL The full URL that was called back.
 *  @return The newly initialized request object.
 */
- (instancetype)initWithURL:(NSURL *)URL;

/// @name Accessing Properties

/**
 *  The status code of the response.
 */
@property (nonatomic, readonly) NSInteger statusCode;

/**
 *  The headers of the response.
 */
@property (nonatomic, readonly) NSDictionary *HTTPHeaders;

/**
 *  If the auth response is created
 */
@property (nonatomic, readonly) NSURL *URL;

/**
 *  The actual data received from the connection.
 */
@property (nonatomic, readonly) NSData *data;

/**
 *  The actual URL response object received from the connection.
 */
@property (nonatomic, readonly) NSHTTPURLResponse *URLResponse;

/**
 *  The response object as a native class. For example if the
 *  data is json or plist, this will be a dictionary. If the data
 *  is an image, on iOS it will be a UIImage, on Mac OS X it will
 *  be an NSImage.
 */
@property (nonatomic, readonly) id contentObject;

/// @name Getting a Response Description

/**
 *  Provides a description of the response, in a familiar way.
 */
- (NSString *)responseDescription;

@end
