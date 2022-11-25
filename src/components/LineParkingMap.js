import * as React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, StatusBar } from 'react-native';
import spotNumbers from '../../scripts/CreateStreetSpotNumberObject.js';
import DetermineColor from '../../scripts/DetermineColor';

export default function Map(props) {
  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        region={props.region}
        onRegionChangeComplete={(newRegion) => {
          props.onRegionChange(newRegion);
        }}
      >
        {Object.keys(spotNumbers).map((street) => {
          return Object.keys(spotNumbers[street]).map((block) => {
            const number = spotNumbers[street][block]['quantity'].toString();
            const displaynumber =
              number + ' potential spots on ' + street + ' near ' + block;
            return (
              block !== 'BU BRIDGE 3' && (
                <Polyline
                  key={`${street}, ${block}`}
                  strokeWidth={7}
                  strokeColor={
                    spotNumbers[street][block]['zone']
                      ? DetermineColor(spotNumbers[street][block]['zone'])
                      : 'blue'
                  }
                  coordinates={spotNumbers[street][block]['coordinates']}
                  tappable={true}
                  onPress={() => {
                    props.onStreetClick(
                      street,
                      block,
                      number,
                      spotNumbers[street][block]['rate'],
                      spotNumbers[street][block]['zone']
                    );
                  }}
                />
              )
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
