# covid19-us

[![NPM](https://nodei.co/npm/covid19-us.png)](https://nodei.co/npm/covid19-us/)

## What is covid19-us?

"covid19-us" is a library that retrieves current published COVID-19 data from 
the CDC's website. It fetches States Reporting Cases and cases in the United States 
by date of illness onset, starting January 12, 2020. Data is updated Mondays 
through Fridays before 4 pm EST by CDC.

https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html

**NOTE: Cache this data, DO NOT run it continuesly causing issues for CDC.**


## Install

```plain
npm install covid19-us
```

## Usage

### Node.js

```javascript
let Covid19DeathsUS = require("covid19-us").Covid19DeathsUS;
let Covid19MapCasesUS = require("covid19-us").Covid19MapCasesUS;

let deathCases = new Covid19DeathsUS();
deathCases.getCDCDeathCasesData().then(data => {
    console.log("deaths", data);
    /*
        Sample output: 
        { 
            '1/12/2020': 0,
            '1/13/2020': 0,
            '1/14/2020': 2,
            // ...
        }
    */
});

let mapCases = new Covid19MapCasesUS();
mapCases.getCDCMapCasesData().then(data => {
    console.log("maps data:", data);
    /* 
        Sample output:
        [ { 
            casesReported: 0,
            stateCode: 'AL',
            stateName: 'Alabama',
            isEstimated: false 
        }
        // ...
        ]
    */
});
```

### TypeScript

```typescript
import {
    Covid19MapCasesUS, 
    ICovid19MapCases, 
    ICovid19MapCasesRow,
    Covid19DeathsUS,
    ICovid19DeathCases
} from 'covid19-us';

let covid19MapCasesUS = new Covid19MapCasesUS();
covid19MapCasesUS.getCDCMapCasesData().then((cdcData: ICovid19MapCasesRow[]) => {
    console.log(cdcData);
}); 

let covid19DeathsUS = new Covid19DeathsUS();
covid19DeathsUS.getCDCDeathCasesData().then((cdcData: ICovid19DeathCases) => {
    console.log(cdcData);
}); 
```

## Library development

### Linux/OSX

Clone the repository and change your current directory into a projects directory

```plain
git clone https://github.com/winfinit/covid19-us.git
cd covid19-us
```

Make sure typescript and mocha are installed

```plain
npm install typescript mocha --global
```

Build/rebuild the project

```plain
npm run clean-build
// or run: rm -Rf ./build && tsc
```  

Ensure that tests are passing

```plain
npm test
// or run mocha --recursive ./built/test/
```

### Windows

Same as Linux/OSX but change paths to match windows