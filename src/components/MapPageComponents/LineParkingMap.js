import { Text } from 'react-native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, StatusBar } from 'react-native';
import spotNumbers from '../../../scripts/CreateStreetSpotNumberObject.js';
import { Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import DetermineColor, {
  calculatePercentage,
} from '../../../scripts/DetermineColor';
import React from 'react';

export default function Map(props) {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={props.region}
        showsUserLocation={true}
        customMapStyle={[
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
        ]}
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
                <React.Fragment key={`${street}, ${block}`}>
                  <Polyline
                    strokeWidth={7}
                    strokeColor={
                      spotNumbers[street][block]['zone']
                        ? DetermineColor(spotNumbers[street][block]['zone'])
                        : 'gray'
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
                  {props.showMarkers && spotNumbers[street][block]['zone'] && (
                    <Marker
                      coordinate={spotNumbers[street][block]['coordinates'][0]}
                    >
                      <View
                        style={[
                          styles.customMarker,
                          {
                            backgroundColor: spotNumbers[street][block]['zone']
                              ? DetermineColor(
                                  spotNumbers[street][block]['zone']
                                )
                              : 'gray',
                          },
                        ]}
                      >
                        <Text style={styles.customMarkerQuantityText}>
                          {Math.round(
                            calculatePercentage(
                              spotNumbers[street][block]['zone']
                            )
                          )}
                        </Text>
                        <Text style={styles.customMarkerPercentageText}>%</Text>
                      </View>
                    </Marker>
                  )}
                </React.Fragment>
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
  customMarker: {
    flexDirection: 'row',
    padding: 7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMarkerQuantityText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    color: 'white',
  },
  customMarkerPercentageText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    marginTop: '10%',
    color: 'white',
  },
});
