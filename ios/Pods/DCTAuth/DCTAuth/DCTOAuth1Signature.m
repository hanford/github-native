//
//  DCTOAuth1Signature.m
//  DCTAuth
//
//  Created by Daniel Tull on 04.07.2010.
//  Copyright 2010 Daniel Tull. All rights reserved.
//

#import "DCTOAuth1Signature.h"
#import "DCTOAuth1Keys.h"
#import <CommonCrypto/CommonHMAC.h>
#import "NSString+DCTAuth.h"
#import "DCTAuthContent.h"

static NSString * const DTOAuthSignatureTypeString[] = {
	@"HMAC-SHA1",
	@"PLAINTEXT"
};

@interface DCTOAuth1Signature ()
@property (nonatomic, readonly) NSURLRequest *request;
@property (nonatomic, readonly) NSString *consumerSecret;
@property (nonatomic, readonly) NSString *secretToken;
@property (nonatomic, readonly) NSMutableArray *items;
@property (nonatomic, readonly) DCTOAuth1SignatureType type;
@end

@implementation DCTOAuth1Signature

- (instancetype)initWithRequest:(NSURLRequest *)request
				 consumerSecret:(NSString *)consumerSecret
					secretToken:(NSString *)secretToken
						  items:(NSArray *)items
						   type:(DCTOAuth1SignatureType)type {

	NSTimeInterval timeInterval = [[NSDate date] timeIntervalSince1970];
	NSString *timestamp = [@((NSInteger)timeInterval) stringValue];
	NSString *nonce = [[NSProcessInfo processInfo] globallyUniqueString];

	return [self initWithRequest:request
				  consumerSecret:consumerSecret
					 secretToken:secretToken
						   items:items
							type:type
					   timestamp:timestamp
						   nonce:nonce];
}

- (instancetype)initWithRequest:(NSURLRequest *)request
				 consumerSecret:(NSString *)consumerSecret
					secretToken:(NSString *)secretToken
						  items:(NSArray *)items
						   type:(DCTOAuth1SignatureType)type
					  timestamp:(NSString *)timestamp
						  nonce:(NSString *)nonce {

	self = [self init];
	if (!self) return nil;

	_request = [request copy];
	_consumerSecret = [consumerSecret copy];
	_secretToken = secretToken ? [secretToken copy] : @"";
	_items = [NSMutableArray new];
	_type = type;

	NSString *version = @"1.0";

	NSURLQueryItem *versionItem = [NSURLQueryItem queryItemWithName:DCTOAuth1Keys.version value:version];
	[_items addObject:versionItem];

	NSURLQueryItem *nonceItem = [NSURLQueryItem queryItemWithName:DCTOAuth1Keys.nonce value:nonce];
	[_items addObject:nonceItem];

	NSURLQueryItem *timestampItem = [NSURLQueryItem queryItemWithName:DCTOAuth1Keys.timestamp value:timestamp];
	[_items addObject:timestampItem];

	NSURLQueryItem *signatureMethodItem = [NSURLQueryItem queryItemWithName:DCTOAuth1Keys.signatureMethod value:DTOAuthSignatureTypeString[type]];
	[_items addObject:signatureMethodItem];

	[_items addObjectsFromArray:items];
	
	return self;
}

- (NSString *)signatureBaseString {

	NSMutableArray *items = [self.items mutableCopy];

	NSURL *URL = self.request.URL;
	if (!URL) return nil;

	NSURLComponents *URLComponents = [NSURLComponents componentsWithURL:URL resolvingAgainstBaseURL:YES];

	NSArray *queryItems = URLComponents.queryItems;
	if (queryItems.count > 0) {
		[items addObjectsFromArray:queryItems];
	}

	DCTAuthContent *content = [[DCTAuthContent alloc] initWithRequest:self.request];
	[items addObjectsFromArray:content.items];

	NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:@"name" ascending:YES];
	NSArray *sortedItems = [items sortedArrayUsingDescriptors:@[sortDescriptor]];

	NSMutableArray *parameterStrings = [NSMutableArray new];
	for (NSURLQueryItem *item in sortedItems) {
		NSString *key = item.name;
		NSString *value = [item.value dctAuth_URLEncodedString];
		NSString *keyValueString = [NSString stringWithFormat:@"%@=%@", key, value];
		[parameterStrings addObject:keyValueString];
	}
	
	NSString *parameterString = [parameterStrings componentsJoinedByString:@"&"];

	URLComponents.query = nil;
	URLComponents.fragment = nil;

	NSMutableArray *baseArray = [NSMutableArray new];

	NSString *HTTPMethod = self.request.HTTPMethod;
	if (!HTTPMethod) {
		return nil;
	}

	NSString *baseURLString = URLComponents.URL.absoluteString;
	if (!baseURLString) {
		return nil;
	}

	[baseArray addObject:HTTPMethod];
	[baseArray addObject:[baseURLString dctAuth_URLEncodedString]];
	[baseArray addObject:[parameterString dctAuth_URLEncodedString]];

	return [baseArray componentsJoinedByString:@"&"];
}

- (NSString *)signatureString {
	
	NSString *baseString = [self signatureBaseString];
	NSString *secretString = [NSString stringWithFormat:@"%@&%@", self.consumerSecret, self.secretToken];
	
	NSData *baseData = [baseString dataUsingEncoding:NSUTF8StringEncoding];
	NSData *secretData = [secretString dataUsingEncoding:NSUTF8StringEncoding];
	
	unsigned char result[20];
	CCHmac(kCCHmacAlgSHA1, secretData.bytes, secretData.length, baseData.bytes, baseData.length, result);
	
	NSData *theData = [NSData dataWithBytes:result length:20];
	return [theData base64EncodedStringWithOptions:(NSDataBase64EncodingOptions)0];
}

- (NSString *)authorizationHeader {
	
	NSMutableArray *parameters = [NSMutableArray new];
	for (NSURLQueryItem *item in self.items) {
        NSString *encodedKey = [item.name dctAuth_URLEncodedString];
        NSString *encodedValue = [item.value dctAuth_URLEncodedString];
		NSString *string = [NSString stringWithFormat:@"%@=\"%@\"", encodedKey, encodedValue];
		[parameters addObject:string];
	}

	switch (self.type) {

		case DCTOAuth1SignatureTypeHMAC_SHA1: {
			NSString *signature = [NSString stringWithFormat:@"%@=\"%@\"", DCTOAuth1Keys.signature, [self.signatureString dctAuth_URLEncodedString]];
			[parameters addObject:signature];
			break;
		}

		case DCTOAuth1SignatureTypePlaintext: {
			NSString *secretToken = self.secretToken ?: @"";
			NSString *signature = [NSString stringWithFormat:@"%@=\"%@&%@\"", DCTOAuth1Keys.signature, self.consumerSecret, secretToken];
			[parameters addObject:signature];
			break;
		}
	}

	[parameters insertObject:@"realm=\"\"" atIndex:0];

	NSString *parameterString = [parameters componentsJoinedByString:@","];	
	return [NSString stringWithFormat:@"%@ %@", DCTOAuth1Keys.OAuth, parameterString];
}

- (NSArray *)authorizationItems {
	NSMutableArray *items = [self.items mutableCopy];

	NSURLQueryItem *signatureItem = [NSURLQueryItem queryItemWithName:DCTOAuth1Keys.signature value:self.signatureString];
	[items addObject:signatureItem];

	return [items copy];
}

@end
