import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import LineParkingMap from '../components/LineParkingMap';
import SpotInformationBottomSheet from '../components/BottomSheet/SpotInformationBottomSheet';
import AddressInput from '../components/AddressInput';
import spotNumbers from '../../scripts/CreateStreetSpotNumberObject';

const MapPage = (props) => {
  useEffect(() => {
    if (props.route.params) {
      setStreetClicked(true);
      setSelectedStreet({
        street: props.route.params.street,
        block: props.route.params.block,
        numberOfSpots:
          spotNumbers[props.route.params.street][props.route.params.block][
            'quantity'
          ],
        payRate:
          spotNumbers[props.route.params.street][props.route.params.block][
            'rate'
          ],
        zone: spotNumbers[props.route.params.street][props.route.params.block][
          'zone'
        ],
      });
      setRegion({
        latitude:
          spotNumbers[props.route.params.street][props.route.params.block][
            'coordinates'
          ][0]['latitude'],
        longitude:
          spotNumbers[props.route.params.street][props.route.params.block][
            'coordinates'
          ][0]['longitude'],
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      });
    }
  }, [props]);
  const [streetClicked, setStreetClicked] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState({});
  const [region, setRegion] = useState({
    latitude: 42.35,
    longitude: -71.106,
    latitudeDelta: 0.007,
    longitudeDelta: 0.007,
  });

  const onStreetClick = (street, block, numberOfSpots, rate, zone) => {
    setStreetClicked(true);
    setSelectedStreet({
      street: street,
      block: block,
      numberOfSpots: numberOfSpots,
      payRate: rate,
      zone: zone,
    });
  };

  const onLocationSearch = ({ lat, lng }) => {
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  };
  const onLocationChange = (region) => {
    setRegion(region);
  };

  const onSheetClose = () => {
    setStreetClicked(false);
    setSelectedStreet({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <LineParkingMap
        onStreetClick={onStreetClick}
        region={region}
        onRegionChange={onLocationChange}
      />
      <AddressInput onLocationSearch={onLocationSearch} />
      {streetClicked && (
        <SpotInformationBottomSheet
          onSheetClose={onSheetClose}
          currentStreet={selectedStreet}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default MapPage;
