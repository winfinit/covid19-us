"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('chai').expect;
var covid19_deaths_us_1 = require("../src/covid19-deaths-us");
describe('Covid19DeathsUS class', function () {
    it('should return URI', function () {
        var covid19DeathsUS = new covid19_deaths_us_1.Covid19DeathsUS();
        expect(covid19DeathsUS.getURI()).to.be.a("string");
    });
    it('should return structured death cases by date', function () {
        var covid19DeathsUS = new covid19_deaths_us_1.Covid19DeathsUS();
        covid19DeathsUS.getCDCDeathCasesData().then(function (cdcData) {
            //console.log(cdcData);
            expect(cdcData).to.be.an("object");
        });
    });
});
