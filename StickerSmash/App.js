import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import ImageViewer from './src/components/ImageViewer';
import Button from './src/components/Button';
import CircleButton from './src/components/CircleButton';
import IconButton from './src/components/IconButton';
import * as ImagePicker from 'expo-image-picker';
import EmojiPicker from './src/components/EmojiPicker';
import EmojiList from './src/components/EmojiList';
import EmojiSticker from './src/components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import DomToImage from 'dom-to-image';

const PlaceHolderImage = require('./assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requisitPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();


  if (status === null) {
    requisitPermission();
  }

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS != 'web') {
      try {
        const localUrl = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUrl);
        if (localUrl) {
          alert('Imagem Salva!');
        }
      } catch (e) {
        console.log(e);
      };
    } else {
      try {
        const dataUrl = await DomToImage.toJpeg(imageRef.current, {
          quality: 0.95,
          widtht: 320,
          height: 440,
        });
        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
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
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeHolderImageSource={PlaceHolderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
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
      <StatusBar style="light" />
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
