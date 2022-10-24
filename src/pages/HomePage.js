import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hi</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('Map');
        }}
      >
        <Text style={styles.buttonText}>
          Press me to go to the map of all spots!
        </Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('Map1');
        }}
      >
        <Text style={styles.buttonText}>
          Press me to go to the map of street parking numbers!
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    padding: 4,
    backgroundColor: 'black',
  },
  buttonText: { color: 'white' },
});
export default HomePage;
