// const unixTimestamp = 1684134075.7620;
// const date = new Date(unixTimestamp * 1000);
// const readableDate = date.toLocaleString();
// console.log(readableDate);


// function convertUnixTimeToReadable(unixTimestamp) {
//     const date = new Date(unixTimestamp * 1000);
//     const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: false,
//     };
//     const readableDate = date.toLocaleString('en-US', options);
//     return readableDate;
//   }

//   const unixTimestamp = 1684134075.7620;
// const readableDate = convertUnixTimeToReadable(unixTimestamp);
// console.log(readableDate);
  

const data = [
    { timestamp: 1684134075.7620, value: "Data 1" },
    { timestamp: 1684134021.2610, value: "Data 2" },
    { timestamp: 1683918895.8830, value: "Data 3" },
    // more objects...
  ];
  
  const today = new Date(); // Current date
  const currentDayData = data.filter(obj => {
    const objDate = new Date(obj.timestamp * 1000);
    return objDate.getDate() === today.getDate() && objDate.getMonth() === today.getMonth() && objDate.getFullYear() === today.getFullYear();
  });
  
  console.log(currentDayData);
