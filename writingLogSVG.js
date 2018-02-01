const writingLog = require('./writinglog.json');

const colors = [
  '#E9DCED',
  '#D0C4D3',
  '#B7ADBA',
  '#9E95A0',
  '#847D87',
];

const mapDataToWordsPerDay = (data) => {
  const wpd = [];
  data.forEach((entry) => {
    if (
      wpd.length && Date(entry.date) - wpd[wpd.length - 1].date === 0) {
      wpd[wpd.length - 1].count += entry.count;
    } else {
      wpd.push({ count: entry.count, date: new Date(entry.date) });
    }
  });
  return wpd;
};

const generateSVG = (data) => {
  const cleanerData = mapDataToWordsPerDay(data);

};

// const generateRect = (dayData) => {
//   return `<rect class="day" width="10" height="10" x="-2" y="0" fill="#ebedf0" data-count="0" data-date="2017-05-14"></rect>`
// };

generateSVG(writingLog);
