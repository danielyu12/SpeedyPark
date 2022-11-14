import React from 'react';
import { View, StyleSheet} from 'react-native';
import AddressInput from './AddressInput';
import MapView from './MapView';
import { getLocation, geocodeLocationByName } from './LocationService';

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

class MapContainer extends React.Component {
    state = {
        region: {}
    };

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                console.log(data);
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
            }
        );
    }

    getCoordsFromName(loc) {
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
        });
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <AddressInput notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>

                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1 }}>
                            <MapView
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                        </View> : null}
            </View>
            // <View style={styles.container}>
            //     <AddressInput notifyChange={(loc) => this.getCoordsFromName(loc)}
            //     />
            //     {
            //          this.state.region['latitude'] ?
            //             <View style={styles.container}>
            //                  <MapView
            //                      region={this.state.region}
            //                      onRegionChange={(reg) => this.onMapRegionChange(reg)} />
            //             </View> : null}
            // </View>
        );
    }
}

export default MapContainer;