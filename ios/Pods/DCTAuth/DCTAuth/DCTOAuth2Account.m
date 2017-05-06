//
//  DCTAuth2Account.m
//  DCTAuth
//
//  Created by Daniel Tull on 26/08/2012.
//  Copyright (c) 2012 Daniel Tull. All rights reserved.
//

#import "DCTOAuth2Account.h"
#import "DCTOAuth2.h"
#import "DCTOAuth2Keys.h"
#import "DCTOAuth2Credential.h"
#import "DCTAuthAccount+Private.h"
#import "DCTAuth.h"
#import "DCTAuthRequest.h"
#import "NSString+DCTAuth.h"
#import "DCTBasicAuthCredential.h"

static const struct DCTOAuth2AccountProperties {
	__unsafe_unretained NSString *authorizeURL;
	__unsafe_unretained NSString *accessTokenURL;
	__unsafe_unretained NSString *username;
	__unsafe_unretained NSString *scopes;
} DCTOAuth2AccountProperties;

static const struct DCTOAuth2AccountProperties DCTOAuth2AccountProperties = {
	.authorizeURL = @"authorizeURL",
	.accessTokenURL = @"accessTokenURL",
	.username = @"username",
	.scopes = @"scopes"
};

@interface DCTOAuth2Account ()
@property (nonatomic, strong) id openURLObject;
@end

@implementation DCTOAuth2Account
@dynamic credential;

#pragma mark - DCTOAuth2Account

- (instancetype)initWithType:(NSString *)type
				authorizeURL:(NSURL *)authorizeURL
					username:(NSString *)username
					password:(NSString *)password
					  scopes:(NSArray *)scopes {

	return [self initWithType:type
				 authorizeURL:authorizeURL
					 clientID:nil
				 clientSecret:nil
					 username:username
					 password:password
					   scopes:scopes];
}

- (instancetype)initWithType:(NSString *)type
				authorizeURL:(NSURL *)authorizeURL
			  accessTokenURL:(NSURL *)accessTokenURL
					clientID:(NSString *)clientID
				clientSecret:(NSString *)clientSecret
					  scopes:(NSArray *)scopes {
	self = [self initWithType:type];
	if (!self) return nil;
	_authorizeURL = [authorizeURL copy];
	_accessTokenURL = [accessTokenURL copy];
	_clientID = [clientID copy];
	_clientSecret = [clientSecret copy];
	_scopes = [scopes copy];
	return self;
}

- (instancetype)initWithType:(NSString *)type
				authorizeURL:(NSURL *)authorizeURL
					clientID:(NSString *)clientID
				clientSecret:(NSString *)clientSecret
					username:(NSString *)username
					password:(NSString *)password
					  scopes:(NSArray *)scopes {
	self = [self initWithType:type];
	if (!self) return nil;
	_clientID = [clientID copy];
	_clientSecret = [clientSecret copy];
	_authorizeURL = [authorizeURL copy];
	_username = [username copy];
	_password = [password copy];
	_scopes = [scopes copy];
	return self;
}

- (NSString *)scopeString {

	if (self.scopes.count > 0) {
		return [self.scopes componentsJoinedByString:@","];
	}

	return nil;
}

- (void)passwordAuthorizeWithClientID:(NSString *)clientID
						 clientSecret:(NSString *)clientSecret
							 username:(NSString *)username
							 password:(NSString *)password
							  handler:(void (^)(DCTAuthResponse *response, NSError *error))handler {

	NSString *scope = self.scopeString;

	NSMutableArray *items = [NSMutableArray new];

	DCTAuthContentItem *grantTypeItem = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.grantType value:DCTOAuth2Keys.password];
	[items addObject:grantTypeItem];

	if (username) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.username value:username];
		[items addObject:item];
	}

	if (password) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.password value:password];
		[items addObject:item];
	}

	if (clientID) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.clientID value:clientID];
		[items addObject:item];
	}

	if (clientSecret) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.clientSecret value:clientSecret];
		[items addObject:item];
	}

	if (scope) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.scope value:scope];
		[items addObject:item];
	}

	NSArray *authorizeExtras = [self itemsForRequestType:DCTOAuth2RequestType.authorize];
	NSArray *accessTokenExtras = [self itemsForRequestType:DCTOAuth2RequestType.accessToken];
	[items addObjectsFromArray:authorizeExtras];
	[items addObjectsFromArray:accessTokenExtras];

	DCTAuthRequest *request = [[DCTAuthRequest alloc] initWithRequestMethod:DCTAuthRequestMethodPOST URL:self.authorizeURL items:nil];
	request.content = [[DCTAuthContent alloc] initWithEncoding:NSUTF8StringEncoding type:DCTAuthContentTypeForm items:items];

	DCTBasicAuthCredential *basicCredential = [[DCTBasicAuthCredential alloc] initWithUsername:clientID password:clientSecret];
	NSString *authorizationHeader = basicCredential.authorizationHeader;
	if (authorizationHeader) {
		request.HTTPHeaders = @{ @"Authorization" : authorizationHeader };
	}

	[request performRequestWithHandler:handler];
}

