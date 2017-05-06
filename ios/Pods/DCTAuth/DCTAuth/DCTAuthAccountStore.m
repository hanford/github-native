//
//  DCTAuthAccountStore.m
//  DCTAuth
//
//  Created by Daniel Tull on 26/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccountStore+Private.h"
#import "DCTAbstractAuthAccountProperties.h"
#import "DCTAuthKeychainAccess.h"
#import "DCTAuthAccount+Private.h"
#import "NSKeyedUnarchiver+DCTAuth.h"

#if TARGET_OS_IPHONE
@import UIKit;
#else
@import Cocoa;
#endif

const struct DCTAuthAccountStoreProperties DCTAuthAccountStoreProperties = {
	.name = @"name",
	.accessGroup = @"accessGroup",
	.synchronizable = @"synchronizable",
	.identifier = @"identifier",
	.accounts = @"accounts"
};

NSString *const DCTAuthAccountStoreDidInsertAccountNotification = @"DCTAuthAccountStoreDidInsertAccountNotification";
NSString *const DCTAuthAccountStoreDidChangeAccountNotification = @"DCTAuthAccountStoreDidChangeAccountNotification";
NSString *const DCTAuthAccountStoreDidRemoveAccountNotification = @"DCTAuthAccountStoreDidRemoveAccountNotification";
NSString *const DCTAuthAccountStoreAccountKey = @"DCTAuthAccountStoreAccountKey";

static NSTimeInterval const DCTAuthAccountStoreUpdateTimeInterval = 15.0;

@interface DCTAuthAccountStore ()
@property(nonatomic, readwrite) NSSet *accounts;
@property (nonatomic) NSTimer *updateTimer;
@end

@implementation DCTAuthAccountStore

+ (NSMutableArray *)accountStores {
	static NSMutableArray *accountStores = nil;
	static dispatch_once_t accountStoresToken;
	dispatch_once(&accountStoresToken, ^{
		accountStores = [NSMutableArray new];
	});
	return accountStores;
}

+ (instancetype)accountStoreWithName:(NSString *)name {
	return [self accountStoreWithName:name accessGroup:nil synchronizable:NO];
}

+ (instancetype)accountStoreWithName:(NSString *)name accessGroup:(NSString *)accessGroup synchronizable:(BOOL)synchronizable {

	NSMutableArray *accountStores = [self accountStores];

	NSPredicate *namePredicate = [NSPredicate predicateWithFormat:@"%K == %@", DCTAuthAccountStoreProperties.name, name];
	NSPredicate *accessGroupPredicate = [NSPredicate predicateWithFormat:@"%K == %@", DCTAuthAccountStoreProperties.accessGroup, accessGroup];
	NSPredicate *synchronizablePredicate = [NSPredicate predicateWithFormat:@"%K == %@", DCTAuthAccountStoreProperties.synchronizable, @(synchronizable)];
	NSPredicate *predicate = [NSCompoundPredicate andPredicateWithSubpredicates:@[namePredicate, accessGroupPredicate, synchronizablePredicate]];
	NSArray *filteredArray = [accountStores filteredArrayUsingPredicate:predicate];

	DCTAuthAccountStore *accountStore = [filteredArray firstObject];
	if (!accountStore) {
		accountStore = [[self alloc] initWithName:name accessGroup:accessGroup synchronizable:synchronizable];
		[accountStores addObject:accountStore];
	}

	return accountStore;
}

- (void)dealloc {
	self.updateTimer = nil;

#if TARGET_OS_IPHONE
	NSString *becomeActiveNotification = UIApplicationDidBecomeActiveNotification;
	NSString *resignActiveNotification = UIApplicationWillResignActiveNotification;
#else
	NSString *becomeActiveNotification = NSApplicationDidBecomeActiveNotification;
	NSString *resignActiveNotification = NSApplicationWillResignActiveNotification;
#endif

	NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
	[notificationCenter removeObserver:self name:becomeActiveNotification object:nil];
	[notificationCenter removeObserver:self name:resignActiveNotification object:nil];
}

