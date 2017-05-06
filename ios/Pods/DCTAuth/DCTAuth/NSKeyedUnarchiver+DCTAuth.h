
@import Foundation;

NS_ASSUME_NONNULL_BEGIN

@interface NSKeyedUnarchiver (DCTAuth)

+ (nullable id)dctAuth_unarchiveTopLevelObjectWithData:(NSData *)data error:(NSError * __autoreleasing *)error;

@end

NS_ASSUME_NONNULL_END