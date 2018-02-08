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


const cellSize = 15;
const width = cellSize * 60;
const height = cellSize * 10;

// create color scale
const color = d3.scaleQuantize()
  .domain([0, 3000]) // range from 0 to 3000 words per day
  .range(colors);

const currentYear = new Date().getFullYear();

// create boxes for the days?
var svg = d3.select("body")
  .selectAll("svg")
  .data(d3.range(2016, 2019))
  .enter().append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + ((width - cellSize * 50) / 1.9) + "," + (height - cellSize * 7 - 1) + ")");

// allows us to append text nodes easily
svg.append('text')
  .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
  .attr('font-family', 'sans-serif')
  .attr('font-size', 10)
  .attr('text-anchor', 'middle')
  .text(d => d);

const rect = svg.append("g")
  .attr("fill", "none")
  .attr("stroke", "#ccc")
  .selectAll("rect")
  .data(function (d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
  .attr("width", cellSize)
  .attr("height", cellSize)
  .attr("x", function (d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
  .attr("y", function (d) { return d.getDay() * cellSize; })
  .datum(d3.timeFormat("%Y-%m-%d"));


function pathMonth(t0) {
  const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
  const d0 = t0.getDay();
  const w0 = d3.timeWeek.count(d3.timeYear(t0), t0);
  const d1 = t1.getDay();
  const w1 = d3.timeWeek.count(d3.timeYear(t1), t1);

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
    .map((d) => {
      d.value = Number(d.value)
      return d;
    })
    .reduce((acc, obj) => {
      acc[format(obj.key)] = obj.value;
      return acc;
    }, {});

  console.log(data);


  rect.filter(function (d) { return d in data; })
    .attr("fill", function (d) { return color(data[d]); })
    .append("title")
    .text(function (d) { return d + ": " + data[d] });
});
