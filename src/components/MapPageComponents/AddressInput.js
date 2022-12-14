import React from 'react';
import { useFonts } from 'expo-font';
import { View, StyleSheet, Pressable } from 'react-native';
import { Inter_700Bold } from '@expo-google-fonts/inter';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function AddressInput(props) {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        styles={{
          container: { width: '95%' },
          textInput: {
            height: 50,
            borderRadius: 10,
            fontFamily: 'Inter_400Regular',
            shadowColor: '#00000040',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
          },
          listView: {
            borderRadius: 5,
            fontFamily: 'Inter_400Regular',
            borderRadius: 10,
          },
        }}
        disableScroll={true}
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          props.onLocationSearch(details.geometry.location);
        }}
        query={{
          key: 'AIzaSyA63jcm3MqAYUSotScUL2hw-AFE6n1mWrc',
          language: 'en',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={300}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 75,
  },
});
export default AddressInput;
