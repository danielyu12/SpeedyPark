import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_700Bold } from '@expo-google-fonts/inter';
const HomePage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <View>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>
        <Text style={styles.titleText}>SpeedyPark</Text>
      </View>
      <View style={styles.buttonContainer}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  titleText: { marginTop: 30, fontFamily: 'Inter_700Bold', fontSize: 40 },
  logo: {},
  titleContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 3,
    padding: 5,
    backgroundColor: '#D9D9D9',
    width: '70%',
    height: '20%',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: '10%',
  },
  buttonText: { color: 'black' },
});
export default HomePage;
