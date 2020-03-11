"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('chai').expect;
var covid19_map_cases_us_js_1 = require("../src/covid19-map-cases-us.js");
describe('Covid19MapCasesUS class', function () {
    it('should return URI', function () {
        var covid19MapCasesUS = new covid19_map_cases_us_js_1.Covid19MapCasesUS();
        expect(covid19MapCasesUS.getURI()).to.be.a("string");
    });
    it('should return raw death cases', function () {
        var covid19MapCasesUS = new covid19_map_cases_us_js_1.Covid19MapCasesUS();
        covid19MapCasesUS.getCDCMapCases().then(function (cdcData) {
            //console.log(cdcData);
            expect(cdcData).to.be.an("object");
        });
    });
    it('should return true when range is provided', function () {
        var covid19MapCasesUS = new covid19_map_cases_us_js_1.Covid19MapCasesUS();
        expect(covid19MapCasesUS.isEstimatedNumber("12 to 45")).to.equal(true);
    });
    it('should return false when number is provided', function () {
        var covid19MapCasesUS = new covid19_map_cases_us_js_1.Covid19MapCasesUS();
        expect(covid19MapCasesUS.isEstimatedNumber("10")).to.equal(false);
    });
    it('should return structured death cases', function () {
        var covid19MapCasesUS = new covid19_map_cases_us_js_1.Covid19MapCasesUS();
        covid19MapCasesUS.getCDCMapCasesData().then(function (cdcData) {
            //console.log(cdcData);
            expect(cdcData).to.be.an("array");
        });
    });
});
