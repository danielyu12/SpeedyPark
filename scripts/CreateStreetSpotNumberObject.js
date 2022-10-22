const ParkingSpots = require('../assets/StreetParking.json');

let spotnumbers = {};
ParkingSpots.forEach(({ STREET, BLK_NO }) => {
  if (STREET in spotnumbers) {
    if (BLK_NO in spotnumbers[STREET]) {
      spotnumbers[STREET][BLK_NO] += 1;
    } else {
      spotnumbers[STREET][BLK_NO] = 1;
    }
  } else {
    spotnumbers[STREET] = {};
    spotnumbers[STREET][BLK_NO] = 1;
  }
});
export default spotnumbers;