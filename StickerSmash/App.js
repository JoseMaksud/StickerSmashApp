import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './src/components/ImageViewer';
import Button from './src/components/Button';
import CircleButton from './src/components/CircleButton';
import IconButton from './src/components/IconButton';
import * as ImagePicker from 'expo-image-picker';
import EmojiPicker from './src/components/EmojiPicker';
import EmojiList from './src/components/EmojiList';
import EmojiSticker from './src/components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlaceHolderImage = require('./assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onSaveImageAsync = () => {
    //
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("Você não selecionou uma imagem");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer 
        placeHolderImageSource={PlaceHolderImage} 
        selectedImage={selectedImage}
        />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
        { showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
            <IconButton icon='refresh' label="Reiniciar" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label="Salvar" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
        <Button
          label="Escolher foto"
          theme="primary"
          onPress={pickImageAsync}
          />
        <Button 
        label="Usar esta foto" 
        onPress={() => setShowAppOptions(true)}
        />
      </View>
      )} 
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
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
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
