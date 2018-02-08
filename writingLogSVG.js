// constant we use a lot
const msPerDay = 1000 * 60 * 60 * 24;

const colorOptions = {
  blue: [
    '#fafafa',
    '#B5F0F4',
    '#63E3ED',
    '#39B1BA',
    '#0D5056',
    '#042F33',
  ],
  purple: [
    '#fafafa',
    '#d8d8d8',
    '#bfafbc',
    '#aea0af',
    '#a081a5',
    '#8f6099',
  ],
};

// const text_color = '#999999';
const colors = colorOptions.purple;


const width = 960;
const height = 136;
const cellSize = 20;

// create color scale
const color = d3.scaleQuantize()
  .domain([0, 2000]) // range from 0 to 2000
  .range(colors);

const currentYear = new Date().getFullYear();

// create boxes for the days?
const svg = d3.select('body')
  .selectAll('svg')
  .data(d3.range([currentYear, currentYear - 3]))
  .enter()
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + ((width - cellSize * 53) / 2) + ',' + (height - cellSize * 7 - 1) + ')');

// allows us to append text nodes easily
svg.append('text')
  .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
  .attr('font-family', 'sans-serif')
  .attr('font-size', 10)
  .attr('text-anchor', 'middle')
  .text(d => d);

const rect = svg.append('g')
  .attr('fill', 'none')
  .attr('stroke', '#ccc')
  .selectAll('rect')
  .data(d => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
  .enter()
  .append('rect')
  .attr('width', cellSize)
  .attr('height', cellSize)
  .attr('x', d => Number(d3.timeWeek.Count(d3.timeYear(d), d)) * cellSize)
  .attr('y', d => d.getDay() * cellSize)
  .datum(d3.timeFormat('%Y-%m-%d'));


function pathMonth(t0) {
  const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
  const d0 = t0.getDay();
  const w0 = Number(d3.timeWeek.Count(d3.timeYear(t0)), t0);
  const d1 = t1.getDay();
  const w1 = Number(d3.timeWeek.Count(d3.timeYear(t1)), t1);

  return 'M' + (w0 + 1) * cellSize + ',' + d0 * cellSize
    + 'H' + w0 * cellSize + 'V' + 7 * cellSize
    + 'H' + w1 * cellSize + 'V' + (d1 + 1) * cellSize
    + 'H' + (w1 + 1) * cellSize + 'V' + 0
    + 'H' + (w0 + 1) * cellSize + 'Z';
}

svg.append('g')
  .attr('fill', 'none')
  .attr('stroke', '#000')
  .selectAll('path')
  .data(d => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
  .enter()
  .append('path')
  .attr('d', pathMonth);


d3.csv('https://raw.githubusercontent.com/omnomnomtea/writingHeatMap/d3/log.csv', (error, csv) => {
  if (error) throw error;
  const format = d3.timeFormat('%Y-%m-%d');

  const data = d3.nest()
    .key(d => d.Date)
    .rollup(d => d[0].Count)
    .entries(csv)
    .map(d => ({ ...d, key: new Date(new Date(d.key).setHours(0, 0, 1)) }))
    .sort((a, b) => a.key.valueOf() - b.key.valueOf())
    .reduce((acc, entry) => {
      const timeSinceLast = acc.length ? acc[acc.length - 1].Date - entry.Date : Infinity;
      if (timeSinceLast < msPerDay / 2) {
        acc[acc.length - 1].Count += Number(entry.Count);
      } else {
        acc.push(entry);
      }
      return acc;
    }, [])
    .reduce((acc, obj) => {
      acc[format(obj.key)] = obj.value;
      return acc;
    }, {});

  console.log(data);

  rect.filter(d => d in data)
    .attr('fill', d => color(data[d]))
    .append('title')
    .text(d => d + ': ' + (data[d]));

});


// // size of each box in px
// const boxSize = 20;
// let maxCount;

// const groupByDay = (data) => {
//   const wpd = data.reduce((acc, entry) => {
//     const timeSinceLast = acc.length ? acc[acc.length - 1].date - entry.date : Infinity;
//     if (timeSinceLast < msPerDay / 2) {
//       acc[acc.length - 1].count += entry.count;
//     } else {
//       acc.push(entry);
//     }
//     return acc;
//   }, []);

//   return wpd;
// };

// const generateSVG = (rawData) => {
  // clean the data and put in reverse chronological order
  // const lessRawData = rawData.map(d => ({ ...d, date: new Date(new Date(d.date).setHours(0, 0, 1)) }));
//   lessRawData.sort((a, b) => b.date.valueOf() - a.date.valueOf());
//   // combine entries to max of one per day
//   const data = groupByDay(lessRawData);

//   console.log('sorted and tidied data', data);

//   const today = new Date(new Date().setHours(0, 0, 1));
//   const olderDate = data[data.length - 1].date;

//   maxCount = Math.floor(Math.max(...data.map(d => d.count)));

//   const generateRect = (dayData) => {
//     const offsetX = dayData.date.getDay() * (boxSize + 2);
//     let colorIndex = 0; // color defaults to white (index 0)
//     if (dayData.count) {
//       colorIndex =
//         Math.floor((dayData.count) / (maxCount + 1) * (colors.length - 1)) + 1;
//     }
//     const endOfLastWeek = new Date(today.valueOf() + (6 - today.getDay()) * msPerDay);
//     const daysAgo = Math.floor((endOfLastWeek.valueOf() - dayData.date.valueOf()) / msPerDay);
//     const weeksAgo = Math.floor((daysAgo) / 7);
//     const color = colors[colorIndex];
//     const offsetY = weeksAgo * (boxSize + 2);
//     return `<rect class="day" width="${boxSize}" height="${boxSize}" x="${offsetX}" y="${offsetY}" fill="${color}" data-count="${dayData.count}" data-date="${dayData.date.toDateString()}"></rect>`;
//   };

//   // let's go through every date since olderDate
//   // if we have data, keep it
//   // if we don't, the default count is 0
//   let dataIndex = 0;
//   const dataToMap = [];
//   for (
//     let currentDay = new Date(today + msPerDay / 2);
//     currentDay >= olderDate;
//     currentDay = new Date(currentDay.valueOf() - msPerDay)
//   ) {
//     // if we're within a day of the data's timestamp, use data's wordcount
//     if (data[dataIndex] && Math.abs(currentDay - data[dataIndex].date) < msPerDay / 2) {
//       dataToMap.push(data[dataIndex]);
//       dataIndex += 1;
//     } else {
//       dataToMap.push({ date: new Date(currentDay), count: 0 });
//     }
//   }

//   console.log('days', dataToMap);

//   const endOfWeek = new Date((6 - today.getDay()) * msPerDay + today.valueOf());
//   const totalWeeksAgo = Math.ceil((endOfWeek.valueOf() - olderDate.valueOf()) / 7 / msPerDay) - 1;
//   const daysSVG = dataToMap.map(day => generateRect(day));
//   const svgString = daysSVG.join('\n');

//   return `<svg width="${24 * (boxSize + 2)}" height="${(boxSize + 2) * (totalWeeksAgo + 2)}">
//   <rect width="${24 * (boxSize + 2)}" height="${(boxSize + 2) * (totalWeeksAgo + 3)}" fill="#ffffff"></rect>

//   <g transform="translate(2,${(boxSize + 2)})">
//   ${svgString}
//   <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize - 6)}" fill="${text_color}">This week</text>
//   <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize * 2 - 4)}" fill="${text_color}">Last week</text>
//   <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize * 3 - 2)}" fill="${text_color}">etc...</text>

//   <g class="keys" transform="translate(${(boxSize + 2.5) * 9},0)">
//   <g class="color-keys">

//       <rect class="key" width="${boxSize}" height="${boxSize}" x="${(boxSize + 2.5) * 9}" y="${(boxSize + 2) * 5 + 10}" fill="${colors[0]}"></rect>

//       <rect class="key" width="${boxSize}" height="${boxSize}" x="0" y="${(boxSize + 2) * 6}" fill="${colors[1]}"></rect>

//       <rect class="key" width="${boxSize}" height="${boxSize}" x="0" y="${(boxSize + 2) * 7}" fill="${colors[2]}"></rect>

//       <rect class="key" width="${boxSize}" height="${boxSize}" x="0" y="${(boxSize + 2) * 8}" fill="${colors[3]}"></rect>

//       <rect class="key" width="${boxSize}" height="${boxSize}" x="0" y="${(boxSize + 2) * 9}" fill="${colors[4]}"></rect>

//       <rect class="key" width="${boxSize}" height="${boxSize}" x="0" y="${(boxSize + 2) * 10}" fill="${colors[5]}"></rect>

//     </g>

//     <text class="key-label" x="0" y="${0}" fill="${text_color}">0</text>
//     <text class="key-label" x="0" y="${(boxSize + 28) * 5 + 10}" fill="${text_color}">>=${maxCount}</text>
//   </g>
//   </g>
//   </svg>`;
// };


// const svg = generateSVG(writingLog);

// const insertLoc = document.getElementById('insert-location');
// insertLoc.innerHTML = svg;

// let days = document.getElementsByClassName('day');
// days = Array.prototype.slice.call(days);


// days.forEach((day) => {
//   const textNode = document.createElement('text');
//   textNode.innerHTML = `${day.dataset.count} words on ${day.dataset.date}`;
//   textNode.classList.add('tooltip');
//   textNode.classList.add('tooltiptext');
//   day.parentNode.insertBefore(textNode, day);
// });
