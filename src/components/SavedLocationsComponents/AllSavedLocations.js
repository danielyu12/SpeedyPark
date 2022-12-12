import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import properCasing from '../../../scripts/ProperCasing';
import { Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { TabActions, useFocusEffect } from '@react-navigation/native';
import DetermineColor, {
  calculatePercentage,
} from '../../../scripts/DetermineColor';
import spotNumbers from '../../../scripts/CreateStreetSpotNumberObject';
import { savedLocationsCollection } from '../../../firebase-config';
import { getDocs } from 'firebase/firestore';

const AllSavedLocations = (props) => {
  const [saved, setSaved] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getDocs(savedLocationsCollection).then((res) => {
        const savedStreets = [];
        res.docs.forEach((item) => {
          savedStreets.push({ ...item.data() });
        });
        return setSaved(savedStreets);
      });
    }, [])
  );

  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FlatList
      data={saved}
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{ height: 2, width: '100%', backgroundColor: '#E9E9E9' }}
          />
        );
      }}
      renderItem={({ item }) => {
        const percentCircleColor = spotNumbers[item.STREET][item.BLK_NO]['zone']
          ? DetermineColor(spotNumbers[item.STREET][item.BLK_NO]['zone'])
          : 'black';
        return (
          <Pressable
            style={Styles.locationContainer}
            onPress={() => {
              const jumpToAction = TabActions.jumpTo('Map', {
                block: item.BLK_NO,
                street: item.STREET,
              });
              props.navigation.dispatch(jumpToAction);
            }}
          >
            <View
              style={[
                Styles.percentCircle,
                {
                  borderColor: percentCircleColor,
                },
              ]}
            >
              <Text
                style={[
                  Styles.percentCircleValue,
                  { color: percentCircleColor },
                ]}
              >
                {spotNumbers[item.STREET][item.BLK_NO]['zone']
                  ? Math.round(
                      calculatePercentage(
                        spotNumbers[item.STREET][item.BLK_NO]['zone']
                      )
                    )
                  : 'N/A'}
              </Text>
              <Text
                style={[
                  Styles.percentCircleSymbol,
                  { color: percentCircleColor },
                ]}
              >
                %
              </Text>
            </View>
            <Text style={Styles.streetTitle}>
              {properCasing(item.BLK_NO)
                .replace('Bu ', 'BU ')
                .replace(/[0-9]/g, '')
                .trim()}{' '}
              and{' '}
              {properCasing(item.STREET)
                .replace('Bu ', 'BU ')
                .replace(/[0-9]/g)
                .trim()}
            </Text>
            <SimpleLineIcons name="arrow-right" size={30} />
          </Pressable>
        );
      }}
      keyExtractor={(item) => {
        return `${item.BLK_NO}, ${item.STREET}`;
      }}
    />
  );
};

const Styles = StyleSheet.create({
  locationContainer: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streetTitle: {
    fontSize: 12,
  },
  percentCircle: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00000040',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    flexDirection: 'row',
  },
  percentCircleValue: {
    fontFamily: 'Inter_500Medium',
    fontSize: 25,
  },
  percentCircleSymbol: {
    marginTop: '10%',
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
  },
});

export default AllSavedLocations;
