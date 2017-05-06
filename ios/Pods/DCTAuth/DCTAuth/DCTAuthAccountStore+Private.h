//
//  DCTAuthAccountStore+Private.h
//  DCTAuth
//
//  Created by Daniel Tull on 05.11.2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

#import "DCTAuthAccountStore.h"
#import "DCTAuthAccountCredential.h"

@interface DCTAuthAccountStore (Private)

- (void)saveCredential:(id<DCTAuthAccountCredential>)credential forAccount:(DCTAuthAccount *)account;
- (id<DCTAuthAccountCredential>)retrieveCredentialForAccount:(DCTAuthAccount *)account;

@end
