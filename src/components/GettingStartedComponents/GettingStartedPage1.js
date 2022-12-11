import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter';

const GettingStartedPage1 = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { marginBottom: '5%' }]}>
        Welcome to SpeedyPark!
      </Text>
      <Text style={styles.text}>
        An application to help you find parking in the Boston area!
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

export default GettingStartedPage1;
