"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require('debug');
var StateUtils = require('states-utils');
var https_1 = __importDefault(require("https"));
var Covid19DeathsUS = /** @class */ (function () {
    function Covid19DeathsUS() {
        this.DEATH_CASES_URI = "https://www.cdc.gov/coronavirus/2019-ncov/us-cases-epi-chart.json";
        this.debug = Debug("Covid19DeathsUS");
    }
    Covid19DeathsUS.prototype.getURI = function () {
        return this.DEATH_CASES_URI;
    };
    Covid19DeathsUS.prototype.getCDCDeathCases = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            https_1.default.get(_this.getURI(), function (res) {
                var body = "";
                _this.debug("status code", res.statusCode);
                res.on("data", function (data) {
                    body += data;
                });
                res.on("end", function () {
                    var cdcData = JSON.parse(body);
                    _this.debug("Body response", cdcData);
                    resolve(cdcData);
                });
            }).on('error', function (e) {
                console.error(e);
                reject(e);
            });
        });
    };
    Covid19DeathsUS.prototype.getCDCDeathCasesData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getCDCDeathCases().then(function (cdcData) {
                var covid19MapCasesData = {};
                for (var i = 1; i < cdcData.data.columns[0].length; i++) {
                    var dateKey = cdcData.data.columns[0][i];
                    var deaths = cdcData.data.columns[1][i];
                    covid19MapCasesData[dateKey] = parseInt(deaths);
                }
                resolve(covid19MapCasesData);
            });
        });
    };
    return Covid19DeathsUS;
}());
exports.Covid19DeathsUS = Covid19DeathsUS;
