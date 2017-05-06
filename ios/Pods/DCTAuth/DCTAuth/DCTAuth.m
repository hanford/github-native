//
//  DCTAuth.m
//  DCTAuth
//
//  Created by Daniel Tull on 27/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuth.h"
#import "DCTAuthURLOpener.h"
#import "DCTAuthURLRequestPerformer.h"

static NSString *const DCTAuthBundleName = @"DCTAuth.bundle";

@implementation DCTAuth

+ (BOOL)handleURL:(NSURL *)URL {
	return [[DCTAuthURLOpener sharedURLOpener] handleURL:URL];
}

+ (id)openURL:(NSURL *)URL withCallbackURL:(NSURL *)callbackPrefixURL handler:(void (^)(DCTAuthResponse *response))handler {
	return [[DCTAuthURLOpener sharedURLOpener] openURL:URL withCallbackURL:callbackPrefixURL handler:handler];
}

+ (void)cancelOpenURL:(id)object {
	[[DCTAuthURLOpener sharedURLOpener] close:object];
}

+ (void)setURLRequestPerformer:(void(^)(NSURLRequest *request, DCTAuthRequestHandler handler))requestPerformer {
	[[DCTAuthURLRequestPerformer sharedURLRequestPerformer] setURLRequestPerformer:requestPerformer];
}

+ (NSString *)localizedStringForDomain:(NSString *)domain key:(NSString *)key {
	
	NSString *fullKey = [NSString stringWithFormat:@"DCTAuth.%@.%@", domain, key];	
	
	NSString *uniqueString = [[NSProcessInfo processInfo] globallyUniqueString];
	NSString *value = [[NSBundle mainBundle] localizedStringForKey:fullKey value:uniqueString table:nil];
	if (![value isEqualToString:uniqueString]) return value;
	
	NSBundle *bundle = [self _bundle];
	value = [bundle localizedStringForKey:fullKey value:uniqueString table:nil];
	if (![value isEqualToString:uniqueString]) return value;
	
	return nil;
}

+ (NSBundle *)_bundle {
	static NSBundle *bundle;
	static dispatch_once_t bundleToken;
	dispatch_once(&bundleToken, ^{
		NSDirectoryEnumerator *enumerator = [[NSFileManager new] enumeratorAtURL:[[NSBundle mainBundle] bundleURL]
													  includingPropertiesForKeys:nil
																		 options:NSDirectoryEnumerationSkipsHiddenFiles
																	errorHandler:NULL];
		
		for (NSURL *URL in enumerator)
			if ([[URL lastPathComponent] isEqualToString:DCTAuthBundleName])
				bundle = [NSBundle bundleWithURL:URL];
	});
	
	return bundle;
}

@end
