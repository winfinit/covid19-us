export interface ICovid19DeathsUS {
    data: {
        columns: [string[], // dates
        string[]];
    };
}
export interface ICovid19DeathCases {
    [key: string]: number;
}
export declare class Covid19DeathsUS {
    DEATH_CASES_URI: string;
    debug: any;
    constructor();
    getURI(): string;
    getCDCDeathCases(): Promise<ICovid19DeathsUS>;
    getCDCDeathCasesData(): Promise<ICovid19DeathCases>;
}
//# sourceMappingURL=covid19-deaths-us.d.ts.map