//
//  DCTAuthRequest.m
//  DCTAuth
//
//  Created by Daniel Tull on 24.08.2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTAuthRequest.h"
#import "DCTAuthAccountSubclass.h"
#import "DCTAuthPlatform.h"
#import "DCTAuthMultipartData.h"
#import "NSString+DCTAuth.h"
#import "DCTAuthURLRequestPerformer.h"
#import "DCTAuthContent.h"
#import "DCTAuthRequestMethod.h"

static const struct DCTAuthRequestProperties {
	__unsafe_unretained NSString *requestMethod;
	__unsafe_unretained NSString *URL;
	__unsafe_unretained NSString *items;
	__unsafe_unretained NSString *multipartDatas;
	__unsafe_unretained NSString *account;
} DCTAuthRequestProperties;

static const struct DCTAuthRequestProperties DCTAuthRequestProperties = {
	.requestMethod = @"requestMethod",
	.URL = @"URL",
	.items = @"items",
	.multipartDatas = @"multipartDatas",
	.account = @"account"
};

static NSString *const DCTAuthConnectionIncreasedNotification = @"DCTConnectionQueueActiveConnectionCountIncreasedNotification";
static NSString *const DCTAuthConnectionDecreasedNotification = @"DCTConnectionQueueActiveConnectionCountDecreasedNotification";

static NSString *const DCTAuthRequestContentLengthKey = @"Content-Length";

static NSString *const DCTAuthRequestContentTypeKey = @"Content-Type";
static NSString *const DCTAuthRequestContentTypeString[] = {
	@"application/x-www-form-urlencoded; charset=UTF-8",
	@"application/json; charset=UTF-8",
	@"application/x-plist; charset=UTF-8"
};

@interface DCTAuthRequest ()
@property (nonatomic, strong) NSMutableArray *multipartDatas;
@property (nonatomic, readwrite) NSArray *items;
@end

@implementation DCTAuthRequest

#pragma mark - DCTAuthRequest

- (instancetype)initWithRequestMethod:(DCTAuthRequestMethod)requestMethod
								  URL:(NSURL *)URL
								items:(NSArray *)items {
	
	self = [super init];
	if (!self) return nil;
	
	_URL = [URL copy];
	_requestMethod = requestMethod;
	_items = [items copy];
	_multipartDatas = [NSMutableArray new];

	return self;
}

- (void)addMultiPartData:(NSData *)data withName:(NSString *)name type:(NSString *)type {
	[self addMultiPartData:data withName:name type:type filename:nil];
}

- (void)addMultiPartData:(NSData *)data withName:(NSString *)name type:(NSString *)type filename:(NSString *)filename {
	DCTAuthMultipartData *multipartData = [DCTAuthMultipartData new];
	multipartData.data = data;
	multipartData.name = name;
	multipartData.filename = filename;
	multipartData.type = type;
	[self.multipartDatas addObject:multipartData];

	if (self.items) {

		for (NSURLQueryItem *item in self.items) {
			DCTAuthMultipartData *multipartData = [DCTAuthMultipartData new];
			multipartData.data = [item.value dataUsingEncoding:NSUTF8StringEncoding];
			multipartData.name = item.name;
			multipartData.type = @"text/plain";
			[self.multipartDatas addObject:multipartData];
		}

		self.items = nil;
	}
}

/*
 TWRequest *postRequest = [[TWRequest alloc] initWithURL:[NSURL URLWithString:@"https://upload.twitter.com/1/statuses/update_with_media.json"] parameters:nil requestMethod:TWRequestMethodPOST];
 NSData *myData = UIImagePNGRepresentation(img);
 [postRequest addMultiPartData:myData withName:@"media" type:@"image/png"];
 myData = [[NSString stringWithFormat:@"Any status text"] dataUsingEncoding:NSUTF8StringEncoding];
 [postRequest addMultiPartData:myData withName:@"status" type:@"text/plain"];*/

- (NSMutableURLRequest *)_URLRequest {

	NSMutableURLRequest *mutableRequest = [NSMutableURLRequest new];
	[mutableRequest setHTTPMethod:NSStringFromDCTAuthRequestMethod(self.requestMethod)];

	if ([self shouldSetupPOSTRequest])
		[self _setupPOSTRequest:mutableRequest];
	else
		[self _setupGETRequest:mutableRequest];

	[self.HTTPHeaders enumerateKeysAndObjectsUsingBlock:^(id key, id object, BOOL *stop) {
		
		if (![key isKindOfClass:[NSString class]]) key = [key description];
		if (![object isKindOfClass:[NSString class]]) object = [object description];
		
		[mutableRequest setValue:object forHTTPHeaderField:key];
	}];

	return mutableRequest;
}

- (BOOL)shouldSetupPOSTRequest {
	return (self.requestMethod == DCTAuthRequestMethodPOST || self.requestMethod == DCTAuthRequestMethodPUT || self.requestMethod == DCTAuthRequestMethodPATCH);
}

- (void)_setupGETRequest:(NSMutableURLRequest *)request {

	NSURLComponents *URLComponents = [NSURLComponents componentsWithURL:self.URL resolvingAgainstBaseURL:YES];
	NSArray *existingItems = URLComponents.queryItems;
	NSMutableArray *queryItems = [NSMutableArray new];
	[queryItems addObjectsFromArray:existingItems];
	[queryItems addObjectsFromArray:self.items];

	if (queryItems.count > 0) {
		URLComponents.queryItems = queryItems;
	}

	[request setURL:URLComponents.URL];
}

