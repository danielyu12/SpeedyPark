import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import CloseButton from './CloseButton';
import CircularProgress from 'react-native-circular-progress-indicator';
import ProperCasing from '../../../../scripts/ProperCasing.js';
import DetermineColor, {
  calculatePercentage,
} from '../../../../scripts/DetermineColor';
import { db } from '../../../../firebase-config';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

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
  useFocusEffect(
    React.useCallback(() => {
      const docRef = doc(
        db,
        'savedLocations',
        `${props.currentStreet.street}-${props.currentStreet.block}`
      );
      getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          setShowSaveButton(false);
        }
      });
    }, [])
  );

  const [showSaveButton, setShowSaveButton] = useState(true);
  const sheetRef = useRef(null);
  const snapPoints = ['82%'];
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  //Formatting the parking times and determining whether or not they need to pay for parking
  var setDateTime = function (date, str) {
    var sp = str.split(':');
    date.setHours(parseInt(sp[0], 10));
    date.setMinutes(parseInt(sp[1], 10));
    date.setSeconds(parseInt(sp[2], 10));
    return date;
  };

  const militaryTime = (time) => {
    if (time.indexOf('PM') != -1) {
      const oldHour = parseInt(time.split(':')[0]);
      const newHour = 12 + oldHour;
      return newHour.toString().concat(':').concat(time.split(':')[1]);
    }
    return time;
  };

  var current = new Date();

  var c = current.getTime(),
    start = setDateTime(
      new Date(current),
      militaryTime(props.currentStreet.payRate.split(' ')[0].split('-')[0])
        .replace('AM', '')
        .concat(':00')
    ),
    end = setDateTime(
      new Date(current),
      militaryTime(props.currentStreet.payRate.split(' ')[0].split('-')[1])
        .replace('PM', '')
        .concat(':00')
    );

  const paidParking = c > start.getTime() && c < end.getTime();

  const parkingTime = props.currentStreet.payRate.split(' ');

  //Adding custom border to the BottomSheet
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
        {!paidParking && (
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
                : 0
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
                : 'gray'
            }
            activeStrokeWidth={30}
          />
          <Text style={styles.progressBarText}>
            chance of finding a spot here for a typical{' '}
            {days[new Date().getDay()]}
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
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {showSaveButton ? (
            <Pressable
              style={styles.saveButton}
              onPress={() => {
                const newDoc = doc(
                  db,
                  'savedLocations',
                  `${props.currentStreet.street}-${props.currentStreet.block}`
                );
                setDoc(newDoc, {
                  BLK_NO: props.currentStreet.block,
                  STREET: props.currentStreet.street,
                }).then(() => {
                  alert('Location Saved');
                });
                setShowSaveButton(false);
              }}
            >
              <Text style={styles.saveButtonText}>Save Location</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.saveButton}
              onPress={() => {
                const docRef = doc(
                  db,
                  'savedLocations',
                  `${props.currentStreet.street}-${props.currentStreet.block}`
                );
                deleteDoc(docRef);
                setShowSaveButton(true);
              }}
            >
              <Text style={styles.saveButtonText}>Remove Location</Text>
            </Pressable>
          )}
        </View>

        <View style={{ height: 50 }} />
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
  saveButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B7ACF',
    borderColor: '#1B7ACF',
    borderWidth: 1,
    borderRadius: 22,
    padding: 10,
    shadowColor: '#00000040',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
  },
});

export default SpotInformationBottomSheet;
