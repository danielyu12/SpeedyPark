import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LineParkingMap from '../components/LineParkingMap';

const MapPage = () => (
  <SafeAreaView style={styles.container}>
    <LineParkingMap />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapPage;
