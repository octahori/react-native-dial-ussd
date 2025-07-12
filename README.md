# react-native-dial-ussd

A React Native native module to dial USSD codes programmatically on Android & iOS.

## Features
- Dial any USSD code (e.g. `*123#`).
- Promise-based API `dialUssd(code: string): Promise<void>`.
- Ready-to-use `DialUssdButton` component.

## Installation

```bash
# with yarn
yarn add react-native-dial-ussd

# with npm
npm install react-native-dial-ussd
```

iOS only:

```bash
cd ios && pod install
```

## Usage

```tsx
import { dialUssd, DialUssdButton } from 'react-native-dial-ussd';

// imperative
await dialUssd('*123#');

// declarative
<DialUssdButton code="*123#" />
```

### DialUssdButton Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | – | USSD code to dial (e.g. `*123#`). |
| `title` | `string` | `Dial ${code}` | Button label |
| `buttonStyle` | `StyleProp<ViewStyle>` | – | Override button container style |
| `textStyle` | `StyleProp<TextStyle>` | – | Override label style |

## Example

Clone this repo and run the example app:

```bash
yarn
yarn example android   # or ios
```
