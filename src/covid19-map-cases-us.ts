const Debug: any = require('debug');
const StateUtils: any = require('states-utils');

import https from 'https';

export interface ICovid19MapCases {
    data: {Name: string, Range: string, "Cases Reported": string}[];
    dataTable: {Title: string};
}

export interface ICovid19MapCasesRow {
    casesReported: number;
    isEstimated: boolean;
    stateName: string;
    stateCode: string;
}

export class Covid19MapCasesUS {
    MAP_CASES_URI: string = "https://www.cdc.gov/coronavirus/2019-ncov/map-cases-us.json";
    debug: any;
    
    constructor() {
        this.debug = Debug("Covid19MapCasesUS");    
    }
    
    getURI(): string {
        return this.MAP_CASES_URI;
    }
    
    getCDCMapCases(): Promise<ICovid19MapCases> {
        
        return new Promise<ICovid19MapCases>((resolve, reject) => {
            https.get(this.getURI(), (res) => {
                let body: string = "";
                this.debug("status code", res.statusCode);
                res.on("data", (data) => {
                    body += data;
                })
                res.on("end", () => {
                    let cdcData: ICovid19MapCases = JSON.parse(body);
                    this.debug("Body response", cdcData);
                    resolve(cdcData);
                });
            }).on('error', (e) => {
                console.error(e);
                reject(e);
            });
        });
    }
    
    correctCasesReportedCaseCount(casesReported: string): number {
        let casesCount: number = 0;
        if ( casesReported === "None" ) {
            casesCount = 0;
        } else if ( RegExp("\d* to \d*").test(casesReported) ) {
            let casesRange = casesReported.match(/(\d*) to (\d*)/);
            let maxCases: number = 0;
            let minCases: number = 0;
            if ( casesRange ) {
                minCases = parseInt(casesRange[1]);
                maxCases = parseInt(casesRange[2]);
                // setting cases to max cases
                casesCount = maxCases;
            }  else {
                console.error("match didnt work", casesRange);
                this.debug("unable to get cases range", casesReported);
            }
            
        } else {
            casesCount = parseInt(casesReported);
        }
        return casesCount;
    }
    
    isEstimatedNumber(casesReported: string): boolean {
        if ( RegExp("\d* to \d*").test(casesReported) ) {
            return true;
        } else {
            return false;
        }
    }
    
    formatCDCMapCasesData(rawCDCData: ICovid19MapCases): ICovid19MapCasesRow[] {
        let covid19MapCasesData: ICovid19MapCasesRow[] = [];
        rawCDCData.data.forEach((record) => {
            // if it is not a US state, skipping it.
            if (!StateUtils.getUSPSCode(record.Name)) {
                return;
            }
            
            let casesCount: number = this.correctCasesReportedCaseCount(record["Cases Reported"]);
            let isEstimated: boolean = this.isEstimatedNumber(record["Cases Reported"]);
            covid19MapCasesData.push({
                casesReported: casesCount,
                stateCode: StateUtils.getUSPSCode(record.Name),
                stateName: record.Name,
                isEstimated: isEstimated
            });
        });
        return covid19MapCasesData;
    }
    
    getCDCMapCasesData(): Promise<ICovid19MapCasesRow[]> {
        return new Promise<ICovid19MapCasesRow[]>((resolve, reject) => {
            this.getCDCMapCases().then((cdcData: ICovid19MapCases) => {
                
                resolve(this.formatCDCMapCasesData(cdcData));
            })
        });
    }
}