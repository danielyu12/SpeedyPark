import * as React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import spotNumbers from '../../scripts/CreateStreetSpotNumberObject.js';

export default function Map(props) {
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
        {Object.keys(spotNumbers).map((street) => {
          return Object.keys(spotNumbers[street]).map((block) => {
            const number = spotNumbers[street][block]['quantity'].toString();
            const displaynumber =
              number + ' potential spots on ' + street + ' near ' + block;
            return (
              <Polyline
                key={`${street}, ${block}`}
                strokeWidth={4}
                strokeColor={'blue'}
                coordinates={spotNumbers[street][block]['coordinates']}
                tappable={true}
                onPress={() => {
                  props.onStreetClick(
                    street,
                    block,
                    number,
                    spotNumbers[street][block]['rate']
                  );
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
