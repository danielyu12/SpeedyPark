fs = require('fs')

let days = {
    "Sunday": 0,
    "Monday": 0,
    "Tuesday": 0,
    "Wednesday": 0,
    "Thursday": 0,
    "Friday": 0,
    "Saturday": 0,
}

let multiplied = {
    833: JSON.parse(JSON.stringify(days)),
    837: JSON.parse(JSON.stringify(days)),
    839: JSON.parse(JSON.stringify(days)),
    842: JSON.parse(JSON.stringify(days)),
    848: JSON.parse(JSON.stringify(days)),
    852: JSON.parse(JSON.stringify(days)),
    853: JSON.parse(JSON.stringify(days)),
    856: JSON.parse(JSON.stringify(days)),
    857: JSON.parse(JSON.stringify(days)),
    858: JSON.parse(JSON.stringify(days))
};

try {
    const readLogs = fs.readFileSync('./ParkBostonFiltered.json');
    const data = JSON.parse(readLogs);
    for (const zone of Object.keys(data)){
        for (const day of Object.keys(data[zone]["data"])){
            multiplied[zone][day] = data[zone]["data"][day]["averageTurnoverDay"] * data[zone]["data"][day]["averageDuration"]
        }
    }
} catch(err) {
    console.log(err)
    return
}

let maximum = 0
for (const zone of Object.keys(multiplied))
    for (const day of Object.keys(multiplied[zone]))
        if (multiplied[zone][day] > maximum)
            maximum = multiplied[zone][day]


for (const zone of Object.keys(multiplied))
    for (const day of Object.keys(multiplied[zone]))
        multiplied[zone][day] = ((1 - (multiplied[zone][day] / maximum)) * 100).toFixed(3)

const writeString = JSON.stringify(multiplied)
fs.writeFileSync('./ParkingPercentages.json', writeString)