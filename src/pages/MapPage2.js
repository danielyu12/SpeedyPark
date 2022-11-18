import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import MapContainer from '../components/MapContainer';

const MapPage = () => (
  <SafeAreaView style={styles.container}>
    <MapContainer />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapPage;
