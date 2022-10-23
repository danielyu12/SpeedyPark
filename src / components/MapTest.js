import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import spots from '../../assets/StreetParking.json';
import spotnumbers from '../../scripts/CreateStreetSpotNumberObject.js';


export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude: 42.350,
          longitude: -71.106,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}
      >
        {spots.map((spot, index) => {
          const number = spotnumbers[spot.STREET][spot.BLK_NO].toString();
          const displaynumber = number + " potential spots on " + spot.STREET + " near " + spot.BLK_NO;
          return (
            <Marker
              description = {displaynumber}
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
