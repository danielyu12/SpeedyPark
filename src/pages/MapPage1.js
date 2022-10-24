import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Map1 from '../components/Map1';

const MapPage = () => (
  <SafeAreaView style={styles.container}>
    <Map1 />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapPage;
