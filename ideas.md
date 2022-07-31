# Ideas

## analyzeChanges

- Input: string[] // chords
- Output: Change[]

### Change

```ts
export interface Change {
  symbols: string[]; // e.g. ['-', '7']
  interval: number; // e.g. 4P
  roots: string[]; // which start roots appear?
}
```

### Example: How High the Moon

```ts
analyzeChanges([
  'A^7',
  '%',
  'A-7',
  'D7',
  'G^7',
  '%',
  'G-7',
  'C7',
  'F^7',
  'B-7b5',
  'E7b9',
  'A-7',
  'B-7b5',
  'E7b9',
  'A^7',
  'F#-7',
  'B-7',
  'E7',
  'A^7',
  '%',
  'A-7',
  'D7',
  'G^7',
  '%',
  'G-7',
  'C7',
  'F^7',
  'B-7b5',
  'E7b9',
  'A^7',
  'B-7',
  'E-7',
  'C#-7',
  'F#7',
  'B-7',
  'E7',
  'A6',
  'B-7',
  'E7'
]);
```

returns

```ts
[
  {
    symbols: ['^7', '-7'],
    interval: '1P', // major to minor
    roots: ['A', 'G', 'A', 'G'],
    beats: [8, 8, 8, 8]
    count: 4,
    uniqueCount: 2
  },
  {
    symbols: ['-7', '7'],
    interval: '4P', // major II V
    roots: ['A', 'G', 'B', 'A', 'G', 'B', 'C#', 'B', 'B'],
    beats: [4, 4, 4, 4, 4, 2, 2, 2, 2]
    count: 9,
    uniqueCount: 4
  },
  {
    symbols: ['7', '^7'],
    interval: '4P' // major V I
    roots: ['D', 'C', 'E', 'D', 'C', 'E', 'E'],
    beats: [4, 4, 4, 4, 4, 2, 2]
    count: 7,  // last one is from form end to start
    uniqueCount: 3
  },
  {
    symbols: ['-7b5', '7b9'],
    interval: '4P',
    roots: ['B', 'B', 'B'] // harmonic minor II V
    beats: [2, 2, 2]
    count: 3,
    uniqueCount: 1
  },
  {
    symbols: ['7b9', '-7'],
    interval: '4P', // harmonic minor V I
    roots: ['E'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['-7', '-7b5'],
    interval: '2M', // minor I to minor II
    roots: ['A'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['7b9', '^7'],
    interval: '4P' // minor V to major I
    roots: ['E', 'E'],
    count: 2,
    uniqueCount: 1
  },
  {
    symbols: ['^7', '-7'],
    interval: '-3m' // I^ to VI-
    roots: ['A'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['-7', '-7'],
    interval: '4P', // VI- to II- (minor )
    roots: ['F#'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['7', '-7'],
    interval: '-3m', // e.g. V7 > II- whole step up
    roots: ['E'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['7', '-7'],
    interval: '4P', // major V to minor I
    roots: ['F#'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['7', '6'],
    interval: '4P' // major V I6
    roots: ['E'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['6', '-7'],
    interval: '2M' // major I6 to II-
    roots: ['A'],
    count: 1,
    uniqueCount: 1
  },
];
```

- total: 33
  - avg 1 chord per bar => 32 bars total + change from last bar to first
- unique: 19
- change types: 13

### Example: Blue Bossa

```ts
analyzeChanges([
  'D-7', 
  '%', //X
  'G-7',
  '%', //X
  'E-7b5', //X
  'A7b9', //X
  'D-7',
  '%', //X
  'F-7', //X
  'Bb7', //X
  'Eb^7',
  '%', //X
  'E-7b5', //X
  'A7b9', //X
  'D-7',
  'E-7b5', //X
  'A7b9', //X
  'D-7' // form starts again
]);
```

yields

```ts
[
  {
    symbols: ['-7', '-7'],
    interval: '4P' // minor quintfall 
    roots: ['D'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['-7', '-7b5'],
    interval: '-3m',
    roots: ['G']
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['-7b5', '7b9'],
    interval: '4P', // harmonic minor II V
    roots: ['E', 'E', 'E'],
    count: 3,
    uniqueCount: 1
  },
  {
    symbols: ['7b9', '-7'],
    interval: '4P', // harmonic minor V I
    roots: ['A', 'A', 'A'],
    count: 3,
    uniqueCount: 1
  },
  {
    symbols: ['-7', '-7'],
    interval: '3m' // blue bossa trademark
    roots: ['D'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['-7', '7'],
    interval: '4P', // major II V
    roots: ['F'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['7', '^7'],
    interval: '4P', // major V I
    roots: ['Bb'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['^7', '-7b5'],
    interval: '-2m', // blue bossa trademark
    roots: ['Eb'],
    count: 1,
    uniqueCount: 1
  },
  {
    symbols: ['-7', '-7b5'],
    interval: '2M', // minor I II
    roots: ['D'],
    count: 1,
    uniqueCount: 1
  },
];
```

- total: 13
- unique: 9
- types: 9

### use cases

- analyze huge set of leadsheets > ireal 1350 set
  - find out which changes are the most common
  - find out changes that are really special
  - find out changes that are NEVER used
  - sort tunes
    - amount of unique changes
    - amount of total changes
    - amount of change types
    - ability => unique changes per minute (if you know tempo)
    - diversity => change types per minute (if you know tempo)
    - activity => changes per minute (if you know tempo)
  - compare tunes
    - number of shared unique changes
    - number of unshared unique changes
    - percent of shared changed
- which tunes can you play? > select
  - show tunes that you can also play (no new changes)
  - show tunes that could learn to extend your skills
    - some new similar changes (similar chord types but extended)
    - same known changes but in different keys
    - known changes in faster tempos
    - some new changes (new symbol/interval combinations)
  - show tunes that are hard to learn for you
    - too many new changes / new keys
- compile set of changes that should be played by paul
  - use most common changes in most common keys
  - generate random sequences
  - generate sequenes that pull the hands up
  - generate sequences that pull the hands down
  - record what is played
  - analyze voice leading
  - generate library for most used voice transitions


TBD: integrate harmonic rhythm into the game