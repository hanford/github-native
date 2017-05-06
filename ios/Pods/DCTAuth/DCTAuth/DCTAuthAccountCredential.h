//
//  DCTAuthAccountCredential.h
//  DCTAuth
//
//  Created by Daniel Tull on 22/02/2013.
//  Copyright (c) 2013 Daniel Tull. All rights reserved.
//

@import Foundation;

/** DCTAuthAccountCredential is a protocol that should 
 be implemented alongside each DCTAuthAccount subclass
 to store the values which should be kept secure. For 
 example the Basic Auth implementation stores the just
 the password in its credential.
 
 When an account is saved by a DCTAuthAccountStore, it 
 is acrhived to disk using NSCoding. The store then takes
 the account credentials, archives it and stores the data
 in the keychain. 
 
 @see -[DCTAuthAccount credential]
 */
@protocol DCTAuthAccountCredential <NSObject, NSSecureCoding>
@end
