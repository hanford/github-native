//
//  DCTAuthAccountStoreQuery.m
//  DCTAuth
//
//  Created by Daniel Tull on 19.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccountStoreQuery.h"
#import "DCTAuthAccountStoreQueryDelegate.h"
#import "DCTAuthAccountStore.h"

const struct DCTAuthAccountStoreQueryAttributes DCTAuthAccountStoreQueryAttributes = {
	.predicate = @"predicate",
	.sortDescriptors = @"sortDescriptors",
	.accounts = @"accounts"
};

@interface DCTAuthAccountStoreQuery ()
@property (nonatomic, readwrite) NSArray *accounts;
@end

@implementation DCTAuthAccountStoreQuery

- (void)dealloc {
	NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
	[notificationCenter removeObserver:self name:DCTAuthAccountStoreDidInsertAccountNotification object:_accountStore];
	[notificationCenter removeObserver:self name:DCTAuthAccountStoreDidChangeAccountNotification object:_accountStore];
	[notificationCenter removeObserver:self name:DCTAuthAccountStoreDidRemoveAccountNotification object:_accountStore];
}

- (instancetype)initWithAccountStore:(DCTAuthAccountStore *)accountStore
						   predciate:(NSPredicate *)predicate
					 sortDescriptors:(NSArray *)sortDescriptors {

	NSParameterAssert(accountStore);
	NSParameterAssert(sortDescriptors);

	self = [super init];
	if (!self) return nil;

	_accountStore = accountStore;
	_predicate = predicate;
	_sortDescriptors = sortDescriptors;
	_accounts = [self accountsFromAccountStore:accountStore predciate:predicate sortDescriptors:sortDescriptors];

	NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
	[notificationCenter addObserver:self selector:@selector(accountStoreDidInsertObjectNotification:) name:DCTAuthAccountStoreDidInsertAccountNotification object:accountStore];
	[notificationCenter addObserver:self selector:@selector(accountStoreDidChangeObjectNotification:) name:DCTAuthAccountStoreDidChangeAccountNotification object:accountStore];
	[notificationCenter addObserver:self selector:@selector(accountStoreDidRemoveObjectNotification:) name:DCTAuthAccountStoreDidRemoveAccountNotification object:accountStore];

	return self;
}

#pragma mark - Notifications

- (void)accountStoreDidInsertObjectNotification:(NSNotification *)notification {
	DCTAuthAccount *account = notification.userInfo[DCTAuthAccountStoreAccountKey];
	[self insertAccount:account];
}

- (void)accountStoreDidChangeObjectNotification:(NSNotification *)notification {
	DCTAuthAccount *account = notification.userInfo[DCTAuthAccountStoreAccountKey];
	[self updateAccount:account];
}

- (void)accountStoreDidRemoveObjectNotification:(NSNotification *)notification {
	DCTAuthAccount *account = notification.userInfo[DCTAuthAccountStoreAccountKey];
	[self removeAccount:account];
}

- (void)insertAccount:(DCTAuthAccount *)account {

	BOOL shouldInsert = self.predicate ? [self.predicate evaluateWithObject:account] : YES;
	if (!shouldInsert) return;

	NSUInteger index = [self newIndexOfAccount:account];
	[self insertAccount:account atIndex:index];
}

- (void)removeAccount:(DCTAuthAccount *)account {
	NSUInteger index = [self.accounts indexOfObject:account];
	[self removeAccount:account fromIndex:index];
}

- (void)moveAccount:(DCTAuthAccount *)account {
	NSUInteger oldIndex = [self.accounts indexOfObject:account];
	NSUInteger newIndex = [self newIndexOfAccount:account];
	[self moveAccount:account fromIndex:oldIndex toIndex:newIndex];
}

- (void)updateAccount:(DCTAuthAccount *)account {
	NSUInteger index = [self.accounts indexOfObject:account];
	NSUInteger newIndex = [self newIndexOfAccount:account];

	if (index != newIndex) {
		[self moveAccount:account fromIndex:index toIndex:newIndex];
		return;
	}

	[self updateAccount:account atIndex:index];
}

- (NSUInteger)newIndexOfAccount:(DCTAuthAccount *)account {
	NSMutableArray *accounts = [self.accounts mutableCopy];
	[accounts addObject:account];
	NSArray *sortedObjects = [accounts sortedArrayUsingDescriptors:self.sortDescriptors];
	return [sortedObjects indexOfObject:account];
}

#pragma mark - Raw

- (void)insertAccount:(DCTAuthAccount *)account atIndex:(NSUInteger)index {
	NSMutableArray *array = [self mutableArrayValueForKey:DCTAuthAccountStoreQueryAttributes.accounts];
	[array insertObject:account atIndex:index];

	[self.delegate accountStoreQuery:self didInsertAccount:account atIndex:index];
}

- (void)removeAccount:(DCTAuthAccount *)account fromIndex:(NSUInteger)index {
	NSMutableArray *array = [self mutableArrayValueForKey:DCTAuthAccountStoreQueryAttributes.accounts];
	[array removeObject:account];

	[self.delegate accountStoreQuery:self didRemoveAccount:account fromIndex:index];
}

- (void)moveAccount:(DCTAuthAccount *)account fromIndex:(NSUInteger)fromIndex toIndex:(NSUInteger)toIndex {
	NSMutableArray *array = [self mutableArrayValueForKey:DCTAuthAccountStoreQueryAttributes.accounts];
	[array sortUsingDescriptors:self.sortDescriptors];

	[self.delegate accountStoreQuery:self didMoveAccount:account fromIndex:fromIndex toIndex:toIndex];
}

- (void)updateAccount:(DCTAuthAccount *)account atIndex:(NSUInteger)index {
	NSMutableArray *array = [self mutableArrayValueForKey:DCTAuthAccountStoreQueryAttributes.accounts];
	[array removeObject:account];
	[array insertObject:account atIndex:index];

	[self.delegate accountStoreQuery:self didUpdateAccount:account atIndex:index];
}


#pragma mark - Helper methods

- (NSArray *)accountsFromAccountStore:(DCTAuthAccountStore *)objectStore
							predciate:(NSPredicate *)predicate
					  sortDescriptors:(NSArray *)sortDescriptors {

	NSArray *accounts = [objectStore.accounts allObjects];

	if (!accounts) {
		return @[];
	}

	if (predicate) {
		accounts = [accounts filteredArrayUsingPredicate:predicate];
	}

	return [accounts sortedArrayUsingDescriptors:sortDescriptors];
}

@end