- (void)_setupPOSTRequest:(NSMutableURLRequest *)request {
	[request setURL:self.URL];

	if ([self.multipartDatas count] == 0) {
		request.HTTPBody = self.content.HTTPBody;
		[request setValue:self.content.contentLength forHTTPHeaderField:DCTAuthRequestContentLengthKey];
		[request setValue:self.content.contentType forHTTPHeaderField:DCTAuthRequestContentTypeKey];
		return;
	}

	NSString *boundary = [[NSProcessInfo processInfo] globallyUniqueString];
	NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@", boundary];
	[request setValue:contentType forHTTPHeaderField: @"Content-Type"];

	NSMutableData *body = [NSMutableData new];
	[self.multipartDatas enumerateObjectsUsingBlock:^(DCTAuthMultipartData *multipartData, NSUInteger i, BOOL *stop) {
		NSData *boundaryData = [multipartData dataWithBoundary:boundary];
		if (boundaryData.length > 0) {
			[body appendData:boundaryData];
		}
	}];

	NSData *endData = [[NSString stringWithFormat:@"--%@--\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding];
	if (endData.length > 0) {
		[body appendData:endData];
	}

	[request setHTTPBody:body];
	[request setValue:[NSString stringWithFormat:@"%@", @([body length])] forHTTPHeaderField:@"Content-Length"];
}

- (NSURLRequest *)signedURLRequest {

	if (![self.account conformsToProtocol:@protocol(DCTAuthAccountSubclass)])
		return [[self _URLRequest] copy];

	NSMutableURLRequest *request = [self _URLRequest];
	[self.account signURLRequest:request];
	return [request copy];
}

- (void)performRequestWithHandler:(DCTAuthRequestHandler)originalHandler {

	NSNotificationCenter *defaultCenter = [NSNotificationCenter defaultCenter];
	[defaultCenter postNotificationName:DCTAuthConnectionIncreasedNotification object:self];

	DCTAuthURLRequestPerformer *URLRequestPerformer = [DCTAuthURLRequestPerformer sharedURLRequestPerformer];
	NSURLRequest *URLRequest = [self signedURLRequest];

	id activity = [[NSProcessInfo processInfo] beginActivityWithOptions:NSActivityUserInitiated reason:@"DCTAuth.request"];

	void (^handler)(DCTAuthResponse *response, NSError *error) = ^(DCTAuthResponse *response, NSError *error) {
		dispatch_async(dispatch_get_main_queue(), ^{
			[defaultCenter postNotificationName:DCTAuthConnectionDecreasedNotification object:self];
			if (originalHandler) originalHandler(response, error);
			[[NSProcessInfo processInfo] endActivity:activity];
		});
	};

	[URLRequestPerformer performRequest:URLRequest withHandler:^(DCTAuthResponse *originalResponse, NSError *originalError) {

		if (!originalError || !self.account) {
			handler(originalResponse, originalError);
			return;
		}

		[self.account reauthenticateWithHandler:^(DCTAuthResponse *response, NSError *error) {

			if (error) {
				handler(originalResponse, originalError);
				return;
			}

			[URLRequestPerformer performRequest:[self signedURLRequest] withHandler:handler];
		}];
	}];
}

- (NSString *)description {
	NSURLRequest *request = [self signedURLRequest];
	NSData *body = [request HTTPBody];
	NSString *bodyString = [[NSString alloc] initWithData:body encoding:NSUTF8StringEncoding];
	if (bodyString.length > 0) bodyString = [NSString stringWithFormat:@"\n\n%@", bodyString];
	else bodyString = @"";

	NSString *queryString = @"";
	if (self.requestMethod == DCTAuthRequestMethodGET && self.items.count > 0) {
		NSURL *URL = request.URL;
		if (URL) {
			NSURLComponents *URLComponents = [NSURLComponents componentsWithURL:URL resolvingAgainstBaseURL:YES];
			queryString = [NSString stringWithFormat:@"\nQuery: ?%@", URLComponents.query];
		}
	}

	return [NSString stringWithFormat:@"<%@: %p>\n%@ %@ \nHost: %@%@%@%@\n\n",
			NSStringFromClass([self class]),
			(void *)self,
			NSStringFromDCTAuthRequestMethod(self.requestMethod),
			[self.URL path],
			[self.URL host],
			queryString,
			[self headerDescription:request],
			bodyString];
}

- (NSString *)headerDescription:(NSURLRequest *)request {
	NSDictionary *headers = [request allHTTPHeaderFields];
	
	NSMutableString *string = [NSMutableString new];
	[headers enumerateKeysAndObjectsUsingBlock:^(id key, id value, BOOL *stop) {
		[string appendFormat:@"\n%@: %@", key, value];
	}];
	return [string copy];
}

#pragma mark - NSCoding

- (instancetype)initWithCoder:(NSCoder *)coder {
	self = [self init];
	if (!self) return nil;
	_requestMethod = [coder decodeIntegerForKey:DCTAuthRequestProperties.requestMethod];
	_URL = [coder decodeObjectForKey:DCTAuthRequestProperties.URL];
	_items = [coder decodeObjectOfClass:[NSArray class] forKey:DCTAuthRequestProperties.items];
	_multipartDatas = [coder decodeObjectForKey:DCTAuthRequestProperties.multipartDatas];
	_account = [coder decodeObjectForKey:DCTAuthRequestProperties.account];
	return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
	[coder encodeInteger:self.requestMethod forKey:DCTAuthRequestProperties.requestMethod];
	[coder encodeObject:self.URL forKey:DCTAuthRequestProperties.URL];
	[coder encodeObject:self.items forKey:DCTAuthRequestProperties.items];
	[coder encodeObject:self.multipartDatas forKey:DCTAuthRequestProperties.multipartDatas];
	[coder encodeObject:self.account forKey:DCTAuthRequestProperties.account];
}

@end
