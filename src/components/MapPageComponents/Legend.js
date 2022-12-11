import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_500Medium } from '@expo-google-fonts/inter';

const Legend = () => {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.chanceContainer, { backgroundColor: 'green' }]}>
        <Text style={styles.chanceText}>Very Likely</Text>
      </View>
      <View style={[styles.chanceContainer, { backgroundColor: 'orange' }]}>
        <Text style={styles.chanceText}>Somewhat Likely</Text>
      </View>
      <View style={[styles.chanceContainer, { backgroundColor: 'red' }]}>
        <Text style={styles.chanceText}>Not Likely</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '35%',
    height: '20%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '2%',
    right: '4%',
    borderRadius: 7,
    alignItems: 'center',
  },
  chanceContainer: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: '3%',
  },
  chanceText: { color: 'white', fontFamily: 'Inter_500Medium' },
});

export default Legend;
