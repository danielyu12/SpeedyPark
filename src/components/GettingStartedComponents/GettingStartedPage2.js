import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import ScreenShot from '../../../assets/GettingStartedPage2Image.png';

const GettingStartedPage2 = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { marginBottom: '5%' }]}>
        Use the searchbar to look up your next destination and learn the
        likeliness that you’ll find street parking
      </Text>
      <Image style={styles.image} source={ScreenShot} />
      <Text style={styles.text}>
        Green means very likely, orange is somewhat likely, and red means you
        might want to look at other forms of transportation
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    padding: '10%',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  image: {
    width: '90%',
    height: '50%',
    borderRadius: 15,
    marginBottom: '5%',
  },
});

export default GettingStartedPage2;
