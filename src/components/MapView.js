import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import spots from '../../assets/StreetParking.json';
import spotnumbers from '../../scripts/CreateStreetSpotNumberObject.js';
import transactions from '../../assets/ParkBostonV1.json';
import transactionsList from '../../scripts/CreateTransactionZoneObject.js';
import turnovers from '../../assets/ParkBostonFiltered.json';
import { std } from 'mathjs';

var number2 = {};
var displaynumber2 = {};
var displayTurnover = {};
let turnoverStats = {
  set: [],
  sum: 0,
  average: 0,
  standardDev: 0,
};

const zoneArr = [
  { Zone: 833, Longitude: -71.11346661, Latitude: 42.35070267, Spots: 18 },
  { Zone: 837, Longitude: -71.11323561, Latitude: 42.35101667, Spots: 58 },
  { Zone: 839, Longitude: -71.11676461, Latitude: 42.35138967, Spots: 27 },
  { Zone: 842, Longitude: -71.11921261, Latitude: 42.35184967, Spots: 15 },
  { Zone: 848, Longitude: -71.12223661, Latitude: 42.35201967, Spots: 20 },
  { Zone: 852, Longitude: -71.12296661, Latitude: 42.35143767, Spots: 11 },
  { Zone: 853, Longitude: -71.12185561, Latitude: 42.35170267, Spots: 11 },
  { Zone: 856, Longitude: -71.11709061, Latitude: 42.35113667, Spots: 21 },
  { Zone: 857, Longitude: -71.11535561, Latitude: 42.35093067, Spots: 6 },
  { Zone: 858, Longitude: -71.11431361, Latitude: 42.35078867, Spots: 9 },
];

function parseTransaction() {
  transactions.map((transaction, index) => {
    number2[transaction.Zone] = transactionsList[transaction.Zone].toString();
    displaynumber2[transaction.Zone] =
      number2[transaction.Zone] + ' transactions here in 2022.';
  });
}

function parseTurnovers() {
  for (const [zone, values] of Object.entries(turnovers)) {
    displayTurnover[zone] = {};
    for (const day of Object.keys(values['data'])) {
      const turnover = values['data'][day]['averageTurnoverDay'];
      displayTurnover[zone][day] = turnover.toFixed(3);
      if (turnover != 0) {
        turnoverStats.set.push(turnover);
        turnoverStats.sum += turnover;
      }
    }
  }
  turnoverStats.average = turnoverStats.sum / turnoverStats.set.length;
  turnoverStats.standardDev = std(turnoverStats.set);
  console.log(turnoverStats.average);
}

// function parseTurnovers() {
//   turnovers.map((zone, index) => {
//     displayTurnover[0] = 'Sunday turnover: ' + zone.data.Sunday.averageTurnoverDay +
//                             '\n Monday turnover: ' + zone.data.Monday.averageTurnoverDay +
//                             '\n Tuesday turnover: ' + zone.data.Tuesday.averageTurnoverDay +
//                             '\n Wednesday turnover: ' + zone.data.Wednesday.averageTurnoverDay +
//                             '\n Thursday turnover: ' + zone.data.Thursday.averageTurnoverDay +
//                             '\n Friday turnover: ' + zone.data.Friday.averageTurnoverDay +
//                             '\n Saturday turnover: ' + zone.data.Saturday.averageTurnoverDay;
//   })
// }

export default function TurnOverMap(props) {
  parseTransaction();
  parseTurnovers();

  const [dateInput, setDateInput] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.button}
        placeholder="mm/dd/yyyy"
        onSubmitEditing={(value) => setDateInput(value.nativeEvent.text)}
      />
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude: 42.35,
          longitude: -71.106,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}
        region={props.region}
        showsUserLocation={true}
        onRegionChange={(reg) => props.onRegionChange(reg)}
      >
        <Marker coordinate={props.region} />
        {/* {spots.map((spot, index) => {
          const number =
            spotnumbers[spot.STREET][spot.BLK_NO]['quantity'].toString();
          const displaynumber =
            number +
            ' potential spots on ' +
            spot.STREET +
            ' near ' +
            spot.BLK_NO;
          return (
            <Marker
              description={displaynumber}
              key={index}
              coordinate={{
                latitude: spot.LATITUDE,
                longitude: spot.LONGITUDE,
              }}
            />
          );
        })} */}

        {zoneArr.map((zone, index) => {
          const displaynumber = zone['Spots'] + ' spots on ' + zone['Zone'];
          let date = new Date();
          if (dateInput) {
            const parts = dateInput.split('/');
            date = new Date(parts[2], parts[0] - 1, parts[1]);
            console.log(date);
          }
          const dayMap = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
          };
          const dayOfWeek = dayMap[date.getDay()];
          const turnover = displayTurnover[zone['Zone']][dayOfWeek];
          const turnoverString = `${dayOfWeek} Turnover: ${turnover}`;
          const lowBound = turnoverStats.average - turnoverStats.standardDev;
          const upBound = turnoverStats.average + turnoverStats.standardDev;
          let color = '#0000FF';
          if (turnover <= lowBound) color = '#FF0000';
          else if (turnover >= upBound) color = '#00FF00';
          else color = '#0000FF';
          return (
            <Marker
              description={turnoverString}
              key={index}
              coordinate={{
                latitude: zone['Latitude'],
                longitude: zone['Longitude'],
              }}
              pinColor={color}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 100,
    padding: 5,
    backgroundColor: '#D9D9D9',
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: '10%',
  },
});
