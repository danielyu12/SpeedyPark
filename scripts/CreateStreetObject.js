const ParkingSpots = require('../assets/StreetParking.json');

let spots = {};
let spotList = [];
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
for (const street in spots) {
  let stringArr = [];
  let streetObject = {};
  streetObject.title = street;
  for (const spotCount in spots[street]) {
    stringArr.push(spotCount + ': ' + spots[street][spotCount]);
  }
  streetObject.data = stringArr;
  spotList.push(streetObject);
}
export default spotList;
