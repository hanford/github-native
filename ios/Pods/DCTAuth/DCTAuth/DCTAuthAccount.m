//
//  DCTAuthAccount.m
//  DCTAuth
//
//  Created by Daniel Tull on 09.07.2010.
//  Copyright 2010 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccount+Private.h"
#import "DCTAuthAccountStore+Private.h"
#import "DCTAbstractAuthAccountProperties.h"
#import "DCTAuthAccountSubclass.h"

const struct DCTAuthAccountProperties DCTAuthAccountProperties = {
	.type = @"type",
	.identifier = @"identifier",
	.accountDescription = @"accountDescription",
	.callbackURL = @"callbackURL",
	.shouldSendCallbackURL = @"shouldSendCallbackURL",
	.userInfo = @"userInfo",
	.saveUUID = @"saveUUID",
	.extraItems = @"extraItems"
};

@interface DCTAbstractAuthAccount ()
@property (nonatomic, strong) id<DCTAuthAccountCredential> internalCredential;
@property (nonatomic, copy) NSURL *discoveredCallbackURL;
@property (nonatomic) NSMutableDictionary *extraItems;
@end

@implementation DCTAbstractAuthAccount

- (instancetype)init {
	return [self initWithType:@""];
}

- (instancetype)initWithType:(NSString *)type {
	self = [super init];
	if (!self) return nil;
	_type = [type copy];
	_identifier = [[NSUUID UUID] UUIDString];
	_extraItems = [NSMutableDictionary new];
	_shouldSendCallbackURL = YES;
	return self;
}

- (void)setItems:(NSArray *)items forRequestType:(NSString *)requestType {
	[self.extraItems setObject:[items copy] forKey:requestType];
}

- (NSArray *)itemsForRequestType:(NSString *)requestType {
	return [self.extraItems objectForKey:requestType];
}

- (BOOL)isAuthorized {
	return (self.credential != nil);
}

- (id<DCTAuthAccountCredential>)credential {

	if (self.internalCredential)
		return self.internalCredential;

	NSAssert([self conformsToProtocol:@protocol(DCTAuthAccountSubclass)], @"Should be a subclass.");
	DCTAuthAccount *account = (DCTAuthAccount *)self;
	return [self.accountStore retrieveCredentialForAccount:account];
}

- (void)setCredential:(id<DCTAuthAccountCredential>)credential {

	if (self.accountStore) {
		NSAssert([self conformsToProtocol:@protocol(DCTAuthAccountSubclass)], @"Should be a subclass.");
		DCTAuthAccount *account = (DCTAuthAccount *)self;
		[self.accountStore saveCredential:credential forAccount:account];
	} else {
		self.internalCredential = credential;
	}
}

- (void)setAccountStore:(DCTAuthAccountStore *)accountStore {

	_accountStore = accountStore;

	if (self.internalCredential) {
		NSAssert([self conformsToProtocol:@protocol(DCTAuthAccountSubclass)], @"Should be a subclass.");
		DCTAuthAccount *account = (DCTAuthAccount *)self;
		[accountStore saveCredential:self.internalCredential forAccount:account];
		self.internalCredential = nil;
	}
}

- (NSURL *)callbackURL {

	if (_callbackURL) return _callbackURL;

	if (!self.discoveredCallbackURL) {
		NSArray *types = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleURLTypes"];
		NSDictionary *type = [types lastObject];
		NSArray *schemes = [type objectForKey:@"CFBundleURLSchemes"];
		NSString *scheme = [NSString stringWithFormat:@"%@://%@/", [schemes lastObject], @([self.identifier hash])];
		self.discoveredCallbackURL = [NSURL URLWithString:scheme];
	}
	
	return self.discoveredCallbackURL;
}

#pragma mark - NSSecureCoding

+ (BOOL)supportsSecureCoding {
	return YES;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
	NSString *type = [coder decodeObjectForKey:DCTAbstractAuthAccountProperties.type];
	self = [self initWithType:type];
	if (!self) return nil;
	_type = [coder decodeObjectOfClass:[NSString class] forKey:DCTAbstractAuthAccountProperties.type];
	_identifier = [coder decodeObjectOfClass:[NSString class] forKey:DCTAbstractAuthAccountProperties.identifier];
	_callbackURL = [coder decodeObjectOfClass:[NSURL class] forKey:DCTAbstractAuthAccountProperties.callbackURL];
	_shouldSendCallbackURL = [coder decodeBoolForKey:DCTAbstractAuthAccountProperties.shouldSendCallbackURL];
	_accountDescription = [coder decodeObjectOfClass:[NSString class] forKey:DCTAbstractAuthAccountProperties.accountDescription];
	_userInfo = [coder decodeObjectOfClass:[NSDictionary class] forKey:DCTAbstractAuthAccountProperties.userInfo];
	_saveUUID = [coder decodeObjectOfClass:[NSString class] forKey:DCTAbstractAuthAccountProperties.saveUUID];

	NSDictionary *extraItems = [coder decodeObjectOfClass:[NSDictionary class] forKey:DCTAbstractAuthAccountProperties.extraItems];
	[_extraItems addEntriesFromDictionary:extraItems];

	return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
	[coder encodeObject:self.type forKey:DCTAbstractAuthAccountProperties.type];
	[coder encodeObject:self.identifier forKey:DCTAbstractAuthAccountProperties.identifier];
	[coder encodeObject:self.callbackURL forKey:DCTAbstractAuthAccountProperties.callbackURL];
	[coder encodeBool:self.shouldSendCallbackURL forKey:DCTAbstractAuthAccountProperties.shouldSendCallbackURL];
	[coder encodeObject:self.accountDescription forKey:DCTAbstractAuthAccountProperties.accountDescription];
	[coder encodeObject:self.userInfo forKey:DCTAbstractAuthAccountProperties.userInfo];
	[coder encodeObject:self.saveUUID forKey:DCTAbstractAuthAccountProperties.saveUUID];
	[coder encodeObject:self.extraItems forKey:DCTAbstractAuthAccountProperties.extraItems];
}

#pragma mark - NSObject

- (NSString *)description {
	return [NSString stringWithFormat:@"<%@: %p; type = %@; identifier = %@; credential = %@>",
			NSStringFromClass([self class]),
			(void *)self,
			self.type,
			self.identifier,
			self.credential];
}

@end