- (void)authorizeWithClientID:(NSString *)clientID
						state:(NSString *)state
					  handler:(void (^)(DCTAuthResponse *response))handler {

	NSString *responseType = self.accessTokenURL ? DCTOAuth2Keys.code : DCTOAuth2Keys.token;
	NSString *scope = self.scopeString;
	NSString *callback = self.callbackURL.absoluteString;

	NSMutableArray *items = [NSMutableArray new];

	NSURLQueryItem *responseTypeItem = [NSURLQueryItem queryItemWithName:DCTOAuth2Keys.responseType value:responseType];
	[items addObject:responseTypeItem];

	if (clientID) {
		NSURLQueryItem *item = [NSURLQueryItem queryItemWithName:DCTOAuth2Keys.clientID value:clientID];
		[items addObject:item];
	}

	if (scope) {
		NSURLQueryItem *item = [NSURLQueryItem queryItemWithName:DCTOAuth2Keys.scope value:scope];
		[items addObject:item];
	}

	if (state) {
		NSURLQueryItem *item = [NSURLQueryItem queryItemWithName:DCTOAuth2Keys.state value:state];
		[items addObject:item];
	}

	if (self.shouldSendCallbackURL && callback) {
		NSURLQueryItem *item = [NSURLQueryItem queryItemWithName:DCTOAuth2Keys.redirectURI value:callback];
		[items addObject:item];
	}

	NSArray *extras = [self itemsForRequestType:DCTOAuth2RequestType.authorize];
	[items addObjectsFromArray:extras];

	DCTAuthRequest *request = [[DCTAuthRequest alloc] initWithRequestMethod:DCTAuthRequestMethodGET
																		URL:self.authorizeURL
																	  items:items];

	self.openURLObject = [DCTAuth openURL:[[request signedURLRequest] URL]
						  withCallbackURL:self.callbackURL
								  handler:handler];
}

- (void)fetchAccessTokenWithClientID:(NSString *)clientID
						clientSecret:(NSString *)clientSecret
								code:(NSString *)code
							 handler:(void (^)(DCTAuthResponse *response, NSError *error))handler {

	NSString *callback = self.callbackURL.absoluteString;

	NSMutableArray *items = [NSMutableArray new];

	DCTAuthContentItem *grantTypeItem = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.grantType value:DCTOAuth2Keys.authorizationCode];
	[items addObject:grantTypeItem];

	if (code) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.code value:code];
		[items addObject:item];
	}

	if (clientID) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.clientID value:clientID];
		[items addObject:item];
	}

	if (clientSecret) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.clientSecret value:clientSecret];
		[items addObject:item];
	}

	if (self.shouldSendCallbackURL && callback) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.redirectURI value:callback];
		[items addObject:item];
	}

	NSArray *extras = [self itemsForRequestType:DCTOAuth2RequestType.accessToken];
	[items addObjectsFromArray:extras];

	DCTAuthRequest *request = [[DCTAuthRequest alloc] initWithRequestMethod:DCTAuthRequestMethodPOST URL:self.accessTokenURL items:nil];
	request.content = [[DCTAuthContent alloc] initWithEncoding:NSUTF8StringEncoding type:DCTAuthContentTypeForm items:items];

	DCTBasicAuthCredential *basicCredential = [[DCTBasicAuthCredential alloc] initWithUsername:clientID password:clientSecret];
	NSString *authorizationHeader = basicCredential.authorizationHeader;
	if (authorizationHeader) {
		request.HTTPHeaders = @{ @"Authorization" : authorizationHeader };
	}

	[request performRequestWithHandler:handler];
}

