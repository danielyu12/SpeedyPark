import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import LineParkingMap from '../components/LineParkingMap';
import SpotInformationBottomSheet from '../components/SpotInformationBottomSheet';
import AddressInput from '../components/AddressInput';

const MapPage = () => {
  const [streetClicked, setStreetClicked] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState({});
  const [region, setRegion] = useState({
    latitude: 42.35,
    longitude: -71.106,
    latitudeDelta: 0.007,
    longitudeDelta: 0.007,
  });

  const onStreetClick = (street, block, numberOfSpots, rate) => {
    setStreetClicked(true);
    setSelectedStreet({
      street: street,
      block: block,
      numberOfSpots: numberOfSpots,
      payRate: rate,
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
