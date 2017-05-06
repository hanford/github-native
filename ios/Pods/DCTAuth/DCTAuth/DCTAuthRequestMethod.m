//
//  DCTAuthRequestMethod.m
//  DCTAuth
//
//  Created by Daniel Tull on 21.10.2014.
//  Copyright (c) 2014 Daniel Tull. All rights reserved.
//

#import "DCTAuthRequestMethod.h"

static NSString *const DCTAuthRequestMethodString[] = {
	@"GET",
	@"POST",
	@"DELETE",
	@"HEAD",
	@"PUT",
	@"PATCH",
	@"OPTIONS",
	@"TRACE"
};

NSString * NSStringFromDCTAuthRequestMethod(DCTAuthRequestMethod method) {
	return DCTAuthRequestMethodString[method];
}
