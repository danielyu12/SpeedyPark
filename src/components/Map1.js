import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import spotNumbers from '../../scripts/CreateStreetSpotNumberObject1.js';

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude: 42.35,
          longitude: -71.106,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}
      >
        {/* {spots.map((spot, index) => {
          const number = spotnumbers[spot.STREET][spot.BLK_NO].toString();
          const displaynumber =
            number +
            ' potential spots on ' +
            spot.STREET +
            ' near ' +
            spot.BLK_NO;
          return (
            <Marker
              description={displaynumber}
              key={index}
              coordinate={{
                latitude: spot.LATITUDE,
                longitude: spot.LONGITUDE,
              }}
            />
          );
        })} */}
        {Object.keys(spotNumbers).map((street) => {
          return Object.keys(spotNumbers[street]).map((block) => {
            const number = spotNumbers[street][block]['quantity'].toString();
            const displaynumber =
              number + ' potential spots on ' + street + ' near ' + block;
            return (
              <Marker
                description={displaynumber}
                coordinate={{
                  latitude: spotNumbers[street][block]['location']['lat'],
                  longitude: spotNumbers[street][block]['location']['lng'],
                }}
              />
            );
          });
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
    width: '100%',
    height: '100%',
  },
});
