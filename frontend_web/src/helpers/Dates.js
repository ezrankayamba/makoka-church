export const Dates = {
  fmt: function formatDate(date, timeIncl = false) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minutes = d.getMinutes();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (minutes < 10) minutes = "0" + minutes;

    let dateStr = [year, month, day].join("-")
    let timeStr = `${hour}:${minutes < 10 ? "0" + minutes : minutes}:00.00`
    let res = timeIncl ? dateStr + "T" + timeStr : dateStr;
    return res
  },
};
