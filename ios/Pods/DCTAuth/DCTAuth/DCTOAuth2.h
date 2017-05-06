//
//  DCTOAuth2.h
//  DCTAuth
//
//  Created by Daniel Tull on 22.10.2014.
//  Copyright (c) 2014 Daniel Tull. All rights reserved.
//

@import Foundation;
@class DCTAuthResponse;
#import "DCTOAuth2Credential.h"

@interface DCTOAuth2 : NSObject

+ (NSError *)errorWithStatusCode:(NSInteger)statusCode dictionary:(NSDictionary *)dictionary;
+ (void)parseCredentialsFromResponse:(DCTAuthResponse *)response completion:(void (^)(NSError *error, NSString *code, NSString *accessToken, NSString *refreshToken, DCTOAuth2CredentialType type))completion;

@end
