//
//  DCTAuthAccountStore.h
//  DCTAuth
//
//  Created by Daniel Tull on 26/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccount.h"
@protocol DCTAuthAccountSubclass;

extern const struct DCTAuthAccountStoreProperties {
	__unsafe_unretained NSString *name;
	__unsafe_unretained NSString *accessGroup;
	__unsafe_unretained NSString *synchronizable;
	__unsafe_unretained NSString *identifier;
	__unsafe_unretained NSString *accounts;
} DCTAuthAccountStoreProperties;

extern NSString *const DCTAuthAccountStoreDidInsertAccountNotification;
extern NSString *const DCTAuthAccountStoreDidChangeAccountNotification;
extern NSString *const DCTAuthAccountStoreDidRemoveAccountNotification;
extern NSString *const DCTAuthAccountStoreAccountKey;

/** 
 The DCTAuthAccountStore class provides an interface for accessing,
 manipulating, and storing accounts. To create and retrieve accounts
 from the database, you must create an DCTAuthAccountStore object.
 
 Each DCTAuthAccount object belongs to a single DCTAuthAccountStore object.
 */
@interface DCTAuthAccountStore : NSObject

#pragma mark - Getting an account store
/// @name Getting an account store

/**
 Get a store in the default directory with a given name.

 Has nil accessGroup.
 Doesn't synchronize over iCloud.

 @param name The name of the store to retrieve.
 @return The store with the given name.
 */
+ (instancetype)accountStoreWithName:(NSString *)name;

/**
 Get a store in the default directory with a given name.

 @param name           The name of the store to retrieve.
 @param accessGroup    The access group name.
 @param synchronizable Whether to use the iCloud keychain to synchronize the account.

 @return The store with the given name and properties.
 */
+ (instancetype)accountStoreWithName:(NSString *)name accessGroup:(NSString *)accessGroup synchronizable:(BOOL)synchronizable;

#pragma mark - Store Details
/// @name Store Details

/** The provided name of the store. */
@property (nonatomic, readonly) NSString *name;

/** The access group name. */
@property (nonatomic, readonly) NSString *accessGroup;

/** Whether this store uses iCloud keychain to synchronize accounts. */
@property (nonatomic, readonly) BOOL synchronizable;

#pragma mark - Retrieving accounts
/** @name Retrieving accounts */

/** The accounts managed by this account store. */
@property(nonatomic, readonly) NSSet *accounts;

/**
 Returns all accounts of the specified type.

 @param accountType The type of an account.
 @return All accounts that match accountType.
 @see [DCTAuthAccount type]
 */
- (NSSet *)accountsWithType:(NSString *)accountType;

/**
 Returns the account with the specified identifier.

 @param identifier A unique identifier for an account.
 @return The account that matches the value specified in identifier.
 */
- (DCTAuthAccount *)accountWithIdentifier:(NSString *)identifier;

#pragma mark - Managing accounts
/** @name Managing accounts */

/** 
 Saves an account to the Accounts database.

 @param account The account to save. Must not be nil.
 */
- (void)saveAccount:(DCTAuthAccount *)account __attribute__((nonnull(1))) __attribute((objc_requires_super));

/**
 Deletes an account from the Accounts database.

 @param account The account to delete. Must not be nil.
 */
- (void)deleteAccount:(DCTAuthAccount *)account __attribute__((nonnull(1))) __attribute((objc_requires_super));

@end
