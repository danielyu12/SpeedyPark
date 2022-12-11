import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter';

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
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
  },
});

export default GettingStartedPage2;
