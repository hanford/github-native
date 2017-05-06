//
//  DCTAuthKeychainAccess.h
//  DCTAuth
//
//  Created by Daniel Tull on 16/06/2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccountStore.h"

typedef NS_ENUM(NSInteger, DCTAuthKeychainAccessType) {
	DCTAuthKeychainAccessTypeAccount,
	DCTAuthKeychainAccessTypeCredential
};

@interface DCTAuthKeychainAccess : NSObject

+ (NSArray *)accountDataForStoreName:(NSString *)storeName
						 accessGroup:(NSString *)accessGroup
					  synchronizable:(BOOL)synchronizable;

+ (void)removeDataForAccountIdentifier:(NSString *)accountIdentifier
							 storeName:(NSString *)storeName
								  type:(DCTAuthKeychainAccessType)type
						   accessGroup:(NSString *)accessGroup
						synchronizable:(BOOL)synchronizable;

+ (void)addData:(NSData *)data
forAccountIdentifier:(NSString *)accountIdentifier
	  storeName:(NSString *)storeName
		   type:(DCTAuthKeychainAccessType)type
	accessGroup:(NSString *)accessGroup
 synchronizable:(BOOL)synchronizable;

+ (NSData *)dataForAccountIdentifier:(NSString *)accountIdentifier
						   storeName:(NSString *)storeName
								type:(DCTAuthKeychainAccessType)type
						 accessGroup:(NSString *)accessGroup
					  synchronizable:(BOOL)synchronizable;

@end
