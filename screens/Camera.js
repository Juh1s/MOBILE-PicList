import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState, useRef} from 'react';
import { app } from '../firebaseConfig';
import { getDatabase, ref, push } from 'firebase/database';

const database = getDatabase(app);

export default function Camera() {
  
  // cameraMode switches between values 0, 1 & 2.
  // They represent the different modes of the screen layout.
  const [cameraMode, setCameraMode] = useState(0);
  const [photoBase64, setPhotoBase64] = useState('');
  const [permission, requestPermission] = useCameraPermissions();

  // Only 'name' and 'photograph' need to be filled, 'description' is optional.
  const [picture, setPicture ] = useState({   
    name: "",
    description: "",
    photograph: "",
  });

  const camera = useRef(null);

  // Takes the picture.
  const snap = async () => {
    if(camera) {
      try{
        const photo = await camera.current.takePictureAsync({base64: true});
        setPhotoBase64(photo.base64);
        setCameraMode(1);
      } catch(e) {
        console.log(e);
      }
    }
  }

  // Discards the photo that is currently held.
  const discardPhoto = () => {
    setPicture({ name: "", photograph: "" })
    setPhotoBase64('');
    setCameraMode(0);
  }

  // Accept photo and begin filling out the 'name' and 'description'.
  const acceptPhoto = () => {
    setPicture({ ...picture, photograph: photoBase64 })
    setCameraMode(2)
  }
  
  // Save the current picture to the database, empty the held photo and revert layout.
  const savePicture = () => {
    if(picture.name && picture.photograph) {
      push(ref(database, 'pics/'), picture);
      discardPhoto();
    } else {
      Alert.alert("Warning", "Type value first");
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
      <View style={{ flex: 1 , flexDirection: 'row' }}>
        { (cameraMode < 2) ? ( // cameraMode < 2
          <>
              <CameraView style={{flex: 1, maxWidth: "50%", height: "100%"}} ref={camera} />
              <Button title='Snap' style={{height: "10%"}} onPress={snap} />
          </>
        ) : ( // cameraMode == 2
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
        {(cameraMode > 0) ? (  // cameraMode > 0
            <>
                <Image style={styles.image} source={{uri: `data:image/jpg;base64,${photoBase64}`}} />
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}} >
                  <Button color="#ff4500" title='Discard Photo' onPress={discardPhoto} />
                  {(cameraMode == 1) ? ( // cameraMode == 1
                    <Button  title='Accept Photo'  onPress={acceptPhoto}/>
                  ) : ( // cameraMode == 2
                    <Button color="#008000" title='Save Photo' onPress={savePicture} />
                  )}
                </View>
            </>
        ) : ( // cameraMode = 0
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
