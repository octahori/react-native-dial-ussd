// Minimal mock for react-native to run in Jest environment without native binaries
jest.mock('react-native', () => {
  const React = require('react');
  return {
    NativeModules: {
      DialUssd: { dialUssd: jest.fn().mockResolvedValue(undefined) },
    },
    TouchableOpacity: (props: any) => React.createElement('TouchableOpacity', props, props.children),
    Text: (props: any) => React.createElement('Text', props, props.children),
    StyleSheet: { create: () => ({}) },
    Platform: { select: () => '' },
  };
});

import { NativeModules, TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import { dialUssd, DialUssdButton } from '../index';

const mockedDial = NativeModules.DialUssd.dialUssd as jest.Mock;

describe('react-native-dial-ussd', () => {
  beforeEach(() => {
    mockedDial.mockClear();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dialUssd() should call NativeModules.DialUssd.dialUssd with given code', () => {
    const code = '*123#';
    dialUssd(code);
    expect(NativeModules.DialUssd.dialUssd).toHaveBeenCalledWith(code);
  });

  it('DialUssdButton should call dialUssd on press', () => {
    const code = '*456#';
    let tree: renderer.ReactTestRenderer;
    act(() => {
      tree = renderer.create(<DialUssdButton code={code} />);
    });
    const touchable = tree!.root.findByType(TouchableOpacity);

    act(() => {
      touchable.props.onPress();
    });

    expect(NativeModules.DialUssd.dialUssd).toHaveBeenCalledWith(code);
  });
});
