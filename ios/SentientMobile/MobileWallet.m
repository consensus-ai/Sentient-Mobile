//
//  MobileWallet.m
//  SentientMobile
//
//  Created by Alexander on 2/4/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "MobileWallet.h"
#import <React/RCTLog.h>

MSMobileWallet * g_applicationWallet = nil;

@implementation MobileWallet

+(NSString *)_walletPath
{
  NSArray * paths = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES);
  return [[paths objectAtIndex:0] stringByAppendingPathComponent:@"wallet"];
}

+(BOOL)_walletExists
{
  BOOL isDir = NO;
  BOOL exists = [[NSFileManager defaultManager] fileExistsAtPath:[MobileWallet _walletPath] isDirectory:&isDir];
  return (exists  &&  isDir);
}

-(void)setupDefaultClient
{
  [g_applicationWallet setupClient:@"http://54.187.3.185:8086"];
}

#define CHECK_FOR_WALLET() do { if (nil == g_applicationWallet) { RCTLogInfo(@"Wallet object does not exist"); callback(@[ RCTMakeError(@"Wallet object does not exist", nil, nil), [NSNull null] ]); return; } } while(0)

#define CHECK_NO_WALLET() do { if (nil != g_applicationWallet) { RCTLogInfo(@"Wallet object already exists"); callback(@[ RCTMakeError(@"Wallet object already exists", nil, nil), [NSNull null] ]); return; } } while(0)

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(walletExists:(RCTResponseSenderBlock)callback) {
  callback(@[ [NSNull null], [NSNumber numberWithBool:[MobileWallet _walletExists]] ]);
}

