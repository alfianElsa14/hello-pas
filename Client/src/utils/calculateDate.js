export function calculateTimeDifference(createdAt) {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const timeDifference = Math.abs(currentTime - createdTime);
  
    const seconds = Math.floor(timeDifference / 1000); // Convert milliseconds to seconds
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} ${days === 1 ? 'hari' : 'hari'} yang lalu`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'jam' : 'jam'} yang lalu`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'menit' : 'menit'} yang lalu`;
    } else {
      return `${seconds} ${seconds === 1 ? 'detik' : 'detik'} yang lalu`;
    }
  }