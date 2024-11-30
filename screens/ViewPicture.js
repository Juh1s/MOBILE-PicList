import { useState } from 'react';
import { app } from '../firebaseConfig';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { getDatabase, ref, remove, update } from 'firebase/database';

const database = getDatabase(app);

export default function ViewPicture({ navigation, route }) {
    const { item } = route.params;
 
  return(
    <View style={styles.container} >
      <Image style={{width: "50%", height: "40%"}} source={{uri: `data:image/jpg;base64,${item.photograph}`}} />
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text style={{fontWeight: "bold", }}>Name: </Text>
        <Text style={{ marginBottom: 10 }}>{item.name}</Text>
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text style={{fontWeight: "bold", }}>Description: </Text>
        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
      </View>
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
  