//
//  DCTBasicAuthAccount.h
//  DCTAuth
//
//  Created by Daniel Tull on 29/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccount.h"
#import "DCTBasicAuthCredential.h"

/** Implementation of basic authentication	. */
@interface DCTBasicAuthAccount : DCTAuthAccount

/**
 *  Creates an account using basic authentication.
 *
 *  @param type The type of the account.
 *  @param authenticationURL The URL to authenticate with.
 *  @param username The username for this account.
 *  @param password The password for this account.
 *
 *  @return Newly initialized account.
 */
- (instancetype)initWithType:(NSString *)type
		   authenticationURL:(NSURL *)authenticationURL
					username:(NSString *)username
					password:(NSString *)password;

/** The authentication URL. */
@property (nonatomic, readonly) NSURL *authenticationURL;

/** The username. */
@property (nonatomic, readonly) NSString *username;

/** The password. */
@property (nonatomic, readonly) NSString *password;

/** The credential for the account. */
@property (nonatomic) DCTBasicAuthCredential *credential;

@end
