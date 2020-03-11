const Debug: any = require('debug');
const StateUtils: any = require('states-utils');

import https from 'https';

export interface ICovid19DeathsUS {
    data: {
        columns: [
            string[], // dates
            string[] // deaths
        ]
    }
}

export interface ICovid19DeathCases {
    [key: string]: number;
}

export class Covid19DeathsUS {
    DEATH_CASES_URI: string = "https://www.cdc.gov/coronavirus/2019-ncov/us-cases-epi-chart.json";
    debug: any;

    constructor() {
        this.debug = Debug("Covid19DeathsUS");    
    }

    getURI(): string {
        return this.DEATH_CASES_URI;
    }

    getCDCDeathCases(): Promise<ICovid19DeathsUS> {

        return new Promise<ICovid19DeathsUS>((resolve, reject) => {
            https.get(this.getURI(), (res) => {
                let body: string = "";
                this.debug("status code", res.statusCode);
                res.on("data", (data) => {
                    body += data;
                })
                res.on("end", () => {
                    let cdcData: ICovid19DeathsUS = JSON.parse(body);
                    this.debug("Body response", cdcData);
                    resolve(cdcData);
                });
            }).on('error', (e) => {
                console.error(e);
                reject(e);
            });
        });
    }

    getCDCDeathCasesData(): Promise<ICovid19DeathCases> {
        return new Promise<ICovid19DeathCases>((resolve, reject) => {
            this.getCDCDeathCases().then((cdcData: ICovid19DeathsUS) => {
                let covid19MapCasesData: ICovid19DeathCases = {};

                for ( let i = 1; i < cdcData.data.columns[0].length; i++) {
                    let dateKey = cdcData.data.columns[0][i];
                    let deaths = cdcData.data.columns[1][i];
                    covid19MapCasesData[dateKey] = parseInt(deaths);

                }
                
                resolve(covid19MapCasesData);
            })
        });
    }
}