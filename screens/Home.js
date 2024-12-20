import { StyleSheet, FlatList, Text, View, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const database = getDatabase(app);
const auth = getAuth(app);

export default function Home({ navigation }) {

    const user = auth.currentUser;
    const [ pics, setPics ] = useState([]);
    const [ keys, setKeys ] = useState([]);

    useEffect(() => {
      const picsRef = ref(database, `pics/${user.uid}/`);
      onValue(picsRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
          setPics(Object.values(data));
          setKeys(Object.keys(data));
        } else
          setPics([]);
      })
    }, []);

    const findItemKey = (item) => {
      const itemIndex = pics.indexOf(item);
      const itemKey = keys.at(itemIndex);
      return(`/pics/${user.uid}/${itemKey}`);
    }

    return (
    <View style={styles.container}>
      <Button title='Edit Profile' onPress={() => navigation.navigate('Edit Profile')} />
      <Text style={{fontSize: 20, marginBottom: 5 }}>Your Picture List</Text>
      <FlatList 
        data={pics}
        renderItem={({item}) => 
          <View style={{ flexDirection: "row", margin: 1}}>
            <Image style={{width: 70, height: 80}} source={{ uri: `data:image/jpg;base64,${item.photograph}` }}/>
            <View style={{margin: 2 , width: "47%" }}>
              <Text style={{fontWeight: "bold", }}>{item.name} </Text>
              <Text>{item.description}</Text>
            </View>
            <Button title={`Edit \n Info`} onPress={() => {
              const itemKey = findItemKey(item);
              navigation.navigate('Edit Picture', {item, itemKey})}
            }/>
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
