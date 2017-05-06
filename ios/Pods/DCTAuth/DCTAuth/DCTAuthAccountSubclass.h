//
//  DCTAuthAccountSubclass.h
//  DCTAuth
//
//  Created by Daniel Tull on 27.10.2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

@import Foundation;
@class DCTAuthResponse;

/**
 *  This is a protocol that should be adopted by DCTAuthAccount subclasses. 
 */
@protocol DCTAuthAccountSubclass <NSObject>

/**
 *  A method to allow account subclasses to sign a URL request.
 *
 *  DCTAuthAccount subclasses need to implment this method and use their credentials to modify
 *  the given mutable request so that it is authorized for the user's account. For example in the
 *  case of OAuth 1.0, the account adds a signed Authorization header to the request, with the
 *  correct OAuth parameters.
 *
 *  @param request The request to be signed.
 */
- (void)signURLRequest:(NSMutableURLRequest *)request;

/**
 *  Authenticate the account.
 *
 *  Different subclasses will authenticate differently, in the case of OAuth and OAuth 2.0, this
 *  will cause Safari to open for the user to login.
 *
 *  @param handler This handler is called when the authentication succeeds or fails. In the case
 *  of multiple resquests, the reponses dictionary will contain the responses of each stage of
 *  authentication. This means the responses can contain values, even if the authentication fails.
 *  You should check the error value to see if there was an error.
 *
 *  @see [DCTAuth handleURL:]
 *  @see reauthenticateWithHandler:
 */
- (void)authenticateWithHandler:(void(^)(NSArray *responses, NSError *error))handler;

/**
 *  This will cause the account to refresh its credentials if it supports it, eg OAuth2.
 *  Otherwise this calls the handler with a nil response and an error, you should probably then
 *  call -authenticateWithHandler.
 *
 *  For included account types, this method  never require user input and never attempt
 *  to open a WebView. For your own DCTAuthAccount subclasses, you should adhere to the same principles
 *  and use this as a headless method.
 *
 *  If you use -[DCTAuthRequest performRequestWithHandler:] it will automatically call this method
 *  if there is an error and if it succeds, will attempt to perform the request again before
 *  calling its completion handler.
 *
 *  @see authenticateWithHandler:
 */
- (void)reauthenticateWithHandler:(void(^)(DCTAuthResponse *response, NSError *error))handler;

/** Cancel the in-progress authentication or reauthentication. */
- (void)cancelAuthentication;

@end