- (void)refreshAccessTokenWithRefreshToken:(NSString *)refreshToken
								  clientID:(NSString *)clientID
							  clientSecret:(NSString *)clientSecret
								   handler:(void (^)(DCTAuthResponse *response, NSError *error))handler {

	NSString *scope = self.scopeString;

	NSMutableArray *items = [NSMutableArray new];

	DCTAuthContentItem *grantTypeItem = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.grantType value:DCTOAuth2Keys.refreshToken];
	[items addObject:grantTypeItem];

	if (refreshToken) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.refreshToken value:refreshToken];
		[items addObject:item];
	}

	if (clientID) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.clientID value:clientID];
		[items addObject:item];
	}

	if (clientSecret) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.clientSecret value:clientSecret];
		[items addObject:item];
	}

	if (scope) {
		DCTAuthContentItem *item = [[DCTAuthContentItem alloc] initWithName:DCTOAuth2Keys.scope value:scope];
		[items addObject:item];
	}

	NSArray *extras = [self itemsForRequestType:DCTOAuth2RequestType.refresh];
	[items addObjectsFromArray:extras];

	NSURL *refreshURL = self.accessTokenURL ?: self.authorizeURL;
	DCTAuthRequest *request = [[DCTAuthRequest alloc] initWithRequestMethod:DCTAuthRequestMethodPOST URL:refreshURL items:nil];
	request.content = [[DCTAuthContent alloc] initWithEncoding:NSUTF8StringEncoding type:DCTAuthContentTypeForm items:items];

	DCTBasicAuthCredential *basicCredential = [[DCTBasicAuthCredential alloc] initWithUsername:clientID password:clientSecret];
	NSString *authorizationHeader = basicCredential.authorizationHeader;
	if (authorizationHeader) {
		request.HTTPHeaders = @{ @"Authorization" : authorizationHeader };
	}

	[request performRequestWithHandler:handler];
}

#pragma mark - DCTAuthAccountSubclass

- (void)authenticateWithHandler:(void(^)(NSArray *responses, NSError *error))handler {

	if (!handler) handler = ^(NSArray *responses, NSError *error){};

	NSMutableArray *responses = [NSMutableArray new];

	DCTOAuth2Credential *credential = self.credential;
	NSString *clientID = self.clientID ?: credential.clientID;
	NSString *clientSecret = self.clientSecret ?: credential.clientSecret;
	NSString *password = self.password ?: credential.password;
	NSString *username = self.username;
	NSString *state = [[NSProcessInfo processInfo] globallyUniqueString];

	void (^accessTokenHandler)(DCTAuthResponse *, NSError *) = ^(DCTAuthResponse *response, NSError *error) {

		[responses addObject:response];

		[DCTOAuth2 parseCredentialsFromResponse:response completion:^(NSError *error, NSString *code, NSString *accessToken, NSString *refreshToken, DCTOAuth2CredentialType type) {

			if (!error)
				self.credential = [[DCTOAuth2Credential alloc] initWithClientID:clientID
																   clientSecret:clientSecret
																	   password:password
																	accessToken:accessToken
																   refreshToken:refreshToken
																		   type:type];

			handler([responses copy], error);
		}];
	};

	void (^authorizeHandler)(DCTAuthResponse *) = ^(DCTAuthResponse *response) {

		[DCTOAuth2 parseCredentialsFromResponse:response completion:^(NSError *error, NSString *code, NSString *accessToken, NSString *refreshToken, DCTOAuth2CredentialType type) {

			// If there's no access token URL, skip it.
			// This is the "Implicit Authentication Flow"
			if (!self.accessTokenURL) {
				accessTokenHandler(response, nil);
				return;
			}

			[responses addObject:response];

			if (error) {
				handler([responses copy], error);
				return;
			}

			[self fetchAccessTokenWithClientID:clientID
								  clientSecret:clientSecret
										  code:code
									   handler:accessTokenHandler];
		}];
	};

	if (password.length > 0) {
		[self passwordAuthorizeWithClientID:clientID
							   clientSecret:clientSecret
								   username:username
								   password:password
									handler:accessTokenHandler];
	} else {
		[self authorizeWithClientID:clientID
							  state:state
							handler:authorizeHandler];
	}
}

