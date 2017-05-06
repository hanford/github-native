//
//  DCTOAuth2Credential.m
//  DCTAuth
//
//  Created by Daniel Tull on 23/02/2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTOAuth2Credential.h"
#import "DCTOAuth2.h"
#import "DCTOAuth2Keys.h"

static const struct DCTOAuth2CredentialProperties {
	__unsafe_unretained NSString *clientID;
	__unsafe_unretained NSString *clientSecret;
	__unsafe_unretained NSString *password;
	__unsafe_unretained NSString *accessToken;
	__unsafe_unretained NSString *refreshToken;
	__unsafe_unretained NSString *type;
} DCTOAuth2CredentialProperties;

static const struct DCTOAuth2CredentialProperties DCTOAuth2CredentialProperties = {
	.clientID = @"clientID",
	.clientSecret = @"clientSecret",
	.password = @"password",
	.accessToken = @"accessToken",
	.refreshToken = @"refreshToken",
	.type = @"type"
};

@implementation DCTOAuth2Credential

#pragma mark - DCTOAuth2Credential

- (instancetype)initWithClientID:(NSString *)clientID
					clientSecret:(NSString *)clientSecret
						password:(NSString *)password
					 accessToken:(NSString *)accessToken
					refreshToken:(NSString *)refreshToken
							type:(DCTOAuth2CredentialType)type {

	if (password.length == 0) {
		if (clientID.length == 0) return nil;
		if (accessToken.length == 0) return nil;
	}

	self = [self init];
	if (!self) return nil;
	_clientID = [clientID copy];
	_clientSecret = [clientSecret copy];
	_password = [password copy];
	_accessToken = [accessToken copy];
	_refreshToken = [refreshToken copy];
	_type = type;
	return self;
}

- (NSString *)authorizationHeader {

	if (!self.accessToken) {
		return nil;
	}

	return [NSString stringWithFormat:@"%@ %@", DCTOAuth2Keys.bearer, self.accessToken];
}

#pragma mark - NSSecureCoding

+ (BOOL)supportsSecureCoding {
	return YES;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
	self = [self init];
	if (!self) return nil;
	_clientID = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth2CredentialProperties.clientID];
	_clientSecret = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth2CredentialProperties.clientSecret];
	_password = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth2CredentialProperties.password];
	_accessToken = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth2CredentialProperties.accessToken];
	_refreshToken = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth2CredentialProperties.refreshToken];
	_type = [coder decodeIntegerForKey:DCTOAuth2CredentialProperties.type];
	return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
	[coder encodeObject:self.clientID forKey:DCTOAuth2CredentialProperties.clientID];
	[coder encodeObject:self.clientSecret forKey:DCTOAuth2CredentialProperties.clientSecret];
	[coder encodeObject:self.password forKey:DCTOAuth2CredentialProperties.password];
	[coder encodeObject:self.accessToken forKey:DCTOAuth2CredentialProperties.accessToken];
	[coder encodeObject:self.refreshToken forKey:DCTOAuth2CredentialProperties.refreshToken];
	[coder encodeInteger:self.type forKey:DCTOAuth2CredentialProperties.type];
}

#pragma mark - NSObject

- (NSString *)description {
	return [NSString stringWithFormat:@"<%@: %p; %@ = %@; %@ = %@; %@ = %@; %@ = %@>",
			NSStringFromClass([self class]),
			(void *)self,
			DCTOAuth2CredentialProperties.clientID, self.clientID,
			DCTOAuth2CredentialProperties.clientSecret, self.clientSecret,
			DCTOAuth2CredentialProperties.accessToken, self.accessToken,
			DCTOAuth2CredentialProperties.refreshToken, self.refreshToken];
}

@end
