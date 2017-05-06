# DCTAuth

A library for performing authorised web requests to services using OAuth, OAuth 2.0 and basic authentiaction.

## Features

DCTAuth is [fully documented](http://danieltull.co.uk/DCTAuth/documentation/) and there is a [feed for the docset](http://danieltull.co.uk/DCTAuth/documentation/docset.atom) that you can add to Xcode. If you have appledoc installed, a build phase of the framework target will generate and install the documentation.

* Multiple account type architecture
    * Built-in support for OAuth, OAuth 2.0 and Basic authentication
    * Add extra headers to authentication requests
    * Create your own custom authentication system

* Works on Mac and iOS
    * OS X 10.7+
    * iOS 5+

* Web view authorization step
    * Launch Safari and return with a callback URL
    * Provide in-app web view

* Keychain
	* Accounts save to the keychain
	* Supports iCloud Keychain sync
	* Supports keychain access groups

* Account Stores
	* Multiple account stores, for different types of account
	* KVO accounts property for easy listing of accounts

## Example

The following shows how to create a Twitter account, authenticate it and request the user's home timeline excluding the replies.

    DCTOAuth1Account *account = [[DCTOAuth1Account alloc] initWithType:@"Twitter"
                                                       requestTokenURL:[NSURL URLWithString:@"https://api.twitter.com/oauth/request_token"]
                                                          authorizeURL:[NSURL URLWithString:@"https://api.twitter.com/oauth/authorize"]
                                                        accessTokenURL:[NSURL URLWithString:@"https://api.twitter.com/oauth/access_token"]
                                                           consumerKey:@"YOUR TWITTER CONSUMER KEY"
                                                        consumerSecret:@"YOUR TWITTER CONSUMER SECRET"];
    
    account.callbackURL = [NSURL URLWithString:@"dctauth://test"];
    
    [account authenticateWithHandler:^(NSArray *responses, NSError *error) {
    
        if (!account.authorized) {
            // Something failed
            return;
        }
    
      	NSURL *URL = [NSURL URLWithString:@"https://api.twitter.com/1.1/statuses/home_timeline.json"];
	    NSURLQueryItem *item = [NSURLQueryItem queryItemWithName:@"exclude_replies" value:@"true"];
        DCTAuthRequest *request = [[DCTAuthRequest alloc] initWithRequestMethod:DCTAuthRequestMethodGET URL:URL items:@[item]];
        request.account = account;
        
        [request performRequestWithHandler:^(DCTAuthResponse *response, NSError *error) {
            NSInteger statusCode = response.statusCode;
            NSData *data = response.data;
        }];
    }];

The framework allows app extension API only, so you also need to provide a couple of handlers for performing background tasks and opening authorization URLs. These authorization URLs are always web addresses, so either call out to Safari or open in an `UIWebView` or `WKWebView`, making sure to call `+[DCTAuth handleURL:]` to let the framework handle any responses.

In an application you can provide the following:

    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
        DCTAuthPlatform *authPlatform = [DCTAuthPlatform sharedPlatform];
        
        authPlatform.beginBackgroundTaskHandler = ^id(DCTAuthPlatformExpirationHandler expirationHandler) {
    	    UIBackgroundTaskIdentifier identifier = [application beginBackgroundTaskWithExpirationHandler:expirationHandler];
            return @(identifier);
        };
        
        authPlatform.endBackgroundTaskHandler = ^(id identifier) {
    	    UIBackgroundTaskIdentifier taskIdentifier = [identifier unsignedIntegerValue];
            [application endBackgroundTask:taskIdentifier];
        };
        
        authPlatform.URLOpener = ^void(NSURL *URL, DCTAuthPlatformCompletion completion) {
        	BOOL success = [application openURL:URL];
            completion(success);
    	};
        
        …
    }
    
    - (BOOL)application:(UIApplication *)application openURL:(NSURL *)URL sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    	return [DCTAuth handleURL:URL];
    }
    
For an extension, you must provide a web view to perform authorization. You can also use a web view inside your app to have a more contained feeling to authorization. The following shows how to setup the `URLOpener` and use the `UIWebView` delegate method to allow DCTAuth to handle the URLs.

    - (void)setupWebView {
        UIWebView *webView = self.webView;
        [DCTAuthPlatform sharedPlatform].URLOpener = ^void(NSURL *URL, DCTAuthPlatformCompletion completion) {
    	    [webView loadRequest:[NSURLRequest requestWithURL:URL]];
            completion(YES);
        };
    }
    
    // If DCTAuth has handled the URL, it's going to be the auth response, so we don't want to display that
    - (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    	return ![DCTAuth handleURL:request.URL];
    }

