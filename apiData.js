
const axios = require('axios');

// fetch('https://typeracerdata.com/api?username=sparkkk')
//   .then(response => response.json())
//   .then(data => {
//     const recentRaces = data.recent_races;
//     console.log(recentRaces);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// const url = `https://typeracerdata.com/api?username=sparkkk`;
//       const response = fetch(url)
//       .then(response => response.json())
//       .then(data=>{
//         const races = data.recent_races;
//         // console.log(races);

//         const today = new Date();
//       const last24hours = new Date(today - 24 * 60 * 60 * 1000); // subtract 24 hours from today
//      console.log(today )
//       })



// const url = `https://typeracerdata.com/api?username=sparkkk`;
//       const response = fetch(url)
//       .then(response => response.json())
//       .then(data =>{
//           const races = data.recent_races;
//           const today = new Date(); // Get the current date and time
// const last24hours = new Date(today - 24 * 60 * 60 * 1000); // Subtract 24 hours from the current date
// const todayRaces = races.filter((race) => new Date(race.time * 1000) > last24hours); // Filter races within the last 24 hours
// const highestWpmToday = Math.max(...todayRaces.map((race) => parseFloat(race.wpm))); // Find the highest WPM among the filtered races
// console.log(highestWpmToday);
//       }
//       )
// const username = 'sparkkk';

//get highest wpm today within 24 hr
async function getHighestWpmToday(username){
    const url = `https://typeracerdata.com/api?username=${username}`;
axios.get(url)
  .then(response => {
    const data = response.data;
    const races = data.recent_races;
    const today = new Date();
    const last24hours = new Date(today - 24 * 60 * 60 * 1000);
    const todayRaces = races.filter((race) => new Date(race.time * 1000) > last24hours);
    const highestWpmToday = Math.max(...todayRaces.map((race) => parseFloat(race.wpm)));
    console.log(highestWpmToday);
  })
  .catch(error => {
    console.error(error);
  });
}

// getHighestWpmToday('sparkkk')


//for total races done today within 24 hr
async function getTotalRacesToday(username) {
    const url = `https://typeracerdata.com/api?username=${username}`;
    axios.get(url).then((response) => {
      data = response.data;
      const recent_races = data.recent_races;
      const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000; // Timestamp of 24 hours ago
      let raceCount = 0;
      for (const race of recent_races) {
        if (parseFloat(race.time) * 1000 > twentyFourHoursAgo) {
          raceCount++;
        }
      }
      console.log("Total races within the last 24 hours:", raceCount);
  });
  }
  
  getTotalRacesToday('sparkkk');