export interface ICovid19MapCases {
    Name: string;
    Range: string;
    "Cases Reported": string;
}
export interface ICovid19MapCasesRow {
    casesReported: number;
    isEstimated: boolean;
    stateName: string;
    stateCode: string;
}
export declare class Covid19MapCasesUS {
    MAP_CASES_URI: string;
    MAP_CASES_CSV_URI: string;
    debug: any;
    constructor();
    getURI(): string;
    getCSVURI(): string;
    getCDCMapCases(): Promise<ICovid19MapCases[]>;
    correctCasesReportedCaseCount(casesReported: string): number;
    isEstimatedNumber(casesReported: string): boolean;
    formatCDCMapCasesData(rawCDCData: ICovid19MapCases[]): ICovid19MapCasesRow[];
    getCDCMapCasesData(): Promise<ICovid19MapCasesRow[]>;
}
//# sourceMappingURL=covid19-map-cases-us.d.ts.map