RCT_EXPORT_METHOD(createWalletWithPassword:(NSString *)password callback:(RCTResponseSenderBlock)callback) {
  CHECK_NO_WALLET();
  if ([MobileWallet _walletExists]) {
    RCTLogInfo(@"Wallet directory already exists; use openWalletWithPassword");
    callback(@[ RCTMakeError(@"Wallet directory already exists", nil, nil), [NSNull null] ]);
    return;
  }
  g_applicationWallet = MSMobileCreateNewWallet([MobileWallet _walletPath], password);
  if (nil == g_applicationWallet) {
    RCTLogInfo(@"wallet create error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Wallet create error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  [self setupDefaultClient];
  callback(@[ [NSNull null], [NSNumber numberWithBool:YES] ]);
}

RCT_EXPORT_METHOD(createWalletWithSeed:(NSString *)seed password:(NSString *)password callback:(RCTResponseSenderBlock)callback) {
  CHECK_NO_WALLET();
  if ([MobileWallet _walletExists]) {
    RCTLogInfo(@"Wallet directory already exists; use openWalletWithPassword");
    callback(@[ RCTMakeError(@"Wallet directory already exists", nil, nil),[NSNull null] ]);
    return;
  }
  g_applicationWallet = MSMobileCreateWalletWithSeed([MobileWallet _walletPath], password, seed);
  if (nil == g_applicationWallet) {
    RCTLogInfo(@"wallet create w/seed error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Wallet create w/seed error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  [self setupDefaultClient];
  callback(@[ [NSNull null], [NSNumber numberWithBool:YES] ]);
}

RCT_EXPORT_METHOD(openWalletWithPassword:(NSString *)password callback:(RCTResponseSenderBlock)callback) {
  CHECK_NO_WALLET();
  if (![MobileWallet _walletExists]) {
    RCTLogInfo(@"Wallet directory does not exist; use createWalletWithPassword");
    callback(@[ RCTMakeError(@"Wallet directory does not exist", nil, nil),[NSNull null] ]);
    return;
  }
  g_applicationWallet = MSMobileOpenWallet([MobileWallet _walletPath], password);
  if (nil == g_applicationWallet) {
    RCTLogInfo(@"wallet open error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Wallet open error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  [self setupDefaultClient];
  callback(@[ [NSNull null], [NSNumber numberWithBool:YES] ]);
}

RCT_EXPORT_METHOD(isUnlocked:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  callback(@[ [NSNull null], [NSNumber numberWithBool:[g_applicationWallet isUnlocked]] ]);
}

RCT_EXPORT_METHOD(lock:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  BOOL result = [g_applicationWallet lock];
  if (!result) {
    RCTLogInfo(@"Lock error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Lock error", MSMobileLastError(), nil), [NSNull null] ]);
  } else {
    callback(@[ [NSNull null], [NSNumber numberWithBool:YES] ]);
  }
}

RCT_EXPORT_METHOD(unlockWithPassword:(NSString *)password callback:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  BOOL result = [g_applicationWallet unlock:password];
  if (!result) {
    RCTLogInfo(@"Unlock error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Unlock error", MSMobileLastError(), nil), [NSNull null] ]);
  } else {
    callback(@[ [NSNull null], [NSNumber numberWithBool:YES] ]);
  }
}

RCT_EXPORT_METHOD(makeNewAddress:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  NSString * result = [g_applicationWallet makeNewAddress];
  if (0 == [result length]) {
    RCTLogInfo(@"Make address error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Make address error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  callback(@[ [NSNull null], result ]);
}

RCT_EXPORT_METHOD(numAddresses:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  long result = [g_applicationWallet numAddresses];
  if (0 == result) {
    RCTLogInfo(@"Num addresses error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Num addresses error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  callback(@[ [NSNull null], [NSNumber numberWithInt:(int)result] ]);
}

RCT_EXPORT_METHOD(addresses:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  int numAddrs = (int)[g_applicationWallet numAddresses];
  if (0 == numAddrs) {
    RCTLogInfo(@"Num addresses error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Num addresses error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  NSMutableArray * addresses = [[NSMutableArray alloc] init];
  for (NSInteger i = 0; i < numAddrs; ++i) {
    NSString * address = [g_applicationWallet addressAtIndex:(long)i];
    if (0 == [address length]) {
      RCTLogInfo(@"Get address error: %@", MSMobileLastError());
      callback(@[ RCTMakeError(@"Get address error", MSMobileLastError(), nil), [NSNull null] ]);
      return;
    }
    [addresses addObject:address];
  }
  callback(@[ [NSNull null], addresses ]);
}

RCT_EXPORT_METHOD(addressAtIndex:(NSInteger)index callback:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  NSString * result = [g_applicationWallet addressAtIndex:(long)index];
  if (0 == [result length]) {
    RCTLogInfo(@"Get address error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Get address error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  callback(@[ [NSNull null], result ]);
}

RCT_EXPORT_METHOD(primarySeed:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  NSString * result = [g_applicationWallet primarySeed];
  if (0 == [result length]) {
    RCTLogInfo(@"Primary seed error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Primary seed error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  callback(@[ [NSNull null], result ]);
}

RCT_EXPORT_METHOD(setupClient:(NSString *)baseUrl callback:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  BOOL result = [g_applicationWallet setupClient:baseUrl];
  if (!result) {
    RCTLogInfo(@"Unlock error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Unlock error", MSMobileLastError(), nil), [NSNull null] ]);
  } else {
    callback(@[ [NSNull null], [NSNumber numberWithBool:YES] ]);
  }
}

RCT_EXPORT_METHOD(getBalance:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  NSString * result = [g_applicationWallet getBalance];
  if (0 == [result length]) {
    RCTLogInfo(@"Balance error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Balance error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  callback(@[ [NSNull null], result ]);
}

RCT_EXPORT_METHOD(getFee:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  NSString * result = [g_applicationWallet estimatedFee];
  if (0 == [result length]) {
    RCTLogInfo(@"Fee error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Fee error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  callback(@[ [NSNull null], result ]);
}

RCT_EXPORT_METHOD(transactions:(RCTResponseSenderBlock)callback) {
  return [self transactionPage:0 pageSize:-1 callback:callback];
}

RCT_EXPORT_METHOD(numTransactions:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  long result = [g_applicationWallet getNumTransactions];
  if (0 == result) {
    RCTLogInfo(@"Num txns error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Num txns error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  callback(@[ [NSNull null], [NSNumber numberWithInt:(int)result] ]);
}

RCT_EXPORT_METHOD(transactionPage:(NSInteger)pageIndex pageSize:(NSInteger)pageSize callback:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  int numTxns = (int)[g_applicationWallet getNumTransactions];
  if (-1 == numTxns) {
    RCTLogInfo(@"Num transactions error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Num transactions error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  NSMutableArray * txns = [[NSMutableArray alloc] init];
  NSInteger start = (pageSize == -1 ? 0 : pageIndex * pageSize);
  NSInteger end = (pageSize == -1 ? numTxns : start + pageSize);
  for (NSInteger i = start; i < numTxns  &&  i < end; ++i) {
    MSMobileTransaction * txn = [g_applicationWallet transactionAtIndex:(long)i];
    if (nil == txn) {
      RCTLogInfo(@"Get transaction error: %@", MSMobileLastError());
      callback(@[ RCTMakeError(@"Get transaction error", MSMobileLastError(), nil), [NSNull null] ]);
      return;
    }
    [txns addObject:txn];
  }
  callback(@[ [NSNull null], txns ]);
}

RCT_EXPORT_METHOD(sendSen:(NSString *)dest amount:(NSString *)amount callback:(RCTResponseSenderBlock)callback) {
  CHECK_FOR_WALLET();
  NSString * result = [g_applicationWallet sendSen:dest amount:amount];
  if (0 == [result length]) {
    RCTLogInfo(@"Send SEN error: %@", MSMobileLastError());
    callback(@[ RCTMakeError(@"Send SEN error", MSMobileLastError(), nil), [NSNull null] ]);
    return;
  }
  callback(@[ [NSNull null], result ]);
}

RCT_EXPORT_METHOD(apiError:(RCTResponseSenderBlock)callback) {
  callback(@[ [NSNull null], MSMobileLastError() ]);
}

@end
