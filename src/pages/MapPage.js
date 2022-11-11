import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import TurnOverMap from '../components/TurnOverMap';

const MapPage = () => (
  <SafeAreaView style={styles.container}>
    <TurnOverMap />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapPage;
