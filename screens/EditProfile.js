import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { app } from '../firebaseConfig';
import { getAuth, signOut, deleteUser, updateProfile } from 'firebase/auth';

const auth = getAuth(app);

export default function EditProfile({ navigation }) {

  const user = auth.currentUser;
  const [userInput, setUserInput] = useState({
    email: user.email,
    name: user.displayName,
  });

  const updateUserName = (newName) => {
    updateProfile(user, {
      displayName: newName
    }).then(() => {
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    })
  }

  const signOutFirebase = () => {
    signOut(auth)
      .then(() => {
        
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
        
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

    return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16 }}>EDIT PROFILE</Text>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{fontWeight: "bold", }}>Email: </Text>
        <Text>{user.email}</Text>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{fontWeight: "bold", }}>Name: </Text>
        <TextInput
            style={{ marginBottom: 10 }}
            label="Name"
            mode="outlined"
            placeholder='Name'
            value={userInput.name}
            onChangeText={text => setUserInput({ ...userInput, name: text })}
        />
        <Button style={{ marginBottom: 5 }} title='Change Name' onPress={() => updateUserName(userInput.name)}/>
      </View>
      <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between' }}>
        <Button style={{ margin: 1 }} title='Sign Out' color="#ffbf00" onPress={() => signOutFirebase()} />
        <Button style={{ margin: 1 }} title='Delete Account' color="#ff4500" onPress={() => deleteUserInFirebase()} />
        <Button style={{ margin: 1 }} title='Go Back' onPress={() => navigation.goBack()} />
      </View>
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
