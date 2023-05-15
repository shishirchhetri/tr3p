
// if (command === '!highesttoday' || command === 'ht') {
//     const username = message.content.slice(3);
//     const highestWpmToday = await getHighestWpmToday(username);
//     if (highestWpmToday) {
//       message.reply(`${username}'s highest WPM today is ${highestWpmToday}.`);
//     } else {
//       message.reply(`Could not retrieve ${username}'s highest WPM today.`);
//     }
// }

// async function getHighestWpmToday(username) {
//     try {
//       const url = `https://typeracerdata.com/api?username=${username}`;
//       const response = await axios.get(url);
//       if (!response.data || !response.data.recent_races) {
//         throw new Error(`Could not retrieve recent races for ${username}.`);
//       }
//       const races = response.data.recent_races;
//       const today = new Date();
//       const last24hours = new Date(today - 24 * 60 * 60 * 1000); // subtract 24 hours from today
//       const todayRaces = races.filter(
//         (race) => new Date(race.timestamp) > last24hours
//       );
//       const highestWpmToday = Math.max(
//         ...todayRaces.map((race) => parseFloat(race.wpm))
//       );
//       return highestWpmToday;
//     } catch (error) {
//       console.error(error);
//     }
//   }

  const unixTimestamp = 1684133971.3270;
const date = new Date(unixTimestamp * 1000);
console.log(date);