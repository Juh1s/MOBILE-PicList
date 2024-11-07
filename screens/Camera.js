import { StyleSheet, Text, View, Button } from 'react-native';

export default function Camera() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Camera goes here.</Text>
      <Button
        title='Take Pic'
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
