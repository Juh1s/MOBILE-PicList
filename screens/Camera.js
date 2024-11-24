import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState, useRef, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';

const database = getDatabase(app);

export default function Camera() {
  
  const [photoName, setPhotoName] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture ] = useState({
    name: "",
    photograph: "",
  });
  const [ pics, setPics ] = useState([]);
  const [ keys, setKeys ] = useState([]);

  useEffect(() => {
    const picsRef = ref(database, '/pics');
    onValue(picsRef, (snapshot) => {
      const data = snapshot.val();
      if(data) {
        setPics(Object.values(data));
        setKeys(Object.keys(data));
      } else
        setPics([]);
    })
  }, []);
  
const handleSave = () => {
  if(picture.name && picture.photograph) {
    push(ref(database, '/pics'), picture);
  } else {
    Alert.alert("Warning", "Type value first");
  }
}

  const camera = useRef(null);

  const snap = async () => {
    if(camera) {
        const photo = await camera.current.takePictureAsync({base64: true});
        setPhotoName(photo.uri);
        setPhotoBase64(photo.base64);
    }
  }

  if (!permission) return<View/>;   // permission is loading

  if (!permission.granted) {    // permission is not given yet
    return(
        <View style={styles.container}>
            <Button onPress={requestPermission} title='Grant permission' />
        </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CameraView style={{flex: 1, minWidth: "100%"}} ref={camera} />
      <Button title='Take Photo' onPress={snap} />
      <View style={{ flex: 1 }}>
        {photoName && photoBase64 ? (
            <>
                <Image style={{ flex: 1 }} source={{uri:photoName}}/>
                <Image style={{ flex: 1 }} source={{uri:`data:image/jpg;base64,${photoBase64}`}}/>
            </>
        ) : (
            <Text>No photo taken yet</Text>
        )}
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
