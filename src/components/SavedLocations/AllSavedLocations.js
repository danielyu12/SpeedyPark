import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import SavedLocations from '../../../assets/SavedLocations.json';
import Ionicons from 'react-native-vector-icons/Ionicons';
import properCasing from '../../../scripts/ProperCasing';
import { Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { TabActions } from '@react-navigation/native';

const AllSavedLocations = (props) => {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <FlatList
      data={SavedLocations}
      renderItem={({ item }) => {
        return (
          <View style={Styles.locationContainer}>
            <Text style={Styles.streetTitle}>
              {properCasing(item.BLK_NO)
                .replace('Bu ', 'BU ')
                .replace(/[0-9]/g, '')
                .trim()}{' '}
              and{' '}
              {properCasing(item.STREET)
                .replace('Bu ', 'BU ')
                .replace(/[0-9]/g)
                .trim()}
            </Text>
            <Pressable
              style={Styles.startButton}
              onPress={() => {
                const jumpToAction = TabActions.jumpTo('Map', {
                  block: item.BLK_NO,
                  street: item.STREET,
                });
                props.navigation.dispatch(jumpToAction);
              }}
            >
              <Ionicons
                name="md-navigate-outline"
                size={20}
                color="white"
                style={{ marginLeft: 5 }}
              />
              <Text style={Styles.startButtonText}>Start</Text>
            </Pressable>
          </View>
        );
      }}
      keyExtractor={(item) => {
        return `${item.BLK_NO}, ${item.STREET}`;
      }}
    />
  );
};

const Styles = StyleSheet.create({
  locationContainer: { marginBottom: 25 },
  startButton: {
    marginTop: 5,
    padding: 7,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1B7ACF',
    backgroundColor: '#1B7ACF',
    width: '25%',
    alignItems: 'center',
    shadowColor: '#00000040',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  startButtonText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    marginLeft: '10%',
    color: 'white',
  },
  streetTitle: {
    fontSize: 18,
  },
});

export default AllSavedLocations;