- (void)reauthenticateWithHandler:(void (^)(DCTAuthResponse *response, NSError *error))handler {

	if (!handler) handler = ^(DCTAuthResponse *response, NSError *error) {};

	DCTOAuth2Credential *credential = self.credential;
	NSString *clientID = self.clientID ?: credential.clientID;
	NSString *clientSecret = self.clientSecret ?: credential.clientSecret;
	NSString *password = self.password ?: credential.password;
	NSString *refreshToken = credential.refreshToken;

	[self refreshAccessTokenWithRefreshToken:refreshToken clientID:clientID clientSecret:clientSecret handler:^(DCTAuthResponse *response, NSError *error) {

		[DCTOAuth2 parseCredentialsFromResponse:response completion:^(NSError *error, NSString *code, NSString *accessToken, NSString *refreshToken, DCTOAuth2CredentialType type) {

			if (!error)
				self.credential = [[DCTOAuth2Credential alloc] initWithClientID:clientID
																   clientSecret:clientSecret
																	   password:password
																	accessToken:accessToken
																   refreshToken:refreshToken
																		   type:type];

			handler(response, error);
		}];
	}];
}

- (void)cancelAuthentication {
	[DCTAuth cancelOpenURL:self.openURLObject];
}

- (void)signURLRequest:(NSMutableURLRequest *)request {

	NSURL *URL = request.URL;
	if (!URL) return;

	NSURLComponents *URLComponents = [NSURLComponents componentsWithURL:URL resolvingAgainstBaseURL:YES];
	NSArray *existingItems = URLComponents.queryItems;
	NSMutableArray *items = [NSMutableArray new];
	[items addObjectsFromArray:existingItems];

	// Instagram requires the access_token in the parameters list, and doesn't return a token_type
	// Foursquare requires this parameter to be called oauth_token and doesn't return a token_type
	// Soundcloud requires this parameter to be called oauth_token and doesn't return a token_type
	// LinkedIn requires the Bearer header, and doesn't return an token_type in the return :(
	//
	// Because of these differences if the server returns "bearer" for "token_type" only the bearer
	// is set otherwise, every variation is set to give the best chance of working.
	//
	DCTOAuth2Credential *credential = self.credential;
	NSString *authorizationHeader = credential.authorizationHeader;
	if (authorizationHeader) {
		[request addValue:authorizationHeader forHTTPHeaderField:@"Authorization"];
	}

	if (credential && credential.type == DCTOAuth2CredentialTypeParamter) {
		[items addObject:[NSURLQueryItem queryItemWithName:DCTOAuth2Keys.accessToken value:credential.accessToken]];
		[items addObject:[NSURLQueryItem queryItemWithName:DCTOAuth2Keys.oauthToken value:credential.accessToken]];
	}

	NSArray *extraItems = [self itemsForRequestType:DCTOAuth2RequestType.signing];
	[items addObjectsFromArray:extraItems];

	if (items.count > 0) {
		URLComponents.queryItems = items;
		request.URL = URLComponents.URL;
	}
}

#pragma mark - NSSecureCoding

- (instancetype)initWithCoder:(NSCoder *)coder {
	self = [super initWithCoder:coder];
	if (!self) return nil;
	_authorizeURL = [coder decodeObjectOfClass:[NSURL class] forKey:DCTOAuth2AccountProperties.authorizeURL];
	_accessTokenURL = [coder decodeObjectOfClass:[NSURL class] forKey:DCTOAuth2AccountProperties.accessTokenURL];
	_username = [coder decodeObjectOfClass:[NSString class] forKey:DCTOAuth2AccountProperties.username];
	_scopes = [coder decodeObjectOfClass:[NSArray class] forKey:DCTOAuth2AccountProperties.scopes];
	return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
	[super encodeWithCoder:coder];
	[coder encodeObject:self.authorizeURL forKey:DCTOAuth2AccountProperties.authorizeURL];
	[coder encodeObject:self.accessTokenURL forKey:DCTOAuth2AccountProperties.accessTokenURL];
	[coder encodeObject:self.username forKey:DCTOAuth2AccountProperties.username];
	[coder encodeObject:self.scopes forKey:DCTOAuth2AccountProperties.scopes];
}

@end
