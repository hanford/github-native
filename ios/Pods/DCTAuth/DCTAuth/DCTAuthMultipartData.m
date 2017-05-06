//
//  DCTAuthMultipartData.m
//  DCTAuth
//
//  Created by Daniel Tull on 02/09/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuthMultipartData.h"

@interface NSMutableData (DCTAuth)
- (void)dctauth_appendData:(NSData *)data;
@end

@implementation DCTAuthMultipartData

- (NSData *)dataWithBoundary:(NSString *)boundary {
	NSMutableData *body = [NSMutableData new];
	[body dctauth_appendData:[[NSString stringWithFormat:@"--%@\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding]];

	if (self.filename) {
		[body dctauth_appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"%@\"; filename=\"%@\"\r\n", self.name, self.filename] dataUsingEncoding:NSUTF8StringEncoding]];
	} else {
		[body dctauth_appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"%@\"\r\n", self.name] dataUsingEncoding:NSUTF8StringEncoding]];
	}

	[body dctauth_appendData:[[NSString stringWithFormat:@"Content-Type: %@\r\n", self.type] dataUsingEncoding:NSUTF8StringEncoding]];
	[body dctauth_appendData:[@"\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
	[body dctauth_appendData:self.data];
	[body dctauth_appendData:[@"\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
	return [body copy];
}

@end

@implementation NSMutableData (DCTAuth)
- (void)dctauth_appendData:(NSData *)data {
	if (data) {
		[self appendData:data];
	}
}
@end
