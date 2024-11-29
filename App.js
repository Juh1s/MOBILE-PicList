import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { StyleSheet, Text, View, Button,  TextInput } from 'react-native';
import { app } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Home from './screens/Home';
import Camera from './screens/Camera';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const auth = getAuth(app);



export const signOutFirebase = () => {
  signOut(auth)
    .then(() => {
      console.log("Signed out.")

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}


const deleteUserInFirebase = () => {
  console.log("DELETE USER");
  
}

export default function App() {
  const [userInput, setUserInput] = useState({
      email: '',
      password: '',
  });
  const [loggedIn, setLoggedIn] = useState('');
  const [currentUser, setCurrentUser] = useState(null);


  

  const placeholder = () => {
  }

  const createAccount = () => {
    createUserWithEmailAndPassword(auth,userInput.email, userInput.password)
      .then((userCredential) => {

        const user = userCredential.user;
        setCurrentUser(user);
        console.log(user);
        console.log("Created account!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      })
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
    .then((userCredential) => {

      const user = userCredential.user;
      setCurrentUser(user);
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    })
  }




  onAuthStateChanged(auth, (user) => {
    if(user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setCurrentUser(null);
    }
  })
  
  //signOutFirebase();
  if(!loggedIn) {
    return(
      <View style={styles.container} >
        <TextInput
            style={{ margin: 3 }}
            label="Email"
            mode="outlined"
            placeholder='email@email.com'
            value={userInput.email}
            onChangeText={text => setUserInput({ ...userInput, email: text })}
        />
        <TextInput
            style={{ marginBottom: 10 }}
            label="Password"
            mode="outlined"
            placeholder='password'
            value={userInput.password}
            onChangeText={text => setUserInput({ ...userInput, password: text })}
        />
        <Button title='Sign in' onPress={signIn} />
        <Button title='Create Account' onPress={createAccount} />
        <Button title='Sign out' onPress={signOutFirebase} />
      </View>
    )
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({  
            tabBarIcon: ({ focused, color, size }) => { 
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Camera') {
                iconName = 'camera';
              }

              return <Ionicons name={iconName} size={size} color={color} />; 
            },
          })}
        >
          <Tab.Screen name='Camera' component={Camera} initialParams={ currentUser }/>
          <Tab.Screen name='Home' component={ Home } initialParams={ currentUser }  />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
