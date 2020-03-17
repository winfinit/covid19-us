"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require('debug');
var StateUtils = require('states-utils');
var csvtojson = require("csvtojson");
var https_1 = __importDefault(require("https"));
var Covid19MapCasesUS = /** @class */ (function () {
    function Covid19MapCasesUS() {
        this.MAP_CASES_URI = "https://www.cdc.gov/coronavirus/2019-ncov/map-cases-us.json";
        this.MAP_CASES_CSV_URI = "https://www.cdc.gov/coronavirus/2019-ncov/map-data-cases.csv";
        this.debug = Debug("Covid19MapCasesUS");
    }
    Covid19MapCasesUS.prototype.getURI = function () {
        return this.MAP_CASES_URI;
    };
    Covid19MapCasesUS.prototype.getCSVURI = function () {
        return this.MAP_CASES_CSV_URI;
    };
    Covid19MapCasesUS.prototype.getCDCMapCases = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            https_1.default.get(_this.getCSVURI(), function (res) {
                var body = "";
                _this.debug("status code", res.statusCode);
                res.on("data", function (data) {
                    body += data;
                });
                res.on("end", function () {
                    csvtojson().fromString(body).then(function (cdcRawData) {
                        _this.debug("Body response", cdcRawData);
                        resolve(cdcRawData);
                    });
                });
            }).on('error', function (e) {
                console.error(e);
                reject(e);
            });
        });
    };
    Covid19MapCasesUS.prototype.correctCasesReportedCaseCount = function (casesReported) {
        var casesCount = 0;
        if (casesReported === "None") {
            casesCount = 0;
        }
        else if (RegExp("\d* to \d*").test(casesReported)) {
            var casesRange = casesReported.match(/(\d*) to (\d*)/);
            var maxCases = 0;
            var minCases = 0;
            if (casesRange) {
                minCases = parseInt(casesRange[1]);
                maxCases = parseInt(casesRange[2]);
                // setting cases to max cases
                casesCount = maxCases;
            }
            else {
                console.error("match didnt work", casesRange);
                this.debug("unable to get cases range", casesReported);
            }
        }
        else {
            casesCount = parseInt(casesReported);
        }
        return casesCount;
    };
    Covid19MapCasesUS.prototype.isEstimatedNumber = function (casesReported) {
        if (RegExp("\d* to \d*").test(casesReported)) {
            return true;
        }
        else {
            return false;
        }
    };
    Covid19MapCasesUS.prototype.formatCDCMapCasesData = function (rawCDCData) {
        var _this = this;
        var covid19MapCasesData = [];
        rawCDCData.forEach(function (record) {
            // if it is not a US state, skipping it.
            if (!StateUtils.getUSPSCode(record.Name)) {
                return;
            }
            var casesCount = _this.correctCasesReportedCaseCount(record["Cases Reported"]);
            var isEstimated = _this.isEstimatedNumber(record["Cases Reported"]);
            covid19MapCasesData.push({
                casesReported: casesCount,
                stateCode: StateUtils.getUSPSCode(record.Name),
                stateName: record.Name,
                isEstimated: isEstimated
            });
        });
        return covid19MapCasesData;
    };
    Covid19MapCasesUS.prototype.getCDCMapCasesData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getCDCMapCases().then(function (cdcData) {
                resolve(_this.formatCDCMapCasesData(cdcData));
            });
        });
    };
    return Covid19MapCasesUS;
}());
exports.Covid19MapCasesUS = Covid19MapCasesUS;
//# sourceMappingURL=covid19-map-cases-us.js.map