import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import AllSavedLocations from '../components/SavedLocationsComponents/AllSavedLocations';

const SavedLocationPage = ({ navigation, onSavedSelect }) => {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.titleContainer}>
        <Text style={Styles.titleText}>Saved</Text>
      </View>
      <Text style={Styles.savedLocationTitle}>Saved Locations</Text>
      <View style={Styles.savedLocationsContainer}>
        <AllSavedLocations
          navigation={navigation}
          onSavedSelect={onSavedSelect}
        />
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Inter_300Light',
  },
  savedLocationTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    marginLeft: '6%',
    marginBottom: '5%',
  },
  savedLocationsContainer: {
    flex: 11,
    width: '100%',
  },
});

export default SavedLocationPage;
