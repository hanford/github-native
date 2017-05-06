
#import "NSKeyedUnarchiver+DCTAuth.h"
NS_ASSUME_NONNULL_BEGIN

@interface NSKeyedUnarchiver (DCTAuthAllGoodDoingSelectorCheck)
+ (nullable id)unarchiveTopLevelObjectWithData:(NSData *)data error:(NSError * __autoreleasing *)error;
@end

@implementation NSKeyedUnarchiver (DCTAuth)

+ (nullable id)dctAuth_unarchiveTopLevelObjectWithData:(NSData *)data error:(NSError * __autoreleasing *)error {

	if ([self respondsToSelector:@selector(unarchiveTopLevelObjectWithData:error:)]) {
		return [self unarchiveTopLevelObjectWithData:data error:error];
	}

	@try {
		id object = [self unarchiveObjectWithData:data];
		return object;
	}
	@catch (NSException *exception) {

		NSString *debugDescription = exception.reason ?: @"";
		*error = [NSError errorWithDomain:NSCocoaErrorDomain code:4864 userInfo:@{
			NSLocalizedDescriptionKey : @"The data couldn’t be read because it isn’t in the correct format.",
			NSLocalizedFailureReasonErrorKey : @"The data isn’t in the correct format.",
			@"NSDebugDescription" : debugDescription
		}];
		return nil;
	}
}

@end

NS_ASSUME_NONNULL_END
