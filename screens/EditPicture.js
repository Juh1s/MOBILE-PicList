import { useState } from 'react';
import { app } from '../firebaseConfig';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { getDatabase, ref, remove, update } from 'firebase/database';

const database = getDatabase(app);

export default function EditPicture({ navigation, route }) {
    const { item, itemKey } = route.params;
    const [picture, setPicture ] = useState({   
      name: item.name,
      description: item.description,
      photograph: item.photograph,
    });

    const handleDelete = () => {
        remove( ref(database, itemKey) );
        navigation.goBack();
    }

    const handleUpdate = () => {
        const updates = {};
        updates[itemKey] = picture;
        update( ref(database), updates);
    }

  return(
    <View style={styles.container} >
      <Image style={{width: "50%", height: "40%"}} source={{uri: `data:image/jpg;base64,${picture.photograph}`}} />
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text style={{fontWeight: "bold", }}>Name: </Text>
        <TextInput
            style={{ marginBottom: 10 }}
            label="Name"
            mode="outlined"
            placeholder='Name'
            value={picture.name}
            onChangeText={text => setPicture({ ...picture, name: text })}
        />
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text style={{fontWeight: "bold", }}>Description: </Text>
        <TextInput
            style={{ marginBottom: 10 }}
            label="Description"
            mode="outlined"
            placeholder='Description'
            value={picture.description}
            onChangeText={text => setPicture({ ...picture, description: text })}
        />
      </View>
      <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between' }}>
        <Button color="#008000" title='Save Changes' onPress={() => handleUpdate()}/>
        <Button color="#ff4500" title='Delete' onPress={() => handleDelete()}/>
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
  