#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ARQuickLookModule, NSObject)

RCT_EXTERN_METHOD(presentARQuickLook:(NSString *)filePath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
