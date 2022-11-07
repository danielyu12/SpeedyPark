import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import LineParkingMap from '../components/LineParkingMap';
import SpotInformationBottomSheet from '../components/SpotInformationBottomSheet';

const MapPage = () => {
  const [streetClicked, setStreetClicked] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState({});

  const onStreetClick = (street, block, numberOfSpots, rate) => {
    setStreetClicked(true);
    setSelectedStreet({
      street: street,
      block: block,
      numberOfSpots: numberOfSpots,
      payRate: rate,
    });
  };

  const onSheetClose = () => {
    setStreetClicked(false);
    setSelectedStreet({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <LineParkingMap onStreetClick={onStreetClick} />
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
  },
});

export default MapPage;
