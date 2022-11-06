import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import spots from '../../assets/StreetParking.json';
import spotnumbers from '../../scripts/CreateStreetSpotNumberObject.js';
import transactions from '../../assets/ParkBostonV1.json';
import transactionsList from '../../scripts/CreateTransactionZoneObject.js';
import turnovers from '../../assets/ParkBostonFiltered.json';

var number2 = {};
var displaynumber2 = {};
var displayTurnover = {};

function parseTransaction() {
  transactions.map((transaction, index) => {
    number2[transaction.Zone] = transactionsList[transaction.Zone].toString();
    displaynumber2[transaction.Zone] =
      number2[transaction.Zone] + ' transactions here in 2022.';
  });
}

function parseTurnovers() {
  turnovers.map((zone, index) => {
    displayTurnover[0] = 'Sunday turnover: ' + zone.data.Sunday.averageTurnoverDay +
                            '\n Monday turnover: ' + zone.data.Monday.averageTurnoverDay + 
                            '\n Tuesday turnover: ' + zone.data.Tuesday.averageTurnoverDay + 
                            '\n Wednesday turnover: ' + zone.data.Wednesday.averageTurnoverDay +
                            '\n Thursday turnover: ' + zone.data.Thursday.averageTurnoverDay +
                            '\n Friday turnover: ' + zone.data.Friday.averageTurnoverDay +
                            '\n Saturday turnover: ' + zone.data.Saturday.averageTurnoverDay;
  })
}

export default function Map() {
  parseTransaction();
  // parseTurnovers();

  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude: 42.35,
          longitude: -71.106,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}
      >
        {spots.map((spot, index) => {
          const number =
            spotnumbers[spot.STREET][spot.BLK_NO]['quantity'].toString();
          const displaynumber = number + ' spots on ' + spot.STREET + ' near ' + spot.BLK_NO;
          if (spot.X == -71.1134666081092 && spot.Y == 42.350702669858) {
            return (
              <Marker
                description={displaynumber + ' with ' + 'Sunday turnover: ' + String(turnovers[833].data.Sunday.averageTurnoverDay).slice(0,5) +
                ', Monday turnover: ' + String(turnovers[833].data.Monday.averageTurnoverDay).slice(0,5) + 
                ', Tuesday turnover: ' + String(turnovers[833].data.Tuesday.averageTurnoverDay).slice(0,5) + 
                ', Wednesday turnover: ' + String(turnovers[833].data.Wednesday.averageTurnoverDay).slice(0,5) +
                ', Thursday turnover: ' + String(turnovers[833].data.Thursday.averageTurnoverDay).slice(0,5) +
                ', Friday turnover: ' + String(turnovers[833].data.Friday.averageTurnoverDay).slice(0,5) +
                ', Saturday turnover: ' + String(turnovers[833].data.Saturday.averageTurnoverDay).slice(0,5)}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (spot.X == -71.1132356080516 && spot.Y == 42.351016669925) {
            return (
              <Marker
                description={displaynumber + ' with ' + 'Sunday turnover: ' + String(turnovers[837].data.Sunday.averageTurnoverDay).slice(0,5) +
                ', Monday turnover: ' + String(turnovers[837].data.Monday.averageTurnoverDay).slice(0,5) + 
                ', Tuesday turnover: ' + String(turnovers[837].data.Tuesday.averageTurnoverDay).slice(0,5) + 
                ', Wednesday turnover: ' + String(turnovers[837].data.Wednesday.averageTurnoverDay).slice(0,5) +
                ', Thursday turnover: ' + String(turnovers[837].data.Thursday.averageTurnoverDay).slice(0,5) +
                ', Friday turnover: ' + String(turnovers[837].data.Friday.averageTurnoverDay).slice(0,5) +
                ', Saturday turnover: ' + String(turnovers[837].data.Saturday.averageTurnoverDay).slice(0,5)}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (spot.X == -71.116764609232 && spot.Y == 42.3513896698829) {
            return (
              <Marker
                description={displaynumber + ' with ' + 'Sunday turnover: ' + String(turnovers[839].data.Sunday.averageTurnoverDay).slice(0,5) +
                ', Monday turnover: ' + String(turnovers[839].data.Monday.averageTurnoverDay).slice(0,5) + 
                ', Tuesday turnover: ' + String(turnovers[839].data.Tuesday.averageTurnoverDay).slice(0,5) + 
                ', Wednesday turnover: ' + String(turnovers[839].data.Wednesday.averageTurnoverDay).slice(0,5) +
                ', Thursday turnover: ' + String(turnovers[839].data.Thursday.averageTurnoverDay).slice(0,5) +
                ', Friday turnover: ' + String(turnovers[839].data.Friday.averageTurnoverDay).slice(0,5) +
                ', Saturday turnover: ' + String(turnovers[839].data.Saturday.averageTurnoverDay).slice(0,5)}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (spot.X == -71.1192126100624 && spot.Y == 42.351849669892) {
            return (
              <Marker
                description={displaynumber + ' with ' + displaynumber2[842]}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (spot.X == -71.122236611065 && spot.Y == 42.3520196698275) {
            return (
              <Marker
                description={displaynumber + ' with ' + displaynumber2[848]}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (
            spot.X == -71.1229666112709 &&
            spot.Y == 42.3514376696936
          ) {
            return (
              <Marker
                description={displaynumber + ' with ' + displaynumber2[852]}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (
            spot.X == -71.1218556109215 &&
            spot.Y == 42.3517026697795
          ) {
            return (
              <Marker
                description={displaynumber + ' with ' + displaynumber2[853]}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (
            spot.X == -71.1170906093242 &&
            spot.Y == 42.3511366698245
          ) {
            return (
              <Marker
                description={displaynumber + ' with ' + displaynumber2[856]}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (
            spot.X == -71.1153556087425 &&
            spot.Y == 42.3509306698408
          ) {
            return (
              <Marker
                description={displaynumber + ' with ' + displaynumber2[857]}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else if (
            spot.X == -71.1143136083924 &&
            spot.Y == 42.3507886698472
          ) {
            return (
              <Marker
                description={displaynumber + ' with ' + displaynumber2[858]}
                key={index}
                coordinate={{
                  latitude: spot.LATITUDE,
                  longitude: spot.LONGITUDE,
                }}
                pinColor="#0000ff"
              />
            );
          } else {
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
          }
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
});
