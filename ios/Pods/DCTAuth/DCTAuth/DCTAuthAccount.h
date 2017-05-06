//
//  DCTAuthAccount.h
//  DCTAuth
//
//  Created by Daniel Tull on 09.07.2010.
//  Copyright 2010 Daniel Tull. All rights reserved.
//

@import Foundation;
@class DCTAuthResponse;
@protocol DCTAuthAccountCredential;
@protocol DCTAuthAccountSubclass;

extern const struct DCTAuthAccountProperties {
	__unsafe_unretained NSString *type;
	__unsafe_unretained NSString *identifier;
	__unsafe_unretained NSString *accountDescription;
	__unsafe_unretained NSString *callbackURL;
	__unsafe_unretained NSString *shouldSendCallbackURL;
	__unsafe_unretained NSString *userInfo;
	__unsafe_unretained NSString *saveUUID;
	__unsafe_unretained NSString *extraItems;
} DCTAuthAccountProperties;

/**
 DCTAbstractAuthAccount is an abstract class that should
 be subclassed to use. DCTAuth provides the following account
 subclasses; DCTOAuth1Account, DCTOAuth2Account and
 DCTBasicAuthAccount.
 
 An account provides information about a user account, as
 well as implementing authentications with servers.
 
 Subclasses need to implement the authentication methods
 in DCTAuthAccountSubclass.

 For simplicitiy there is `DCTAuthAccount` which is defined as:
 
	typedef DCTAbstractAuthAccount<DCTAuthAccountSubclass> DCTAuthAccount;

 This means subclasses can inherit from this and will
 get warnings for methods in `DCTAuthAccountSubclass` that 
 haven't been implmented. For example, DCTOAuth1Account is defined
 as:

	@interface DCTOAuth1Account : DCTAuthAccount

 This is also compatible with how account subclasses were created in 
 past versions of DCTAuth.
*/
@interface DCTAbstractAuthAccount : NSObject <NSSecureCoding>

#pragma mark - Initialization
/// @name Initialization

/**
 *  Initializer for DCTAuthAccount, subclasses should call this method to initialize.
 *
 *  @param type The type of the account.
 *  @return The newly initialized object.
 *  @see type
 */
- (instancetype)initWithType:(NSString *)type __attribute((objc_requires_super)) __attribute__((objc_designated_initializer));



#pragma mark - Accessing Properties
/// @name Accessing Properties

/**
 *  The type of service account, which is user defined at the creation of an account.
 *
 *  Once set for an account, it will always be the same and can be used to lookup accounts
 *  for a particular service. It is currently not used for any other purpose.
 *
 *  @see -[DCTAuthAccountStore accountsWithType:]
 */
@property (nonatomic, readonly) NSString *type;

/**
 *  A unique identifier for this account.
 *
 *  This identifier is random and assigned when the account is created.
 *
 *  Use the -[DCTAuthAccountStore accountWithIdentifier:] method to get an account with the specified identifier.
 *
 *  @see -[DCTAuthAccountStore accountWithIdentifier:]
 */
@property (nonatomic, readonly) NSString *identifier;

/**
 *  Shows if the account is authorized.
 *
 *  @see authenticateWithHandler: 
 */
@property (nonatomic, readonly, getter = isAuthorized) BOOL authorized;

/** The credential for the account. */
@property (nonatomic) id<DCTAuthAccountCredential> credential;

/** A human-readable description of the account. */
@property (nonatomic, copy) NSString *accountDescription;


#pragma mark - Callback
/// @name Callback

/** 
 *  The URL the OAuth authorization process will call back to.
 *
 *  Facebook expects the URL to have a callback URL of fb[App ID]://authorize/ for the website or
 *  fb[App ID]://authorize for authorizing against their iOS app.
 *
 *  @see shouldSendCallbackURL
 */
@property (nonatomic, copy) NSURL *callbackURL;

/**
 *  When authenticating, if this is yes the callbackURL will be sent in requests.
 *
 *  Defaults to NO.
 */
@property (nonatomic) BOOL shouldSendCallbackURL;

#pragma mark - Extra Items
/// @name Extra Items

/** Get the extra items that were defined for the request type. */
- (NSArray *)itemsForRequestType:(NSString *)requestType;

/** Allows users to set extra NSQueryItems for a particular request type.
 *
 *  Currently the OAuth 2 accounts are the only ones to make use of these extra items. (See the DCTOAuth2RequestType struct) 
 *
 *	@see itemsForRequestType:
 */
- (void)setItems:(NSArray *)items forRequestType:(NSString *)requestType;

/** User info that gets saved with the account. 
 
 All items should conform to NSCoding.
*/
@property (nonatomic, copy) NSDictionary *userInfo;

@end

/** Trial */
typedef DCTAbstractAuthAccount<DCTAuthAccountSubclass> DCTAuthAccount;
