const ParkingSpots = require('../assets/StreetParking.json');

let spots = {};
ParkingSpots.forEach(({ STREET, BLK_NO }) => {
  if (STREET in spots) {
    if (BLK_NO in spots[STREET]) {
      spots[STREET][BLK_NO] += 1;
    } else {
      spots[STREET][BLK_NO] = 1;
    }
  } else {
    spots[STREET] = {};
    spots[STREET][BLK_NO] = 1;
  }
});

export default spots;
