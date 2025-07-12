import {
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { dialUssd } from 'react-native-dial-ussd';

export default function App() {
  async function run() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE
    );

    switch (granted) {
      case PermissionsAndroid.RESULTS.GRANTED:
        await dialUssd('*123#');
        break;

      case PermissionsAndroid.RESULTS.DENIED:
        Alert.alert(
          'Permission required',
          'This feature needs access to make calls. Please grant the permission when prompted.'
        );
        break;

      case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
        Alert.alert(
          'Permission blocked',
          'You’ve blocked call permissions. To use this feature, open Settings and allow CALL_PHONE.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                if (Platform.OS === 'android') {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        break;

      default:
        console.log('Unknown permission result:', granted);
    }
  }
  return <Button title="Dial *123#" onPress={run} />;
}
