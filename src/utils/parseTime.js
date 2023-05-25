const str = "2023-05-22 12:11:09";
const [dateValues, timeValues] = str.split(" ");
const date = new Date(dateValues);
const now = new Date();
if (
  date.getDate() === now.getDate() &&
  date.getMonth() == now.getMonth() &&
  date.getFullYear == now.getFullYear
) {
  console.log(timeValues);
} else {
  console.log(dateValues);
}

export function parseTime(timeStr) {
  const [dateValues, timeValues] = timeStr.split(" ");
  const date = new Date(dateValues);
  const now = new Date();
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() == now.getMonth() &&
    date.getFullYear == now.getFullYear
  ) {
    return timeValues;
  } else {
    return dateValues;
  }
}
