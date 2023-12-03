import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      '77886534151-0ttul5s430g046h9tfott277vun9facr.apps.googleusercontent.com',
  });
  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(statusCodes.SIGN_IN_CANCELLED, '1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(statusCodes.IN_PROGRESS);
      } else if (
        (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE, '2')
      ) {
        // play services not available or outdated
        console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE, '3');
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.LoginButton}
        //   onPress={() => navigation.navigate('contact')
        // }
        onPress={() => {
          onGoogleButtonPress()
            .then(() => {
              console.log('User signed in using Google');
            })
            .catch(error => {
              console.log(error);
            });
          navigation.navigate('contact')

        }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButton: {
    width: '80%',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
