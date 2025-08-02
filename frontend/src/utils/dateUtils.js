export const formatDate = (utcDateString) => {
  if (!utcDateString) return '';

  const utcDate = new Date(utcDateString);
  // console.log('UTC Date:', utcDate);

  // Convert UTC to IST
  // const istOffset = 5.5 * 60 * 60 * 1000; IST is UTC+5:30
  const istOffset = 0;
  const istDate = new Date(utcDate.getTime() + istOffset);
  // console.log('IST Date:', istDate);

  // Format the IST date
  return istDate.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

export const formatDuration = (startDate, endDate) => {
  // Convert startDate and endDate to IST
  const start = new Date(new Date(startDate).getTime() + 5.5 * 60 * 60 * 1000);
  const end = new Date(new Date(endDate).getTime() + 5.5 * 60 * 60 * 1000);

  const milliseconds = end - start;
  if (isNaN(milliseconds) || milliseconds < 0) return 'Invalid duration';

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return null;

  // Convert startDate and endDate to IST
  const start = new Date(new Date(startDate).getTime() + 5.5 * 60 * 60 * 1000);
  const end = new Date(new Date(endDate).getTime() + 5.5 * 60 * 60 * 1000);

  const diffInMs = end - start;
  if (diffInMs <= 0) return null;

  const seconds = Math.floor((diffInMs / 1000) % 60);
  const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));

  return `${hours}h ${minutes}m ${seconds}s`;
};