### Swift

    let account = DCTOAuth1Account(type: "Twitter",
                        requestTokenURL:NSURL(string: "https://api.twitter.com/oauth/request_token"), 
                           authorizeURL:NSURL(string: "https://api.twitter.com/oauth/authorize"),
                         accessTokenURL:NSURL(string:"https://api.twitter.com/oauth/access_token"),
                            consumerKey:"YOUR TWITTER CONSUMER KEY",
                         consumerSecret:"YOUR TWITTER CONSUMER SECRET")

    account.callbackURL = NSURL(string:"dctauth://test")
    
    account.authenticateWithHandler { (responses, error) -> Void in
    
        if !account.authorized {
            println("Authentication failure: " + error.localizedDescription)
            return
        }
    
        let URL = NSURL(string: "https://api.twitter.com/1.1/statuses/home_timeline.json")
        let item = NSURLQueryItem(name:"exclude_replies", value:"true")
        let request = DCTAuthRequest(requestMethod:.GET, URL:URL, items:[item])
        request.account = account
    
        request.performRequestWithHandler { (response, error) -> Void in
            let statusCode = response.statusCode
            let data = response.data
        }
    }

## Known working services

While the implementations _should_ work for all services using that standard, I can confirm that they work for the following providers:

### OAuth

* [500px](https://github.com/500px/api-documentation)
* [Bitbucket](https://confluence.atlassian.com/display/BITBUCKET/oauth+Endpoint)
* [Dropbox](http://www.dropbox.com/developers/reference/api)
* [Fitbit](http://dev.fitbit.com)
* [Flickr](http://www.flickr.com/services/api/auth.oauth.html)
* [Goodreads](https://www.goodreads.com/api/documentation)
* [Meetup](http://www.meetup.com/meetup_api/auth/#oauth)
* [Plurk](http://www.plurk.com/API)
* [Readability](http://www.readability.com/developers/api)
* [Trello](https://trello.com/docs/gettingstarted/oauth.html)
* [TripIt](http://tripit.github.com/api/doc/v1/#authentication_section)
* [Tumblr](https://www.tumblr.com/docs/en/api/v2#auth) ([Notes](#tumblr))
* [Twitter](https://dev.twitter.com/docs/auth/oauth)
* [Withings](http://oauth.withings.com/api) ([Notes](#withings))
* [Xero](http://developer.xero.com/documentation/getting-started/public-applications/) ([Notes](#xero))
* [Yahoo!](http://developer.yahoo.com/oauth/guide/index.html)

### OAuth 2.0

* [37signals](https://github.com/37signals/api/blob/master/sections/authentication.md#oauth-2) ([Notes](#37signals))
* [Box](http://developers.box.com/oauth/)
* [Coinbase](https://coinbase.com/docs/api/authentication)
* [Disqus](https://disqus.com/api/docs/auth/)
* [Eventbrite](http://developer.eventbrite.com/docs/auth/) ([Notes](#eventbrite))
* [Facebook](https://developers.facebook.com/docs/authentication/) ([Notes](#facebook))
* [Foursquare](https://developer.foursquare.com/overview/auth.html) (Code and Token flow)
* [GitHub](http://developer.github.com/v3/oauth/)
* [Google](https://developers.google.com/accounts/docs/OAuth2InstalledApp) (Installed Applications)
* [Gumroad](https://gumroad.com/api#api-authentication)
* [Imgur](https://api.imgur.com/oauth2)
* [Instagram](http://instagram.com/developer/authentication/) (Explicit and Implicit flow)
* [LinkedIn](http://developer.linkedin.com/documents/authentication)
* [Meetup](http://www.meetup.com/meetup_api/auth/#oauth)
* [Podio](https://developers.podio.com/authentication)
* [Reddit](https://github.com/reddit/reddit/wiki/OAuth2)
* [Slack](https://api.slack.com/docs/oauth)
* [SoundCloud](http://developers.soundcloud.com/docs#authentication)
* [Strava](http://strava.github.io/api/v3/oauth/)
* [Windows Live](http://msdn.microsoft.com/en-us/library/live/hh826541.aspx) ([Notes](#windows-live))
* [Yammer](https://developer.yammer.com/authentication/#a-oauth2) (Client-side flow only)

### Basic Authentication

* [Instapaper](http://www.instapaper.com/api/simple)
* [JIRA](https://developer.atlassian.com/display/JIRADEV/JIRA+REST+API+Example+-+Basic+Authentication)
* [Pinboard](http://pinboard.in/api)
* [Redmine](http://www.redmine.org/projects/redmine/wiki/Rest_api#Authentication)

## Service Notes

### 37signals

37signals require a `type` parameter to be passed into all authentication calls. To deal with this DCTAuth 3 includes `[DCTAuthAccount setParameters:forRequestType:]` which allows you to add service specific parameters to the different requests.

To get 37signals auth working, you use the following code:

    NSURL *authorizeURL = [NSURL URLWithString:@"https://launchpad.37signals.com/authorization/new"];
    NSURL *accessTokenURL = [NSURL URLWithString:@"https://launchpad.37signals.com/authorization/token"]
    DCTOAuth2Account *campfireAccount = [[DCTOAuth2Account alloc] initWithType:@"Campfire"
                                                                  authorizeURL:authorizeURL
                                                                accessTokenURL:accessTokenURL
                                                                      clientID:@"client_id"
                                                                  clientSecret:@"client_secret"
                                                                        scopes:nil];
    campfireAccount.callbackURL = [NSURL URLWithString:@"callback://url"];
    
    NSURLQueryItem *item = [NSURLQueryItem queryItemWithName:@"type" value:@"web_server"];
    [account setItems:@[item] forRequestType:DCTOAuth2RequestType.accessToken];`
    [account setItems:@[item] forRequestType:DCTOAuth2RequestType.authorize];
    [account setItems:@[item] forRequestType:DCTOAuth2RequestType.refresh];

### Eventbrite

While it is seemingly not documented, the callback URL needs to have a scheme of either `http` or `https`.

### Facebook

Facebook require the callback URL to be in the format `fbXXX://blah/` where `XXX` is your app ID.

### Tumblr

Tumblr calls will fail if the callback URL is sent in the request, you should set the callback URL to match the one given when you create the application entry on their site and set `shouldSendCallbackURL` to NO.

### Windows Live

Microsoft have enforced that the callback URL (redirect URI) must have a scheme of HTTP or HTTPS, so to authorise with Windows Live you should set your own URL handler on the DCTAuth class to open the authorisation URL in a web view inside the app. This does go against general OAuth practice, but DCTAuth allows it. Setting a callback URL with `http://` as the scheme will result in working authentication to Windows Live. As far as I can tell you should use at least `wl.signin` as the scope.

### Withings

Withings expects the OAuth parameters transmitted as part of the URL query, so you must set up your account by passing `DCTOAuthParameterTransmissionURLQuery` for the `parameterTransmission`, like so:

	DCTOAuth1Account *account = [[DCTOAuth1Account alloc] initWithType:@"Withings"
                                                       requestTokenURL:[NSURL URLWithString:@"https://oauth.withings.com/account/request_token"]
                                                          authorizeURL:[NSURL URLWithString:@"https://oauth.withings.com/account/authorize"]
                                                        accessTokenURL:[NSURL URLWithString:@"https://oauth.withings.com/account/access_token"]
                                                           consumerKey:@"consumer_key"
                                                        consumerSecret:@"consumer_secret"
                                                         signatureType:DCTOAuthSignatureTypeHMAC_SHA1
                                                 parameterTransmission:DCTOAuthParameterTransmissionURLQuery];

### Xero

When making a public application, Xero says that supplying a domain name for the callback URL is optional, the format of which is explained [here](http://developer.xero.com/documentation/advanced-docs/oauth-callback-domains-explained/). It turns out that if we want a full OAuth experience, it is required, otherwise the user will be shown a number to type into the app (this is completely unsupported by DCTAuth, not to mention completely horrible).

So the domain on the [application's settings](https://api.xero.com/Application) is set to `danieltull.co.uk`,  the callback URL should use a scheme, for example `dctauth://danieltull.co.uk`. The domain must match the one given in the application settings, though you can also add a subdomain like so: `dctauth://subdomain.danieltull.co.uk`.

## License

Copyright (C) 2015 Daniel Tull. All rights reserved.
 
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 
* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 
* Neither the name of the author nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.