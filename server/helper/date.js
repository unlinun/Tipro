// helper function to get week start date
export const getWeekStartDate = function (date) {
  const dayOfWeek = date.getDay();
  const day = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const firstDay = new Date(date.setDate(day));
  firstDay.setUTCHours(0, 0, 0, 0);
  // 回傳的是午夜
  return firstDay;
};

// helper function to get week end date
export const getWeekEndDate = function (weekStartDate) {
  let weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  weekEndDate.setUTCHours(0, 0, 0, 0);
  return weekEndDate;
};
