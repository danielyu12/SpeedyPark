const Transactions = require('../assets/ParkBostonV1.json');

let transactionList = {};
Transactions.forEach(({ Zone }) => {
  if (Zone in transactionList) {
    transactionList[Zone] += 1;
  } else {
    transactionList[Zone] = {};
    transactionList[Zone] = 1;
  }
});
export default transactionList;