var expect = require('chai').expect;
import {
    Covid19MapCasesUS, 
    ICovid19MapCases, 
    ICovid19MapCasesRow
} from '../src/covid19-map-cases-us.js';

describe('Covid19MapCasesUS class', function() {
    it('should return URI', function(){
        let covid19MapCasesUS = new Covid19MapCasesUS();
        expect(covid19MapCasesUS.getURI()).to.be.a("string");
    });
    
    it('should return raw death cases', function(){
        let covid19MapCasesUS = new Covid19MapCasesUS();
        covid19MapCasesUS.getCDCMapCases().then((cdcData: ICovid19MapCases) => {
            //console.log(cdcData);
            expect(cdcData).to.be.an("object");
        });        
        
    });

    it('should return true when range is provided', function(){
        let covid19MapCasesUS = new Covid19MapCasesUS();
        expect(covid19MapCasesUS.isEstimatedNumber("12 to 45")).to.equal(true);      
        
    });

    it('should return false when number is provided', function(){
        let covid19MapCasesUS = new Covid19MapCasesUS();
        expect(covid19MapCasesUS.isEstimatedNumber("10")).to.equal(false);      
        
    });


    it('should return structured death cases', function(){
        let covid19MapCasesUS = new Covid19MapCasesUS();
        covid19MapCasesUS.getCDCMapCasesData().then((cdcData: ICovid19MapCasesRow[]) => {
            //console.log(cdcData);
            expect(cdcData).to.be.an("array");
        });       
        
    });

});