export function convertUnixToTime(unixTime: number, timeZoneOffset: number): string {
    // Convert the Unix timestamp from seconds to milliseconds
    const date = new Date(unixTime * 1000);
  
    // Convert the timezone offset from seconds to minutes
    const timeZoneOffsetInHours = timeZoneOffset / 3600;
  
    // Adjust the date for the timezone offset
    date.setHours(date.getHours() + timeZoneOffsetInHours);
  
    // Format the date as a string
    const formattedDate = date.toLocaleTimeString();
  
    return formattedDate;
  }
  
  const unixTime = 1708063464;
  const timeZoneOffset = 3600;
  
  console.log(convertUnixToTime(unixTime, timeZoneOffset)); // Outputs the time adjusted for the timezone offset