const ParkingSpots = require('../assets/StreetParking.json');

let spotNumbers = {};
ParkingSpots.forEach(
  ({ STREET, BLK_NO, LATITUDE, LONGITUDE, PAY_POLICY, ZONE }) => {
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
        spotNumbers[STREET][BLK_NO]['rate'] = PAY_POLICY;
        spotNumbers[STREET][BLK_NO]['zone'] = ZONE;
      }
    } else {
      spotNumbers[STREET] = {};
      spotNumbers[STREET][BLK_NO] = {};
      spotNumbers[STREET][BLK_NO]['quantity'] = 1;
      spotNumbers[STREET][BLK_NO]['coordinates'] = [
        { latitude: LATITUDE, longitude: LONGITUDE },
      ];
      spotNumbers[STREET][BLK_NO]['rate'] = PAY_POLICY;
      spotNumbers[STREET][BLK_NO]['zone'] = ZONE;
    }
  }
);

export default spotNumbers;
