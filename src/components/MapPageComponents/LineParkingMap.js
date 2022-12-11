import { Text } from 'react-native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, StatusBar } from 'react-native';
import spotNumbers from '../../../scripts/CreateStreetSpotNumberObject.js';
import { Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import DetermineColor from '../../../scripts/DetermineColor';

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
        provider="google"
        style={styles.map}
        region={props.region}
        showsUserLocation={true}
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
                <>
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
                  {props.showMarkers && (
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
                          {spotNumbers[street][block]['quantity']}
                        </Text>
                        <Text style={styles.customMarkerText}>
                          total spots available
                        </Text>
                      </View>
                    </Marker>
                  )}
                </>
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
    padding: 5,
    borderRadius: 10,
    width: 150,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  customMarkerQuantityText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    color: 'white',
  },
  customMarkerText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: 'white',
  },
});
