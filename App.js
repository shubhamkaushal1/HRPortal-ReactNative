/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  View, Button
} from 'react-native';
import {auth, createUserDocument } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const App: () => Node = () => {

  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  GoogleSignin.configure({
    webClientId: '731986561365-vlkhc2gm3v2lba1sp0486j2grgre23jt.apps.googleusercontent.com',
  });

  const signInWithGoogleAsync = async () => {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user_sign_in = auth().signInWithCredential(googleCredential);

      user_sign_in.then((user) =>{
        const name = '';
        await createUserDocument(user, {name})
      })
      .catch((error)=>{
        console.log(error);
      })

  }

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Button 
        title='Sign in Google'
        onPress={signInWithGoogleAsync}
      />
      {/* <Button 
        title='Sign out'
        onPress={signInWithGoogleAsync}
      /> */}
      
    </View>
  );
};

// const styles = StyleSheet.create({
  
// });

export default App;
