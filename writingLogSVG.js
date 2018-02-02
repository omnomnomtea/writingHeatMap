const writingLog = require('./writinglog.json');

// some nice purple shades
const colors = [
  '#FFFFFF',
  '#E9DCED',
  '#D0C4D3',
  '#B7ADBA',
  '#9E95A0',
  '#847D87',
];
// size of each box in px
const boxSize = 10;


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

const generateSVG = (rawData) => {
  // clean the data and put in reverse chronological order
  rawData.sort((a, b) => b.date - a.date);

  // combine entries to max of one per day
  const data = mapDataToWordsPerDay(rawData);

  const recentDate = data[data.length - 1].date;
  const olderDate = data[0].date;

  const msPerDay = 1000 * 60 * 60 * 24;
  const maxCount = Math.max(...data.map(d => d.count));


  const generateRect = (dayData, offsetX) => {
    let colorIndex = 0; // color defaults to white or index 0
    if (dayData.count) colorIndex =
      Math.floor((dayData.count) / (maxCount + 1) * (colors.length - 1)) + 1;
    const color = colors[colorIndex];
    return `<rect class="day" width="${boxSize}" height="${boxSize}" x="${offsetX}" y="0" fill="${color}" data-count="${dayData.count}" data-date="${dayData.date.toDateString()}"></rect>`;
  };

  let dataIndex = 0;
  const dataToMap = [];
  const startSunday = olderDate - (olderDate.getDay() * msPerDay);
  const endsSaturday = new Date(recentDate + ((6 - recentDate.getDay()) * msPerDay));
  for (
    let currentDay = new Date(startSunday);
    currentDay < endsSaturday;
    currentDay = new Date(currentDay.valueOf() + msPerDay)
  ) {
    // if we're within a day of the data's timestamp, use data's wordcount
    if (Math.abs(currentDay - data[dataIndex].date) < msPerDay) {
      dataToMap.push(data[dataIndex]);
      dataIndex += 1;
    } else {
      dataToMap.push({ date: new Date(currentDay), count: 0 });
    }
  }

  // console.log(dataToMap);

  const weeks = [];
  dataToMap.forEach((datum) => {
    const dayOfWeek = new Date(datum.date).getDay();
    const rect = generateRect(datum, 12 * dayOfWeek);
    // if it's 0, it's sunday and we start a new week
    if (!dayOfWeek) {
      weeks.push([rect]);
    } else {
      weeks[weeks.length - 1].push(rect);
    }
  });


  const svgString = weeks.map((week, i) => {
    return `<g transform="translate(0,${i * 12})">\n${week.join('\n')}</g>`;
  })
    .join('\n\n');



  return `<svg width="${7 * 12}" height="${12 * weeks.length}"><rect width="${7 * 12}" height="${12 * weeks.length} fill="#000000"></rect>\n${svgString}\n</svg>`;
};


console.log(generateSVG(writingLog));
