import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState, useRef } from 'react';

export default function Camera() {
  
  const [photoName, setPhotoName] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [permission, requestPermission] = useCameraPermissions();

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
      <Text style={{ fontSize: 20 }}>Camera goes here.</Text>
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
