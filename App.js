import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { app } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Home from './screens/Home';
import Camera from './screens/Camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import EditProfile from './screens/EditProfile';
import EditPicture from './screens/EditPicture';
import UsersLists from './screens/UsersLists';
import Gallery from './screens/Gallery';
import ViewPicture from './screens/ViewPicture';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const auth = getAuth(app);

function HomeScreen() {
  return(
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Home Page' component={Home} />
      <Stack.Screen name='Edit Profile' component={EditProfile} />
      <Stack.Screen name='Edit Picture' component={EditPicture} />
    </Stack.Navigator>
  );
}

function ListScreen() {
  return(
    <Stack.Navigator initialRouteName='ListScreen' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Users Lists' component={UsersLists} />
      <Stack.Screen name='Gallery' component={Gallery} />
      <Stack.Screen name='View Picture' component={ViewPicture} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [userInput, setUserInput] = useState({
      email: '',
      password: '',
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const createAccount = () => {
    createUserWithEmailAndPassword(auth,userInput.email, userInput.password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("To create account you must have a valid email and password of at least 6 characters.");
      })
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert("Your sign in credentials are invalid.");
    })
  }

  if(!currentUser) {
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
        <Button title='Sign in' color="#338faf" onPress={signIn} />
        <Button title='Create Account' onPress={createAccount} />
      </View>
    )
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({  
            tabBarIcon: ({ color, size }) => { 
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Camera') {
                iconName = 'camera';
              } else if (route.name === 'All Lists') {
                iconName = 'albums';
              }

              return <Ionicons name={iconName} size={size} color={color} />; 
            },
          })}
        >
          <Tab.Screen name='Camera' component={Camera} />
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='All Lists' component={ListScreen} />
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
