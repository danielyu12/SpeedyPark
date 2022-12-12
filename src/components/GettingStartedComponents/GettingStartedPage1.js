import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_700Bold } from '@expo-google-fonts/inter';

const GettingStartedPage1 = () => {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { marginBottom: '50%' }]}>
        Street parking simplified!
      </Text>
      <Text style={[styles.text, { marginBottom: '5%' }]}>
        Swipe left to get started.
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
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
});

export default GettingStartedPage1;
