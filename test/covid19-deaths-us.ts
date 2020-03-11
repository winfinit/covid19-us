var expect = require('chai').expect;
import {
    Covid19DeathsUS,
    ICovid19DeathCases
} from '../src/covid19-deaths-us';

describe('Covid19DeathsUS class', function() {
    it('should return URI', function(){
        let covid19DeathsUS = new Covid19DeathsUS();
        expect(covid19DeathsUS.getURI()).to.be.a("string");
    });
    
    it('should return structured death cases by date', function(){
        let covid19DeathsUS = new Covid19DeathsUS();
        covid19DeathsUS.getCDCDeathCasesData().then((cdcData: ICovid19DeathCases) => {
            //console.log(cdcData);
            expect(cdcData).to.be.an("object");
        });       
        
    });

});