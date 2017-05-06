//
//  DCTAuthAccountStoreQuery.h
//  DCTAuth
//
//  Created by Daniel Tull on 19.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;
@class DCTAuthAccountStore;
@protocol DCTAuthAccountStoreQueryDelegate;

extern const struct DCTAuthAccountStoreQueryAttributes {
	__unsafe_unretained NSString *predicate;
	__unsafe_unretained NSString *sortDescriptors;
	__unsafe_unretained NSString *accounts;
} DCTAuthAccountStoreQueryAttributes;

/** 
 Filters and sorts accounts from a given account store
 and reports any changes to its delegate.
 */
@interface DCTAuthAccountStoreQuery : NSObject

/**
 Initializes an account store query object.

 @param accountStore The account store from which to filter and observe changes.
 @param predicate The predicate with which to filter accounts.
 @param sortDescriptors An array of NSSortDescriptor objects used to sort the accounts.
 @return The newly initialized object.
 */
- (instancetype)initWithAccountStore:(DCTAuthAccountStore *)accountStore
						   predciate:(NSPredicate *)predicate
					 sortDescriptors:(NSArray *)sortDescriptors;

/** The account store from which to filter and observe changes. */
@property (nonatomic, readonly) DCTAuthAccountStore *accountStore;

/** The predicate with which to filter accounts. */
@property (nonatomic, readonly) NSPredicate *predicate;

/** An array of NSSortDescriptor objects used to sort the accounts. */
@property (nonatomic, readonly) NSArray *sortDescriptors;

/** The filtered, sorted accounts. */
@property (nonatomic, readonly) NSArray *accounts;

/** The delegate which changes are reported to. */
@property (nonatomic, weak) id<DCTAuthAccountStoreQueryDelegate> delegate;


@end
