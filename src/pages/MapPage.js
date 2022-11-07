import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AllSpotsMap from '../components/AllSpotsMap';

const MapPage = () => (
  <SafeAreaView style={styles.container}>
    <AllSpotsMap />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapPage;
