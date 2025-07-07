#import "DialUssd.h"

@implementation DialUssd
RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_EXPORT_METHOD(multiply:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @(a * b);

    resolve(result);
}

// Dial USSD code (may not work on all carriers/iOS versions)
RCT_EXPORT_METHOD(dialUssd:(NSString *)code
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSString *encodedHash = [@"#" stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLHostAllowedCharacterSet]];
        NSString *formatted = [[code stringByReplacingOccurrencesOfString:@"#" withString:encodedHash] stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
        NSString *urlString = [NSString stringWithFormat:@"tel:%@", formatted];
        NSURL *url = [NSURL URLWithString:urlString];
        if ([[UIApplication sharedApplication] canOpenURL:url]) {
            [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];
            resolve(nil);
        } else {
            reject(@"E_UNAVAILABLE", @"Cannot open dialer", nil);
        }
    } @catch (NSException *exception) {
        reject(@"E_EXCEPTION", exception.reason, nil);
    }
}


@end
