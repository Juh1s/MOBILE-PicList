import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { StyleSheet, Text, View, Button,  TextInput } from 'react-native';
import { app } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Home from './screens/Home';
import Camera from './screens/Camera';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const auth = getAuth(app);



export default function App() {
  const [userInput, setUserInput] = useState({
      email: '',
      password: '',
  });

  const placeholder = () => {

  }



  if(true) {
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
        <Button title='Login' onPress={placeholder} />
        <Button title='Create Account' onPress={placeholder} />
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
          <Tab.Screen name='Camera' component={Camera} />
          <Tab.Screen name='Home' component={Home} />
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
