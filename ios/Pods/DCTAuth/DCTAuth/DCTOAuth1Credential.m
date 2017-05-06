//
//  DCTOAuth1Credential.m
//  DCTAuth
//
//  Created by Daniel Tull on 22/02/2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTOAuth1Credential.h"

static const struct DCTOAuth1CredentialProperties {
	__unsafe_unretained NSString *consumerKey;
	__unsafe_unretained NSString *consumerSecret;
	__unsafe_unretained NSString *oauthToken;
	__unsafe_unretained NSString *oauthTokenSecret;
} DCTOAuth1CredentialProperties;

static const struct DCTOAuth1CredentialProperties DCTOAuth1CredentialProperties = {
	.consumerKey = @"consumerKey",
	.consumerSecret = @"consumerSecret",
	.oauthToken = @"oauthToken",
	.oauthTokenSecret = @"oauthTokenSecret"
};

@implementation DCTOAuth1Credential

#pragma mark - DCTOAuth1Credential

- (instancetype)initWithConsumerKey:(NSString *)consumerKey
					 consumerSecret:(NSString *)consumerSecret
						 oauthToken:(NSString *)oauthToken
				   oauthTokenSecret:(NSString *)oauthTokenSecret {

	if (consumerKey.length == 0) return nil;
	if (consumerSecret.length == 0) return nil;
	if (oauthToken.length == 0) return nil;
	if (oauthTokenSecret.length == 0) return nil;

	self = [self init];
	if (!self) return nil;
	_consumerKey = [consumerKey copy];
	_consumerSecret = [consumerSecret copy];
	_oauthToken = [oauthToken copy];
	_oauthTokenSecret = [oauthTokenSecret copy];
	return self;
}

#pragma mark - NSSecureCoding

+ (BOOL)supportsSecureCoding {
	return YES;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
	self = [self init];
	if (!self) return nil;
	_consumerKey = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth1CredentialProperties.consumerKey];
	_consumerSecret = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth1CredentialProperties.consumerSecret];
	_oauthToken = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth1CredentialProperties.oauthToken];
	_oauthTokenSecret = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth1CredentialProperties.oauthTokenSecret];
	return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
	[coder encodeObject:self.consumerKey forKey:DCTOAuth1CredentialProperties.consumerKey];
	[coder encodeObject:self.consumerSecret forKey:DCTOAuth1CredentialProperties.consumerSecret];
	[coder encodeObject:self.oauthToken forKey:DCTOAuth1CredentialProperties.oauthToken];
	[coder encodeObject:self.oauthTokenSecret forKey:DCTOAuth1CredentialProperties.oauthTokenSecret];
}

#pragma mark - NSObject

- (NSString *)description {
	return [NSString stringWithFormat:@"<%@: %p; %@ = %@; %@ = %@; %@ = %@; %@ = %@>",
			NSStringFromClass([self class]),
			(void *)self,
			DCTOAuth1CredentialProperties.consumerKey, self.consumerKey,
			DCTOAuth1CredentialProperties.consumerSecret, self.consumerSecret,
			DCTOAuth1CredentialProperties.oauthToken, self.oauthToken,
			DCTOAuth1CredentialProperties.oauthTokenSecret, self.oauthTokenSecret];
}

@end
