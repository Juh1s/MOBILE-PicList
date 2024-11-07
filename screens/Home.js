import { StyleSheet, FlatList, Text, View } from 'react-native';

export default function Home() {

    const pictureList = []; // setup to contain pictures and their info as a list

    return (
    <View style={styles.container}>
      <Text>Picture List</Text>
      <FlatList 
        data={pictureList}
        renderItem={({item}) =>
          <View style={{ flexDirection: "row"}}>
            <View>
            </View>
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
