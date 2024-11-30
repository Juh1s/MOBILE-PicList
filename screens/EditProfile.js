import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
//import Home from './Home';

const auth = getAuth(app);

export default function EditProfile({ navigation }) {

  const user = auth.currentUser;
  const [userInput, setUserInput] = useState({
    email: user.email,
    name: user.name,
  });


  const signOutFirebase = () => {
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
    deleteUser(user)
      .then(() => {
        console.log("User DELETED!");
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    console.log("DELETE USER");
    
  }

    return (
    <View style={styles.container}>
      <Text>EDIT PROFILE</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text>Email: </Text>
        <TextInput
            style={{ marginBottom: 10 }}
            label="Email"
            mode="outlined"
            placeholder='Email'
            value={user.email}
            onChangeText={text => setUserInput({ ...userInput, email: text })}
        />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text>Name: </Text>
        <TextInput
            style={{ marginBottom: 10 }}
            label="Name"
            mode="outlined"
            placeholder='Name'
            value={user.name}
            onChangeText={text => setUserInput({ ...userInput, name: text })}
        />
      </View>
      <Button style={{ margin: 1 }} title='User data' onPress={() => console.log(user.uid)}/>
      <Button style={{ margin: 1 }} title='Sign Out' onPress={() => signOutFirebase()} />
      <Button style={{ margin: 10 }} title='Delete Account' onPress={() => deleteUserInFirebase()} />
      <Button style={{ margin: 1 }} title='Back' onPress={() => navigation.goBack()} />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
