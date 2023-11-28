const optionsDate = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const optionsHour = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Jakarta',
};

const formatter = new Intl.DateTimeFormat('id-ID', optionsDate);

export const formatDate = (inputDateString) => {
  const inputDate = new Date(inputDateString);
  return formatter.format(inputDate);
};

export const formatHour = (inputDateString) => {
  const inputDate = new Date(inputDateString);
  return inputDate.toLocaleTimeString('en-US', optionsHour);
};
