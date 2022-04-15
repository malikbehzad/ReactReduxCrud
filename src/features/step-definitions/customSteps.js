import {When,Then} from '@cucumber/cucumber'
import {expect} from 'chai'

let sum=0;
When('I add {int} and {int}', function (int1, int2) {
    sum=int1+int2;
    
});

Then('the result should be {int}', function (int) {
    expect(sum).to.equal(int);
}
);