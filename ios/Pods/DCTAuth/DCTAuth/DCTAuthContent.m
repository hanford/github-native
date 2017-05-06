//
//  DCTAuthContent.m
//  DCTAuth
//
//  Created by Daniel Tull on 23.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

#import "DCTAuthContent.h"


@implementation DCTAuthContentItem

- (instancetype)initWithName:(NSString *)name value:(id)value {
	self = [self init];
	if (!self) return nil;
	_name = [name copy];
	_value = value;
	return self;
}

- (NSString *)description {

	return [NSString stringWithFormat:@"<%@: %p; name = %@; value = %@>",
			NSStringFromClass([self class]),
			(void *)self,
			self.name,
			self.value];
}

@end

@implementation DCTAuthContent

- (instancetype)initWithRequest:(NSURLRequest *)request {
	self = [super init];
	if (!self) return nil;

	_HTTPBody = request.HTTPBody;
	_contentType = request.allHTTPHeaderFields[@"Content-Type"];

	if (_contentType) {
		NSArray *contentTypeStrings = [DCTAuthContent contentTypeStrings];
		NSString *contentTypeString = [_contentType stringByReplacingOccurrencesOfString:@" " withString:@""];
		NSArray *components = [contentTypeString componentsSeparatedByString:@";"];
		for (NSString *contentType in components) {

			if ([contentType hasPrefix:@"charset="]) {
				NSString *charset = [contentType stringByReplacingCharactersInRange:NSMakeRange(0, 8) withString:@""];
				if (charset.length == 0) {

				} else {
					CFStringEncoding encoding = CFStringConvertIANACharSetNameToEncoding((__bridge CFStringRef)charset);
					_encoding = CFStringConvertEncodingToNSStringEncoding(encoding);
				}
			} else {
				if ([contentTypeStrings containsObject:contentType]) {
					_type = [contentTypeStrings indexOfObject:contentType];
				}
			}
		}

		switch (_type) {
			case DCTAuthContentTypeForm: {

				NSURLComponents *components = [NSURLComponents componentsWithString:@"htttp://host.com"];
				components.percentEncodedQuery = [[NSString alloc] initWithData:_HTTPBody encoding:_encoding];

				NSMutableArray *items = [NSMutableArray new];
				for (NSURLQueryItem *item in components.queryItems) {
					NSString *name = [item.name stringByReplacingOccurrencesOfString:@"+" withString:@" "];
					NSString *value = [item.value stringByReplacingOccurrencesOfString:@"+" withString:@" "];
					DCTAuthContentItem *encodedItem = [[DCTAuthContentItem alloc] initWithName:name value:value];
					[items addObject:encodedItem];
				}
				_items = [items copy];

				break;
			}

			case DCTAuthContentTypeJSON: {

				NSDictionary *JSON = [NSJSONSerialization JSONObjectWithData:_HTTPBody options:(NSJSONReadingOptions)0 error:NULL];
				NSMutableArray *items = [NSMutableArray new];
				[JSON enumerateKeysAndObjectsUsingBlock:^(id key, id value, BOOL *stop) {
					DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:key value:value];
					[items addObject:item];
				}];
				_items = [items copy];
				break;
			}
		}

	}

	return self;
}

- (instancetype)initWithEncoding:(NSStringEncoding)encoding
							type:(DCTAuthContentType)type
						   items:(NSArray *)items {
	self = [self init];
	if (!self) return nil;
	_type = type;
	_items = [items copy];
	_encoding = encoding;

	_contentType = [[DCTAuthContent contentTypeStrings] objectAtIndex:type];

	switch (type) {
		case DCTAuthContentTypeForm: {

			NSMutableCharacterSet *allowed = [NSMutableCharacterSet new];
			[allowed formUnionWithCharacterSet:[NSCharacterSet URLQueryAllowedCharacterSet]];
			[allowed removeCharactersInString:@"+"]; // We want to encode + because…
			[allowed addCharactersInString:@" "]; // …spaces will be converted to +

			NSMutableArray *encodedItems = [NSMutableArray new];
			for (DCTAuthContentItem *item in items) {

				NSString *name = [item.name stringByAddingPercentEncodingWithAllowedCharacters:allowed];
				NSString *value = [item.value stringByAddingPercentEncodingWithAllowedCharacters:allowed];

				name = [name stringByReplacingOccurrencesOfString:@" " withString:@"+"];
				value = [value stringByReplacingOccurrencesOfString:@" " withString:@"+"];

				NSString *encodedItem = [NSString stringWithFormat:@"%@=%@", name, value];
				[encodedItems addObject:encodedItem];
			}

			NSString *encodedString = [encodedItems componentsJoinedByString:@"&"];
			_HTTPBody = [encodedString dataUsingEncoding:encoding];

			CFStringEncoding cfEncoding = CFStringConvertNSStringEncodingToEncoding(encoding);
			const NSString *charset = (const NSString *)CFStringConvertEncodingToIANACharSetName(cfEncoding);
			_contentType = [NSString stringWithFormat:@"%@; charset=%@", _contentType, charset];

			break;
		}

		case DCTAuthContentTypeJSON: {

			NSMutableDictionary *JSON = [NSMutableDictionary new];
			for (DCTAuthContentItem *item in items) {
				if (item.name && item.value) {
					JSON[item.name] = item.value;
				}
			}

			_HTTPBody = [NSJSONSerialization dataWithJSONObject:JSON options:(NSJSONWritingOptions)0 error:NULL];

			break;
		}
	}

	return self;
}

- (NSString *)contentLength {
	return [@(self.HTTPBody.length) stringValue];
}

+ (NSArray *)contentTypeStrings {
	static NSArray *contentTypeStrings;
	static dispatch_once_t contentTypeStringsToken;
	dispatch_once(&contentTypeStringsToken, ^{
		contentTypeStrings = @[
			@"application/x-www-form-urlencoded",
			@"application/json"
		];
	});
	return contentTypeStrings;
}

- (NSString *)description {

	NSMutableString *itemStrings = [[NSMutableString alloc] initWithString:@"Items:\n"];
	for (DCTAuthContentItem *item in self.items) {
		[itemStrings appendFormat:@"    %@\n", item];
	}

	return [NSString stringWithFormat:@"<%@: %p>\n%@",
			NSStringFromClass([self class]),
			(void *)self,
			itemStrings];
}

@end
