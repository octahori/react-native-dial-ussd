import { NativeModules, Platform } from 'react-native';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

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

export interface DialUssdButtonProps {
  code: string;
  title?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const DialUssdButton: React.FC<DialUssdButtonProps> = ({
  code,
  title = `Dial ${code}`,
  buttonStyle,
  textStyle,
}) => {
  const onPress = () => {
    dialUssd(code).catch(err => console.warn('dialUssd error', err));
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
