const writingLog = [
  {
    "date": "2018-01-03",
    "count": 42,
    "project": "Davekat AU"
  },
  {
    "date": "2018-01-05",
    "count": 250,
    "project": "Davekat AU"
  },
  {
    "date": "2018-01-08",
    "count": 125,
    "project": "Davekat AU"
  },
  {
    "date": "2018-01-09",
    "count": 1000,
    "project": "Davekat AU"
  },
  {
    "date": "2018-01-17",
    "count": 303,
    "project": "Davekat AU"
  },
  {
    "date": "2018-01-21",
    "count": 100,
    "project": "Davekat AU"
  },
  {
    "date": "2018-01-21",
    "count": 750,
    "project": "Davekat AU"
  },
  {
    date: '2017-01-09',
    count: 1039,
    project: 'Family Demons #2',
  },
  {
    date: '2017-01-15',
    count: 1306,
    project: 'Enchanter AU',
  },
  {
    date: '2017-02-02',
    count: 662,
    project: 'Xion HESST thing',
  },
  {
    date: '2017-02-15',
    count: 628,
    project: 'Kairi AU',
  },
  {
    date: '2017-02-21',
    count: 901,
    project: 'Family Demons #2',
  },
  {
    date: '2017-02-21',
    count: 774,
    project: 'Family Demons #2',
  },
  {
    date: '2017-02-24',
    count: 1186,
    project: 'Kairi AU',
  },
  {
    date: '2017-03-01',
    count: 1808,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-02',
    count: 487,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-10',
    count: 500,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-11',
    count: 657,
    project: 'Enchanter AU',
  },
  {
    date: '2017-03-16',
    count: 1008,
    project: 'Kairi AU',
  },
  {
    date: '2017-03-18',
    count: 184,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-19',
    count: 2278,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-22',
    count: 520,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-23',
    count: 689,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-24',
    count: 1125,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-25',
    count: 369,
    project: 'Troll Human thing',
  },
  {
    date: '2017-03-28',
    count: 211,
    project: '(repeat repeat repeat)',
  },
  {
    date: '2017-03-28',
    count: 2039,
    project: 'Tyzula Snippet',
  },
  {
    date: '2017-03-29',
    count: 456,
    project: '(repeat repeat repeat)',
  },
  {
    date: '2017-03-30',
    count: 1475,
    project: '(repeat repeat repeat)',
  },
  {
    date: '2017-04-04',
    count: 169,
    project: 'Sol',
  },
  {
    date: '2017-05-02',
    count: 1875,
    project: 'Kairi AU',
  },
  {
    date: '2017-05-03',
    count: 644,
    project: 'Kairi AU',
  },
  {
    date: '2017-05-08',
    count: 150,
    project: 'Kairi AU',
  },
  {
    date: '2017-05-17',
    count: 529,
    project: 'Kairi AU',
  },
  {
    date: '2017-05-18',
    count: 529,
    project: 'Horrible AU',
  },
  {
    date: '2017-06-03',
    count: 1251,
    project: 'Kairi AU',
  },
  {
    date: '2017-06-04',
    count: 510,
    project: 'Kairi AU',
  },
  {
    date: '2017-06-10',
    count: 1506,
    project: 'Kairi AU',
  },
  {
    date: '2017-06-11',
    count: 544,
    project: 'Kairi AU',
  },
  {
    date: '2017-06-12',
    count: 852,
    project: 'Kairi AU',
  },
  {
    date: '2017-06-16',
    count: 1590,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-06-17',
    count: 210,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-06-19',
    count: 2051,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-06-20',
    count: 775,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-06-21',
    count: 307,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-06-22',
    count: 630,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-07-03',
    count: 20,
    project: 'Soft Ace Romance',
  },
  {
    date: '2017-07-03',
    count: 1674,
    project: 'Kairi AU',
  },
  {
    date: '2017-07-04',
    count: 1022,
    project: 'Kairi AU',
  },
  {
    date: '2017-07-08',
    count: 825,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-07-09',
    count: 801,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-07-10',
    count: 1000,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-07-11',
    count: 90,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-07-12',
    count: 759,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-07-17',
    count: 1434,
    project: 'Kairi AU',
  },
  {
    date: '2017-07-18',
    count: 56,
    project: 'HogwartsStuck',
  },
  {
    date: '2017-07-19',
    count: 300+844,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-07-20',
    count: 873,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-07-21',
    count: 76,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-07-22',
    count: 1555,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-07-26',
    count: 707,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-07-27',
    count: 150,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-07-28',
    count: 107,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-01',
    count: 5,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-07',
    count: 1193,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-09',
    count: 298,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-10',
    count: 360,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-11',
    count: 299,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-12',
    count: 50,
    project: 'Kairi AU',
  },
  {
    date: '2017-08-12',
    count: 228,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-13',
    count: 380,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-16',
    count: 400,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-17',
    count: 400,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-19',
    count: 657,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-08-26',
    count: 9,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-09-01',
    count: 1,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-09-02',
    count: 1525,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-10-04',
    count: 414,
    project: 'Kairi AU',
  },
  {
    date: '2017-10-05',
    count: 1332,
    project: 'Kairi AU',
  },
  {
    date: '2017-10-06',
    count: 1097+49,
    project: 'Kairi AU',
  },
  {
    date: '2017-10-07',
    count: 78,
    project: 'Kairi AU',
  },
  {
    date: '2017-10-08',
    count: 1186,
    project: 'Meta',
  },
  {
    date: '2017-10-09',
    count: 354,
    project: 'Kairi AU',
  },
  {
    date: '2017-10-29',
    count: 21,
    project: 'Davekat Royalty AU',
  },
  {
    date: '2017-11-11',
    count: 1440,
    project: 'Kairi AU',
  },
  {
    date: '2017-11-11',
    count: 1440,
    project: 'FTH',
  },
  {
    date: '2017-11-18',
    count: 1673,
    project: 'FTH',
  },
  {
    date: '2017-11-25',
    count: 3,
    project: 'FTH',
  },
  {
    date: '2017-11-26',
    count: 875,
    project: 'Xion HESST thing',
  },
  {
    date: '2017-11-30',
    count: 33,
    project: 'Kairi AU',
  },
  {
    date: '2017-12-01',
    count: 696,
    project: 'Kairi AU',
  },
  {
    date: '2017-12-03',
    count: 43,
    project: 'DaveKat Royalty AU',
  },
  {
    date: '2017-12-03',
    count: 1190,
    project: 'Kairi AU',
  },
  {
    date: '2017-12-27',
    count: 36,
    project: 'Kairi AU',
  },

];
