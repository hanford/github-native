//
//  DCTBasicAuthCredential.m
//  DCTAuth
//
//  Created by Daniel Tull on 22/02/2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTBasicAuthCredential.h"

static const struct DCTBasicAuthCredentialProperties {
	__unsafe_unretained NSString *username;
	__unsafe_unretained NSString *password;
} DCTBasicAuthCredentialProperties;

static const struct DCTBasicAuthCredentialProperties DCTBasicAuthCredentialProperties = {
	.username = @"username",
	.password = @"password"
};

@implementation DCTBasicAuthCredential

#pragma mark - DCTBasicAuthCredential

- (instancetype)initWithUsername:(NSString *)username password:(NSString *)password {
	self = [self init];
	if (!self) return nil;
	_username = [username copy];
	_password = [password copy];
	return self;
}

- (NSString *)authorizationHeader {
	NSString *username = self.username ?: @"";
	NSString *password = self.password ?: @"";
	NSString *authorisationString = [NSString stringWithFormat:@"%@:%@", username, password];
	NSData *authorisationData = [authorisationString dataUsingEncoding:NSUTF8StringEncoding];
	NSString *authorisationEncodedString = [authorisationData base64EncodedStringWithOptions:(NSDataBase64EncodingOptions)0];
	return [NSString stringWithFormat:@"Basic %@", authorisationEncodedString];
}

#pragma mark - NSSecureCoding

+ (BOOL)supportsSecureCoding {
	return YES;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
	self = [self init];
	if (!self) return nil;
	_username = [coder decodeObjectOfClass:[NSString class] forKey:DCTBasicAuthCredentialProperties.username];
	_password = [coder decodeObjectOfClass:[NSString class] forKey:DCTBasicAuthCredentialProperties.password];
	return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
	[coder encodeObject:self.username forKey:DCTBasicAuthCredentialProperties.username];
	[coder encodeObject:self.password forKey:DCTBasicAuthCredentialProperties.password];
}

#pragma mark - NSObject

- (NSString *)description {
	return [NSString stringWithFormat:@"<%@: %p; %@ = %@; %@ = %@>",
			NSStringFromClass([self class]),
			(void *)self,
			DCTBasicAuthCredentialProperties.username, self.username,
			DCTBasicAuthCredentialProperties.password, self.password];
}

@end
