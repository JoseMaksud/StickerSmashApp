import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Button({ label }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => alert(`Você pressionou ${label}`)}
        >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})