const ParkingSpots = require('../assets/StreetParking.json');

let spotNumbers = {};
ParkingSpots.forEach(({ STREET, BLK_NO, LATITUDE, LONGITUDE }) => {
  if (STREET in spotNumbers) {
    if (BLK_NO in spotNumbers[STREET]) {
      spotNumbers[STREET][BLK_NO]['quantity'] += 1;
      spotNumbers[STREET][BLK_NO]['coordinates'] = [
        ...spotNumbers[STREET][BLK_NO]['coordinates'],
        { latitude: LATITUDE, longitude: LONGITUDE },
      ];
    } else {
      spotNumbers[STREET][BLK_NO] = {};
      spotNumbers[STREET][BLK_NO]['quantity'] = 1;
      spotNumbers[STREET][BLK_NO]['coordinates'] = [
        { latitude: LATITUDE, longitude: LONGITUDE },
      ];
    }
  } else {
    spotNumbers[STREET] = {};
    spotNumbers[STREET][BLK_NO] = {};
    spotNumbers[STREET][BLK_NO]['quantity'] = 1;
    spotNumbers[STREET][BLK_NO]['coordinates'] = [
      { latitude: LATITUDE, longitude: LONGITUDE },
    ];
  }
});
export default spotNumbers;
