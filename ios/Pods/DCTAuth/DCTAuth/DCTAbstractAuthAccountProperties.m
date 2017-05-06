//
//  DCTAbstractAuthAccountProperties.m
//  DCTAuth
//
//  Created by Daniel Tull on 17.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

#import "DCTAbstractAuthAccountProperties.h"

const struct DCTAbstractAuthAccountProperties DCTAbstractAuthAccountProperties = {
	.type = @"type",
	.identifier = @"identifier",
	.accountDescription = @"accountDescription",
	.callbackURL = @"callbackURL",
	.shouldSendCallbackURL = @"shouldSendCallbackURL",
	.userInfo = @"userInfo",
	.saveUUID = @"saveUUID",
	.extraItems = @"extraItems"
};
