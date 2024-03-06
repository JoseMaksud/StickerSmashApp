import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './src/components/ImageViewer';
import Button from './src/components/Button';
import * as ImagePicker from 'expo-image-picker';

const PlaceHolderImage = require('./assets/images/background-image.png')

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeHolderImageSource={PlaceHolderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Escolher foto" theme="primary" />
        <Button label="Usar esta foto" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 /3,
    alignItems: 'center',
  }
});
