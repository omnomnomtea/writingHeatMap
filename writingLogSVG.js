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
const boxSize = 20;

const msPerDay = 1000 * 60 * 60 * 24;

const mapDataToWordsPerDay = (data) => {
  const wpd = [data[0]];
  data.forEach((entry, i) => {
    if (i === 0) return;
    const timeSinceLastWPD = entry.date.valueOf() - wpd[wpd.length - 1].date.valueOf();
    if (wpd.length && Math.abs(timeSinceLastWPD) <= msPerDay / 2) {
      wpd[wpd.length - 1] = { count: entry.count, date: entry.date };
    } else {
      wpd.push({ count: entry.count, date: new Date(entry.date) });
    }
  });
  return wpd;
};

const generateSVG = (rawData) => {
  // clean the data and put in reverse chronological order
  const lessRawData = rawData.map(d => ({ ...d, date: new Date(d.date) }));
  console.log('lessRawData', lessRawData);
  lessRawData.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  // combine entries to max of one per day
  const data = mapDataToWordsPerDay(lessRawData);

  console.log('sorted and tidied data', data);

  const recentDate = new Date(); // data[data.length - 1].date;
  const olderDate = data[0].date;

  const maxCount = Math.max(...data.map(d => d.count));


  const generateRect = (dayData, offsetX) => {
    let colorIndex = 0; // color defaults to white or index 0
    if (dayData.count) {
      colorIndex =
        Math.floor((dayData.count) / (maxCount + 1) * (colors.length - 1)) + 1;
    }
    const color = colors[colorIndex];
    return `<rect class="day" width="${boxSize}" height="${boxSize}" x="${offsetX}" y="0" fill="${color}" data-count="${dayData.count}" data-date="${dayData.date.toDateString()}"></rect>`;
  };

  let dataIndex = 0;
  const dataToMap = [];
  const startSunday = olderDate - (olderDate.getDay() * msPerDay);
  const endsSaturday = new Date(recentDate + ((6 - recentDate.getDay()) * msPerDay));
  for (
    let currentDay = new Date(startSunday);
    currentDay <= endsSaturday;
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
    const rect = generateRect(datum, (boxSize + 2) * dayOfWeek);
    // if it's 0, it's sunday and we start a new week
    if (!dayOfWeek) {
      weeks.push([rect]);
    } else {
      weeks[weeks.length - 1].push(rect);
    }
  });


  const svgString = weeks.map((week, i) => {
    return `<g transform="translate(0,${i * (boxSize + 2)})">\n${week.join('\n')}</g>`;
  })
    .join('\n\n');

  return `<svg width="${10 * (boxSize + 2)}" height="${(boxSize + 2) * (weeks.length + 1)}">
  <rect width="${10 * (boxSize + 2)}" height="${(boxSize + 2) * (weeks.length + 1)}" fill="#000000"></rect>
  <g transform="translate(0,${(boxSize + 2)})">
  ${svgString}
  <text class="label-week" x="${(boxSize + 2) * 7}" y="${(boxSize - 6)}" fill="#FFFFFF">This week</text>
  <text class="label-week" x="${(boxSize + 2) * 7}" y="${(boxSize * 2 - 4)}" fill="#FFFFFF">Last week</text>
  <text class="label-week" x="${(boxSize + 2) * 7}" y="${(boxSize * 3 - 2)}" fill="#FFFFFF">etc...</text>

  </g>
  </svg>`;
};


const svg = generateSVG(writingLog);

const insertLoc = document.getElementById('insert-location');
insertLoc.innerHTML = svg;

let days = document.getElementsByClassName('day');
days = Array.prototype.slice.call(days);


days.forEach((day) => {
  const textNode = document.createElement('text');
  textNode.innerHTML = `${day.dataset.count} words on ${day.dataset.date}`;
  textNode.classList.add('tooltip');
  textNode.classList.add('tooltiptext');
  day.parentNode.insertBefore(textNode, day);
});
