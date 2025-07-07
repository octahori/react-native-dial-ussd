import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-dial-ussd' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const DialUssd = NativeModules.DialUssd
  ? NativeModules.DialUssd
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return DialUssd.multiply(a, b);
}

export function dialUssd(code: string): Promise<void> {
  return DialUssd.dialUssd(code);
}
