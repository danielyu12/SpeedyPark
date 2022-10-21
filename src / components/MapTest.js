import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import spots from '../../assets/StreetParking.json';
import ball from '../../assets/ball.png';

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude: 42.347,
          longitude: -71.125,
          latitudeDelta: 0.007,
          longitudeDelta: 0.036,
        }}
      >
        {spots.map((spot, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: spot.LATITUDE,
                longitude: spot.LONGITUDE,
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
