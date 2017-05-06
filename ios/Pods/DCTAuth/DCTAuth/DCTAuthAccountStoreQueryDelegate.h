//
//  DCTAuthAccountStoreQueryDelegate.h
//  DCTAuth
//
//  Created by Daniel Tull on 19.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;
#import "DCTAuthAccount.h"
@class DCTAuthAccountStoreQuery;

/**
 Defines methods which are needed to know about DCTAuthAccountStore
 changes from a DCTAuthAccountStoreQuery object.
 */
@protocol DCTAuthAccountStoreQueryDelegate <NSObject>

/** Tells the delegate that an account has been inserted.

 @param query The account store query.
 @param account The account being inserted.
 @param index The index that it is being inserted into.
 */
- (void)accountStoreQuery:(DCTAuthAccountStoreQuery *)query
		 didInsertAccount:(DCTAuthAccount *)account
				  atIndex:(NSUInteger)index;

/** Tells the delegate that an account has been removed.

 @param query The account store query.
 @param account The account being removed.
 @param index The index that it is being removed from.
 */
- (void)accountStoreQuery:(DCTAuthAccountStoreQuery *)query
		 didRemoveAccount:(DCTAuthAccount *)account
				fromIndex:(NSUInteger)index;

/** Tells the delegate that an account has been moved.

 @param query The account store query.
 @param account The account being moved.
 @param fromIndex The index that it is being moved to.
 @param toIndex The index that it is being moved to.
 */
- (void)accountStoreQuery:(DCTAuthAccountStoreQuery *)query
		   didMoveAccount:(DCTAuthAccount *)account
				fromIndex:(NSUInteger)fromIndex
				  toIndex:(NSUInteger)toIndex;

/** Tells the delegate that an account has been updated.

 @param query The account store query.
 @param account The account being updated.
 @param index The index of the account.
 */
- (void)accountStoreQuery:(DCTAuthAccountStoreQuery *)query
		 didUpdateAccount:(DCTAuthAccount *)account
				  atIndex:(NSUInteger)index;

@end
