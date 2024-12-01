import { StyleSheet, FlatList, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

const database = getDatabase(app);

export default function UsersLists({ navigation }) {

  const [ lists, setLists ] = useState([]);
  const [ keys, setKeys ] = useState([]);

  useEffect(() => {
    const listsRef = ref(database, `pics/`);
    onValue(listsRef, (snapshot) => {
      const data = snapshot.val();
      if(data) {
        setLists(Object.values(data));
        setKeys(Object.keys(data));
      } else
        setLists([]);
    })
  }, []);
  
  const findListName = (list) => {
    const listIndex = lists.indexOf(list);
    const listKey = keys.at(listIndex);
    return(`${listKey}`);
  }

  return(
    <View style={styles.container} >
      <Text style={{fontSize: 20, marginBottom: 5 }}>All Users Lists</Text>
      <FlatList 
        data={lists}
        renderItem={({item}) => 
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ fontWeight: "bold" }}>{findListName(item)} </Text>
              <Button title='View User Gallery' onPress={() => {
                const listName = findListName(item);
                const listKey = `/pics/${listName}`;
                navigation.navigate('Gallery', { listKey})}
              }/>
            </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
