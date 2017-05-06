//
//  DCTAuthRequest.h
//  DCTAuth
//
//  Created by Daniel Tull on 24.08.2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuthRequestMethod.h"
#import "DCTAuthAccount.h"
#import "DCTAuthAccountSubclass.h"
#import "DCTAuthResponse.h"
#import "DCTAuthContent.h"

typedef void(^DCTAuthRequestHandler)(DCTAuthResponse *response, NSError *error);

/** 
 *  The DCTAuthRequest object encapsulates the properties of an HTTP request 
 *  that you send to a service to perform some operation on behalf of the user. 
 *  The DCTAuthRequest class provides a convenient template for you to make 
 *  requests, and handles user authentication.
 *
 *  HTTP requests have these common components: a URL identifying the 
 *  operation to perform, the HTTP method (GET, POST, or DELETE), a set of 
 *  query parameters that depends on the operation, and an optional multipart 
 *  POST body containing additional data. The values for these properties depend 
 *  on the request you are sending.
 *
 *  Use the initWithRequestMethod:URL:parameters: method to initialize a newly 
 *  created DCTAuthRequest object passing the required property values. Use the
 *  addMultiPartData:withName:type: to optionally specify a multipart POST body. 
 *  Use the performRequestWithHandler: method to perform the actual request
 *  specifying the handler to call when the request is done. Alternatively, 
 *  you can use the signedURLRequest method to create a request that you send
 *  using an NSURLConnection object.
 *
 *  If the request requires user authorization, set the account property to an
 *  DCTAuthAccount object.
 *
 */
@interface DCTAuthRequest : NSObject <NSCoding>

/// @name Initializing Requests

/**
 *  Initializes a newly created request object with the specified properties.
 *
 *  @param requestMethod The method to use for this HTTP request.
 *  @param URL The destination URL for this HTTP request.
 *  @param items An array of NSURLQueryItem objects.
 *  @return The newly initialized request object.
 */
- (instancetype)initWithRequestMethod:(DCTAuthRequestMethod)requestMethod URL:(NSURL *)URL items:(NSArray *)items;

/// @name Accessing Properties

/**
 *  The destination URL for this request.
 *
 *  This is the URL for the HTTP request.
 */
@property (nonatomic, readonly) NSURL *URL;

/** 
 *  The method to use for this request.
 *
 *  This property specifies the method of the HTTP request.
 */
@property (nonatomic, readonly) DCTAuthRequestMethod requestMethod;

/**
 *  The parameters for this request.
 *
 *  These are the query parameters for this HTTP request.
 */
@property (nonatomic, readonly) NSArray *items;

/** 
 *  The HTTPHeaders for this request.
 */
@property (nonatomic, copy) NSDictionary *HTTPHeaders;

/** 
 *  Optional account information used to authenticate the request.
 *
 *  Default is nil.
 */
@property (nonatomic) DCTAuthAccount *account;

/** 
 *  The content type to encode the POST body parameters.
 *
 *  Default is DCTAuthContentTypeForm
 */
@property (nonatomic) DCTAuthContent *content;

/**
 *  Specifies a named multipart POST body for this request.
 *
 *  @param data The data for the multipart POST body.
 *  @param name The name of the multipart POST body.
 *  @param type The type of the multipart POST body.
 */
- (void)addMultiPartData:(NSData *)data withName:(NSString *)name type:(NSString *)type;
- (void)addMultiPartData:(NSData *)data withName:(NSString *)name type:(NSString *)type filename:(NSString *)filename;

/// @name Sending Requests

/** 
 *  Returns an authorized request that can be sent using an NSURLConnection object.
 *
 *  @return An OAuth-compatible NSURLRequest object that allows an application 
 *  to act on behalf of the user while keeping the user’s password private.
 */
- (NSURLRequest *)signedURLRequest;

/**
 *  Performs the request and calls the specified handler when done.
 *
 *  @param handler The handler to call when the request is done.
 */
- (void)performRequestWithHandler:(DCTAuthRequestHandler)handler;

@end
