import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import CloseButton from './CloseButton';
import CircularProgress from 'react-native-circular-progress-indicator';
import ProperCasing from '../../scripts/ProperCasing.js';
import DetermineColor, {
  calculatePercentage,
} from '../../scripts/DetermineColor';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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

  var startPayTime = props.currentStreet.payRate
    .split(' ')[0]
    .split('-')[0]
    .replace('AM', '')
    .concat(':00');
  var endPayTime = props.currentStreet.payRate
    .split(' ')[0]
    .split('-')[1]
    .replace('PM', '')
    .concat(':00');

  const currentDate = new Date();

  const startDate = new Date(currentDate.getTime());
  startDate.setHours(startPayTime.split(':')[0]);
  startDate.setMinutes(startPayTime.split(':')[1]);
  startDate.setSeconds(startPayTime.split(':')[2]);

  const endDate = new Date(currentDate.getTime());
  endDate.setHours(endPayTime.split(':')[0]);
  endDate.setMinutes(endPayTime.split(':')[1]);
  endDate.setSeconds(endPayTime.split(':')[2]);

  const paidParking = startDate < currentDate && endDate > currentDate;

  const parkingTime = props.currentStreet.payRate.split(' ');

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
      <BottomSheetScrollView style={styles.sheetContainer} bounces={true}>
        <CloseButton
          style={styles.closeButton}
          color={'#D9D9D9'}
          onPress={props.onSheetClose}
        />
        <Text style={styles.streetTitleText}>
          {ProperCasing(props.currentStreet.street)
            .replace('Bu ', 'BU ')
            .replace(/[0-9]/g, '')}{' '}
          and{' '}
          {ProperCasing(props.currentStreet.block)
            .replace('Bu ', 'BU ')
            .replace(/[0-9]/g, '')}
        </Text>
        <View style={styles.parkingSpotsContainer}>
          <Text style={styles.parkingSpotsIcon}>P</Text>
          <Text style={styles.parkingSpotsText}>
            There are {props.currentStreet.numberOfSpots} Spots on this street
          </Text>
        </View>
        {paidParking && (
          <View style={styles.freeParkingContainer}>
            <Text style={styles.freeParkingText}>
              This spot is currently free
            </Text>
          </View>
        )}
        <View style={styles.spotChanceContainer}>
          <CircularProgress
            value={
              props.currentStreet.zone
                ? Math.round(calculatePercentage(props.currentStreet.zone))
                : 100
            }
            duration={750}
            radius={110}
            valueSuffix={'%'}
            progressValueColor={
              props.currentStreet.zone
                ? DetermineColor(props.currentStreet.zone)
                : 'black'
            }
            inActiveStrokeColor={'#D9D9D9'}
            inActiveStrokeWidth={30}
            activeStrokeColor={
              props.currentStreet.zone
                ? DetermineColor(props.currentStreet.zone)
                : 'blue'
            }
            activeStrokeWidth={30}
          />
          <Text style={styles.progressBarText}>
            chance of finding a spot here for a typical {days[new Date().getDay()]}
          </Text>
        </View>
        <View style={styles.pricesContainer}>
          <Text style={styles.pricesTitle}>Prices</Text>
          <Text style={styles.pricesText}>
            {parkingTime[1]} {parkingTime[0]}
          </Text>
          <Text style={styles.pricesText}>
            Maximum Stay: {parseInt(parkingTime[3]) / 60} hours
          </Text>
          <Text style={styles.pricesText}>
            1 Hour: ${parseFloat(parkingTime[2].replace('$', '')) * 10}
          </Text>
          <Text style={styles.pricesText}>Free outside these hours</Text>
          <Text style={styles.pricesText}>No Restrictions</Text>
          <View style={{ height: 50 }} />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 0,
  },
  sheetContainer: {
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    backgroundColor: '#fff',
    padding: 35,
  },
  streetTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Inter_700Bold',
    flexWrap: 'wrap',
    width: '80%',
  },
  parkingSpotsIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  parkingSpotsText: {
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
    marginLeft: 10,
  },
  parkingSpotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  freeParkingContainer: {
    justifyContent: 'center',
    marginBottom: 30,
  },
  freeParkingText: {
    color: '#53B218',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  progressBarText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  spotChanceContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: 'black',
  },
  pricesText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: 'black',
    marginTop: 10,
  },
});

export default SpotInformationBottomSheet;
