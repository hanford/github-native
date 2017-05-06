//
//  DCTAuthURLRequestPerformer.m
//  DCTAuth
//
//  Created by Daniel Tull on 20.01.2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTAuthURLRequestPerformer.h"

@implementation DCTAuthURLRequestPerformer

+ (DCTAuthURLRequestPerformer *)sharedURLRequestPerformer {
	static DCTAuthURLRequestPerformer *URLRequestPerformer;
	static dispatch_once_t onceToken;
	dispatch_once(&onceToken, ^{
		URLRequestPerformer = [self new];
	});
	return URLRequestPerformer;
}

- (void)performRequest:(NSURLRequest *)URLRequest withHandler:(DCTAuthRequestHandler)handler {

	if (self.URLRequestPerformer != NULL) {
		self.URLRequestPerformer(URLRequest, handler);
		return;
	}

	[NSURLConnection sendAsynchronousRequest:URLRequest queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *URLResponse, NSData *data, NSError *error) {
		DCTAuthResponse *response = [[DCTAuthResponse alloc] initWithData:data URLResponse:(NSHTTPURLResponse *)URLResponse];
		handler(response, error);
	}];
}

@end
