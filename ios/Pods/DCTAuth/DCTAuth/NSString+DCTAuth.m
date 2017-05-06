//
//  NSString+DCTAuth.m
//  DCTOAuth
//
//  Created by Daniel Tull on 25/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "NSString+DCTAuth.h"

@implementation NSString (DCTAuth)

- (NSString *)dctAuth_URLEncodedString {
	
	return (__bridge_transfer NSString *) CFURLCreateStringByAddingPercentEscapes(NULL,
																				  (__bridge CFStringRef)self,
																				  NULL,
																				  (CFStringRef)@"!*'\"();:@&=+$,/?%#[] ",
																				  kCFStringEncodingUTF8);
}

- (NSDictionary *)dctAuth_parameterDictionary {
	__block BOOL broken = NO;
	NSArray *components = [self componentsSeparatedByString:@"&"];
	NSMutableDictionary *dictionary = [NSMutableDictionary new];
	[components enumerateObjectsUsingBlock:^(NSString *keyValueString, NSUInteger idx, BOOL *stop) {
		NSArray *keyValueArray = [keyValueString componentsSeparatedByString:@"="];
		if ([keyValueArray count] != 2) {
			*stop = broken = YES;
			return;
		}
		[dictionary setObject:[keyValueArray objectAtIndex:1] forKey:[keyValueArray objectAtIndex:0]];
	}];
	if (broken) return nil;
	return [dictionary copy];
}

@end
