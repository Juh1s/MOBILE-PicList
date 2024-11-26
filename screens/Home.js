import { StyleSheet, FlatList, Text, View, Image, Button } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';

const database = getDatabase(app);

export default function Home() {

    const pictureList = []; // setup to contain pictures and their info as a list
    const [ pics, setPics ] = useState([]);
    const [ keys, setKeys ] = useState([]);

    useEffect(() => {
      const picsRef = ref(database, 'pics/');
      onValue(picsRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
          setPics(Object.values(data));
          setKeys(Object.keys(data));
        } else
          setPics([]);
      })
    }, []);

    const handleDelete = (item) => {
      const itemIndex = pics.indexOf(item);
      const itemKey = keys.at(itemIndex);
      console.log(itemIndex);

      remove( ref(database, `/pics/${itemKey}`))
    }

    const editPics = () => {

    }

    return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, marginBottom: 5 }}>Picture List</Text>
      <FlatList 
        data={pics}
        renderItem={({item}) =>
          <View style={{ flexDirection: "row", margin: 1}}>
            <Image style={{width: 70, maxHeight: 80}} source={item.photograph}/>
            <View style={{margin: 2 , width: "50%" }}>
              <Text style={{fontWeight: "bold", }}>{item.name} </Text>
              <Text>{item.description}</Text>
            </View>
            <Button title='Edit' onPress={editPics}/>
            <Button color="#ff4500" title='Delete' onPress={() => handleDelete(item)}/>
          </View>
        }
      />
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
