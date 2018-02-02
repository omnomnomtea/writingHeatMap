// some nice purple shades
const colors = [
  '#FFFFFF',
  '#96E4EA',
  '#63E3ED',
  '#39B1BA',
  '#09393D',
  '#001011',
];
// size of each box in px
const boxSize = 20;

// constant we use a lot
const msPerDay = 1000 * 60 * 60 * 24;

const groupByDay = (data) => {
  const wpd = data.reduce((acc, entry) => {
    const timeSinceLast = acc.length ? acc[acc.length - 1].date - entry.date : Infinity;
    if (timeSinceLast < msPerDay / 2) {
      acc[acc.length - 1].count += entry.count;
    } else {
      acc.push(entry);
    }
    return acc;
  }, []);

  return wpd;
};

const generateSVG = (rawData) => {
  // clean the data and put in reverse chronological order
  const lessRawData = rawData.map(d => ({ ...d, date: new Date(new Date(d.date).setHours(0, 0, 1)) }));
  lessRawData.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  // combine entries to max of one per day
  const data = groupByDay(lessRawData);

  console.log('sorted and tidied data', data);

  const today = new Date(new Date().setHours(0, 0, 1));
  const olderDate = data[data.length - 1].date;

  const maxCount = Math.floor(Math.max(...data.map(d => d.count)));

  const generateRect = (dayData) => {
    const offsetX = dayData.date.getDay() * (boxSize + 2);
    let colorIndex = 0; // color defaults to white (index 0)
    if (dayData.count) {
      colorIndex =
        Math.floor((dayData.count) / (maxCount + 1) * (colors.length - 2)) + 1;
    }
    const endOfLastWeek = new Date(today.valueOf() + (6 - today.getDay()) * msPerDay);
    const daysAgo = Math.floor((endOfLastWeek.valueOf() - dayData.date.valueOf()) / msPerDay);
    const weeksAgo = Math.floor((daysAgo) / 7);
    const color = colors[colorIndex];
    const offsetY = weeksAgo * (boxSize + 2);
    return `<rect class="day" width="${boxSize}" height="${boxSize}" x="${offsetX}" y="${offsetY}" fill="${color}" data-count="${dayData.count}" data-date="${dayData.date.toDateString()}"></rect>`;
  };

  // let's go through every date since olderDate
  // if we have data, keep it
  // if we don't, the default count is 0
  let dataIndex = 0;
  const dataToMap = [];
  for (
    let currentDay = new Date(today + msPerDay / 2);
    currentDay >= olderDate;
    currentDay = new Date(currentDay.valueOf() - msPerDay)
  ) {
    // if we're within a day of the data's timestamp, use data's wordcount
    if (data[dataIndex] && Math.abs(currentDay - data[dataIndex].date) < msPerDay / 2) {
      dataToMap.push(data[dataIndex]);
      dataIndex += 1;
    } else {
      dataToMap.push({ date: new Date(currentDay), count: 0 });
    }
  }

  console.log('days', dataToMap);

  const endOfWeek = new Date((6 - today.getDay()) * msPerDay + today.valueOf());
  const totalWeeksAgo = Math.ceil((endOfWeek.valueOf() - olderDate.valueOf()) / 7 / msPerDay) - 1;
  const daysSVG = dataToMap.map(day => generateRect(day));
  const svgString = daysSVG.join('\n');

  return `<svg width="${11 * (boxSize + 2)}" height="${(boxSize + 2) * (totalWeeksAgo + 2)}">
  <rect width="${12 * (boxSize + 2)}" height="${(boxSize + 2) * (totalWeeksAgo + 2)}" fill="#000000"></rect>
  <g transform="translate(0,${(boxSize + 2)})">
  ${svgString}
  <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize - 6)}" fill="#FFFFFF">This week</text>
  <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize * 2 - 4)}" fill="#FFFFFF">Last week</text>
  <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize * 3 - 2)}" fill="#FFFFFF">etc...</text>

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
