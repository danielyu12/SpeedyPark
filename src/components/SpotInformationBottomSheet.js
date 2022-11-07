import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import CloseButton from './CloseButton';

const SpotInformationBottomSheet = (props) => {
  const sheetRef = useRef(null);
  const snapPoints = ['80%'];
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const BottomSheetBackground = ({ style }) => {
    return (
      <View
        style={[
          {
            backgroundColor: 'white',
            borderRadius: 55,
          },
          { ...style },
        ]}
      />
    );
  };
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      handleComponent={null}
      backgroundComponent={(props) => <BottomSheetBackground {...props} />}
    >
      <View style={styles.sheetContainer}>
        <CloseButton
          style={styles.closeButton}
          color={'black'}
          onPress={props.onSheetClose}
        />
        <Text style={styles.streetTitle}>
          {props.currentStreet.street} near {props.currentStreet.block}
        </Text>
        <View style={styles.parkingSpotsContainer}>
          <Text style={styles.parkingSpotsIcon}>P</Text>
          <Text style={styles.parkingSpotsText}>
            There are {props.currentStreet.numberOfSpots} Spots on this street
          </Text>
        </View>
        <View style={styles.spotChanceContainer}>
          <Text style={styles.spotChancePercentage}>73%</Text>
          <Text style={styles.spotChanceText}>
            chance you will find parking on this street at this time
          </Text>
        </View>
        <View style={styles.pricesContainer}>
          <Text style={styles.pricesTitle}>Prices</Text>
          <Text style={styles.pricesText}>{props.currentStreet.payRate}</Text>
          <Text style={styles.pricesText}>Maximum Stay: 4 hours</Text>
          <Text style={styles.pricesText}>1 Hour: $2.50</Text>
          <Text style={styles.pricesText}>Free outside these hours</Text>
          <Text style={styles.pricesText}>No Restrictions</Text>
        </View>
        <Text>Free Hours</Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  sheetContainer: {
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    backgroundColor: '#fff',
    padding: 35,
  },
  streetTitle: {
    width: '90%',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  parkingSpotsIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  parkingSpotsText: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    marginLeft: 10,
  },
  parkingSpotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  spotChanceContainer: {
    width: '100%',
    marginBottom: 15,
  },
  spotChancePercentage: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  spotChanceText: {
    fontSize: 20,
  },
  pricesContainer: {
    marginBottom: 15,
  },
  pricesTitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#1B7ACF',
  },
  pricesText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: 'black',
    marginTop: 10,
  },
});

export default SpotInformationBottomSheet;
