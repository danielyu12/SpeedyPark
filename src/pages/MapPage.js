import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Map from '../components/Map';

const MapPage = () => (
  <SafeAreaView style={styles.container}>
    <Map />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapPage;
