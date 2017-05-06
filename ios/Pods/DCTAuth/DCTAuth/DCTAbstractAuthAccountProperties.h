//
//  DCTAbstractAuthAccountProperties.h
//  DCTAuth
//
//  Created by Daniel Tull on 17.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;

extern const struct DCTAbstractAuthAccountProperties {
	__unsafe_unretained NSString *type;
	__unsafe_unretained NSString *identifier;
	__unsafe_unretained NSString *accountDescription;
	__unsafe_unretained NSString *callbackURL;
	__unsafe_unretained NSString *shouldSendCallbackURL;
	__unsafe_unretained NSString *userInfo;
	__unsafe_unretained NSString *saveUUID;
	__unsafe_unretained NSString *extraItems;
} DCTAbstractAuthAccountProperties;