- (instancetype)initWithName:(NSString *)name accessGroup:(NSString *)accessGroup synchronizable:(BOOL)synchronizable {
	self = [super init];
	if (!self) return nil;
	_name = [name copy];
	_accessGroup = [accessGroup copy];
	_synchronizable = synchronizable;
	_accounts = [NSSet new];
	[self updateAccountList];

	if (accessGroup.length == 0 && !synchronizable) return self;

#if TARGET_OS_IPHONE
	NSString *becomeActiveNotification = UIApplicationDidBecomeActiveNotification;
	NSString *resignActiveNotification = UIApplicationWillResignActiveNotification;
#else
	NSString *becomeActiveNotification = NSApplicationDidBecomeActiveNotification;
	NSString *resignActiveNotification = NSApplicationWillResignActiveNotification;
#endif

	NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
	[notificationCenter addObserver:self selector:@selector(applicationDidBecomeActiveNotification:) name:becomeActiveNotification object:nil];
	[notificationCenter addObserver:self selector:@selector(applicationWillResignActiveNotification:) name:resignActiveNotification object:nil];

	_updateTimer = [NSTimer scheduledTimerWithTimeInterval:DCTAuthAccountStoreUpdateTimeInterval target:self selector:@selector(updateTimer:) userInfo:nil repeats:YES];

	return self;
}

- (void)applicationDidBecomeActiveNotification:(NSNotification *)notification {
	[self updateAccountList];
	self.updateTimer = [NSTimer scheduledTimerWithTimeInterval:DCTAuthAccountStoreUpdateTimeInterval target:self selector:@selector(updateTimer:) userInfo:nil repeats:YES];
}

- (void)applicationWillResignActiveNotification:(NSNotification *)notification {
	self.updateTimer = nil;
}

- (void)setUpdateTimer:(NSTimer *)updateTimer {
	[_updateTimer invalidate];
	_updateTimer = updateTimer;
}

- (void)updateTimer:(NSTimer *)timer {
	[self updateAccountList];
}

- (void)updateAccountList {

	if (![NSThread isMainThread]) {
		dispatch_sync(dispatch_get_main_queue(), ^{
			[self updateAccountList];
		});
		return;
	}

	NSString *name = self.name;
	NSString *accessGroup = self.accessGroup;
	BOOL synchronizable = self.synchronizable;

	NSArray *accountDatas = [DCTAuthKeychainAccess accountDataForStoreName:name accessGroup:accessGroup synchronizable:synchronizable];

	if (!accountDatas) {
		return;
	}

	NSMutableArray *accountIdentifiersToDelete = [[self.accounts valueForKey:DCTAbstractAuthAccountProperties.identifier] mutableCopy];

	[accountDatas enumerateObjectsUsingBlock:^(NSData *data, NSUInteger i, BOOL *stop) {

		if (!data || [data isKindOfClass:[NSNull class]]) return;

		NSError *error;
		DCTAuthAccount *account = [NSKeyedUnarchiver dctAuth_unarchiveTopLevelObjectWithData:data error:&error];
		if (!account) {
			return;
		}

		account.accountStore = self;
		NSString *accountIdentifier = account.identifier;

		DCTAuthAccount *existingAccount = [self accountWithIdentifier:accountIdentifier];
		if (!existingAccount) {
			[self insertAccount:account];
		} else if (![account.saveUUID isEqualToString:existingAccount.saveUUID]) {
			[self updateExistingAccount:existingAccount newAccount:account];
		}
		[accountIdentifiersToDelete removeObject:accountIdentifier];
	}];

	for (NSString *accountIdentifier in accountIdentifiersToDelete) {
		DCTAuthAccount *account = [self accountWithIdentifier:accountIdentifier];
		[self deleteAccount:account];
	}
}

- (NSSet *)accountsWithType:(NSString *)accountType {
	NSPredicate *predicate = [NSPredicate predicateWithFormat:@"%K == %@", DCTAbstractAuthAccountProperties.type, accountType];
	return [self.accounts filteredSetUsingPredicate:predicate];
}

- (DCTAuthAccount *)accountWithIdentifier:(NSString *)identifier {
	NSPredicate *predicate = [NSPredicate predicateWithFormat:@"%K == %@", DCTAbstractAuthAccountProperties.identifier, identifier];
	NSSet *filteredAccounts = [self.accounts filteredSetUsingPredicate:predicate];
	return [filteredAccounts anyObject];
}

