const ParkingPercentages = require('../assets/ParkingPercentages.json');

const today = new Date().getDay();
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function color(zone) {
  const percentage = parseFloat(ParkingPercentages[zone][days[today]]);
  if (percentage < 33) {
    return '#DD2222';
  } else if (percentage >= 33 && percentage < 66) {
    return 'orange';
  } else {
    return '#1AA51A';
  }
}

export function calculatePercentage(zone) {
  return parseFloat(ParkingPercentages[zone][days[today]]);
}
