//
//  DCTBasicAuthCredential.h
//  DCTAuth
//
//  Created by Daniel Tull on 22/02/2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccountCredential.h"

@interface DCTBasicAuthCredential : NSObject <DCTAuthAccountCredential>

/**
 *  Creates a credential for a basic account.
 *
 *  @param username The username.
 *  @param password The password.
 *
 *  @return Newly initialized credential.
 */
- (instancetype)initWithUsername:(NSString *)username
						password:(NSString *)password;

/** The username. */
@property (nonatomic, readonly) NSString *username;

/** The password. */
@property (nonatomic, readonly) NSString *password;

/** Generated authorization header. */
@property (nonatomic, readonly) NSString *authorizationHeader;

@end