- (void)saveAccount:(DCTAuthAccount *)account {

	if (![NSThread isMainThread]) {
		dispatch_sync(dispatch_get_main_queue(), ^{
			[self saveAccount:account];
		});
		return;
	}

	NSString *identifier = account.identifier;
	NSString *storeName = self.name;
	account.saveUUID = [[NSUUID UUID] UUIDString];

	NSData *accountData = [NSKeyedArchiver archivedDataWithRootObject:account];
	[DCTAuthKeychainAccess addData:accountData
			   forAccountIdentifier:identifier
						  storeName:storeName
							   type:DCTAuthKeychainAccessTypeAccount
						accessGroup:self.accessGroup
					 synchronizable:self.synchronizable];

	// This will cause the account to call back to save its credential
	account.accountStore = self;

	DCTAuthAccount *existingAccount = [self accountWithIdentifier:account.identifier];
	if (existingAccount) {
		[self updateExistingAccount:existingAccount newAccount:account];
	} else {
		[self insertAccount:account];
	}
}

- (void)deleteAccount:(DCTAuthAccount *)account {

	if (![NSThread isMainThread]) {
		dispatch_sync(dispatch_get_main_queue(), ^{
			[self deleteAccount:account];
		});
		return;
	}

	NSString *identifier = account.identifier;
	NSString *storeName = self.name;
	[DCTAuthKeychainAccess removeDataForAccountIdentifier:identifier storeName:storeName type:DCTAuthKeychainAccessTypeAccount accessGroup:self.accessGroup synchronizable:self.synchronizable];
	[DCTAuthKeychainAccess removeDataForAccountIdentifier:identifier storeName:storeName type:DCTAuthKeychainAccessTypeCredential accessGroup:self.accessGroup synchronizable:self.synchronizable];
	[self removeAccount:account];
}

- (void)removeAccount:(DCTAuthAccount *)account {
	NSMutableSet *accounts = [self mutableSetValueForKey:DCTAuthAccountStoreProperties.accounts];
	[accounts removeObject:account];
	[self postNotificationWithName:DCTAuthAccountStoreDidRemoveAccountNotification account:account];
}

- (void)insertAccount:(DCTAuthAccount *)account {
	NSMutableSet *accounts = [self mutableSetValueForKey:DCTAuthAccountStoreProperties.accounts];
	[accounts addObject:account];
	[self postNotificationWithName:DCTAuthAccountStoreDidInsertAccountNotification account:account];
}

- (void)updateExistingAccount:(DCTAuthAccount *)oldAccount newAccount:(DCTAuthAccount *)newAccount {

	if (![oldAccount isEqual:newAccount]) {
		NSMutableSet *accounts = [self mutableSetValueForKey:DCTAuthAccountStoreProperties.accounts];
		[accounts removeObject:oldAccount];
		[accounts addObject:newAccount];
	}

	[self postNotificationWithName:DCTAuthAccountStoreDidChangeAccountNotification account:newAccount];
}

- (void)postNotificationWithName:(NSString *)name account:(DCTAuthAccount *)account {
	NSDictionary *info = @{ DCTAuthAccountStoreAccountKey : account };
	[[NSNotificationCenter defaultCenter] postNotificationName:name object:self userInfo:info];
}

@end




#pragma mark - Credentials

@implementation DCTAuthAccountStore (Private)

- (void)saveCredential:(id<DCTAuthAccountCredential>)credential forAccount:(DCTAuthAccount *)account {

	if (!credential) return;

	NSString *storeName = self.name;
	NSString *accessGroup = self.accessGroup;
	BOOL synchronizable = self.synchronizable;
	NSString *accountIdentifier = account.identifier;

	NSData *credentialData = [NSKeyedArchiver archivedDataWithRootObject:credential];
	[DCTAuthKeychainAccess addData:credentialData
			  forAccountIdentifier:accountIdentifier
						 storeName:storeName
							  type:DCTAuthKeychainAccessTypeCredential
					   accessGroup:accessGroup
					synchronizable:synchronizable];
}

- (id<DCTAuthAccountCredential>)retrieveCredentialForAccount:(DCTAuthAccount *)account {

	NSString *name = self.name;
	NSString *accessGroup = self.accessGroup;
	BOOL synchronizable = self.synchronizable;
	NSString *accountIdentifier = account.identifier;
	NSData *data = [DCTAuthKeychainAccess dataForAccountIdentifier:accountIdentifier
														 storeName:name
															  type:DCTAuthKeychainAccessTypeCredential
													   accessGroup:accessGroup
													synchronizable:synchronizable];
	if (!data) return nil;
	id<DCTAuthAccountCredential> credential = [NSKeyedUnarchiver unarchiveObjectWithData:data];
	if (![credential conformsToProtocol:@protocol(DCTAuthAccountCredential)]) return nil;
	return credential;
}

@end



