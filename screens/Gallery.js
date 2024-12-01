import { StyleSheet, FlatList, Text, View, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

const database = getDatabase(app);

export default function Gallery({ navigation, route }) {

    const { listKey } = route.params
    const [ pics, setPics ] = useState([]);

    useEffect(() => {
      const picsRef = ref(database, listKey);
      onValue(picsRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
          setPics(Object.values(data));
        } else
          setPics([]);
      })
    }, []);

    return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, marginBottom: 5 }}>User Picture List</Text>
      <FlatList 
        data={pics}
        renderItem={({item}) => 
          <View style={{ flexDirection: "row", margin: 1}}>
            <Image style={{width: 70, height: 80}} source={{ uri: `data:image/jpg;base64,${item.photograph}` }}/>
            <View style={{margin: 2 , width: "47%" }}>
              <Text style={{fontWeight: "bold", }}>{item.name} </Text>
              <Text>{item.description}</Text>
            </View>
            <Button title={`View\nPic`} onPress={() => {
              navigation.navigate('View Picture', {item})}
            }/>
          </View>
        }
      />
      <View style={{ margin: 30 }}>
        <Button title='Back' onPress={() => navigation.goBack()} />
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
