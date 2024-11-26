import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState, useRef} from 'react';
import { app } from '../firebaseConfig';
import { getDatabase, ref, push } from 'firebase/database';

const database = getDatabase(app);

export default function Camera() {
  
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoAccept, setPhotoAccept] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture ] = useState({
    name: "",
    description: "",
    photograph: "",
  });

const savePicture = () => {
  if(picture.name && picture.photograph) {
    push(ref(database, 'pics/'), picture);
    discardPhoto();
  } else {
    Alert.alert("Warning", "Type value first");
  }
}

  const camera = useRef(null);

  const snap = async () => {
    if(camera) {
      try{
        const photo = await camera.current.takePictureAsync({base64: true});
        setPhotoName(photo);
        setPhotoBase64(photo.base64);
        setPhotoTaken(true);
      } catch(e) {
        console.log(e);
      }
    }
  }

  const discardPhoto = () => {
    setPhotoTaken(false);
    setPhotoAccept(false);
    setPicture({ name: "", photograph: "" })
    setPhotoName('');
    setPhotoBase64('');
  }
  const acceptPhoto = () => {
    setPhotoAccept(true);
    setPicture({ ...picture, photograph: photoName })
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
      <View style={{ flex: 1 , flexDirection: 'row' }}>
        { !photoAccept ? (
          <>
            <CameraView style={{flex: 1, maxWidth: "50%", height: "100%"}} ref={camera} />
            <Button title='Snap' style={{height: "10%"}} onPress={snap} />
          </>
        ) : (
          <>
            <TextInput
              style={{ marginBottom: 10 }}
              label="Name"
              mode="outlined"
              placeholder='Name'
              value={picture.name}
              onChangeText={text => setPicture({ ...picture, name: text })}
            />
            <TextInput
              style={{ marginBottom: 10 }}
              label="Description"
              mode="outlined"
              placeholder='Description'
              value={picture.description}
              onChangeText={text => setPicture({ ...picture, description: text })}
            />
          </>
        )}
      </View>
      <View style={{ flex: 1 , flexDirection: 'row' }}>
        {photoTaken ? (
            <>
              <Image style={styles.image} source={photoName}/>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between' }} >
                <Button color="#ff4500" title='Discard Photo' onPress={discardPhoto} />
                {!photoAccept ? (
                  <Button  title='Accept Photo'  onPress={acceptPhoto}/>
                ) : (
                  <Button color="#008000" title='Save Photo' onPress={savePicture} />
                )}
              </View>
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
  image: {
    flex: 3,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  }
});
