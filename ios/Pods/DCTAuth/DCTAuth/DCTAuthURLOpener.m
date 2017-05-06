//
//  DCTAuthURLOpener.m
//  DCTAuth
//
//  Created by Daniel Tull on 31/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuthURLOpener.h"
#import "DCTAuthURLOpenerOperation.h"

@interface DCTAuthURLOpener ()
@property (nonatomic) NSOperationQueue *queue;
@end

@implementation DCTAuthURLOpener

+ (DCTAuthURLOpener *)sharedURLOpener {
	static DCTAuthURLOpener *opener;
	static dispatch_once_t onceToken;
	dispatch_once(&onceToken, ^{
		opener = [DCTAuthURLOpener new];
	});
	return opener;
}

- (instancetype)init {
    self = [super init];
    if (!self) return nil;
	_queue = [NSOperationQueue new];
	_queue.maxConcurrentOperationCount = 1;
    return self;
}

- (BOOL)handleURL:(NSURL *)URL {

	__block BOOL handled = NO;

	[self.queue.operations enumerateObjectsUsingBlock:^(DCTAuthURLOpenerOperation *operation, NSUInteger i, BOOL *stop) {
		*stop = handled = [operation handleURL:URL];
	}];

	return handled;
}

- (id)openURL:(NSURL *)URL withCallbackURL:(NSURL *)callbackURL handler:(void (^)(DCTAuthResponse *response))handler {


	DCTAuthURLOpenerOperation *operation = [[DCTAuthURLOpenerOperation alloc] initWithURL:URL
																				callbackURL:callbackURL
																					handler:handler];
	[self.queue addOperation:operation];
	return operation;
}

- (void)close:(id)object {
	NSAssert([object isKindOfClass:[DCTAuthURLOpenerOperation class]], @"Object should be the object returned from openURL:withCallbackURL:handler:");
	DCTAuthURLOpenerOperation *operation = object;
	[operation cancel];
}

@end
