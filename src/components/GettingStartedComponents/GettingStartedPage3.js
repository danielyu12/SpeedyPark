import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import ScreenShot from '../../../assets/GettingStartedPage3Image.png';

const GettingStartedPage3 = ({ getStarted }) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { marginBottom: '5%' }]}>
        Click on the parking blocks for more information and save your locations!
      </Text>
      <Image style={styles.image} source={ScreenShot} />
      <Pressable
        style={styles.button}
        onPress={() => {
          getStarted();
        }}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    padding: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  image: {
    width: '110%',
    height: '60%',
    borderRadius: 15,
    marginBottom: '20%',
  },
  button: {
    width: '90%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
    shadowColor: '#00000040',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  buttonText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,

    color: '#3A6EAF',
  },
});

export default GettingStartedPage3;
