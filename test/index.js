/**
 * Created by umair on 16/12/16.
 */

var should = require('chai').should(),
    submission = require('../index'),
    judge = submission.judge;

describe('#judge', function () {
    it('judges a trivial submission to add two numbers', function () {
        var source = '#include<stdio.h> int main() {int a, b, c; scanf("%d%d", &a, &b); c = a + b; printf("%d", c);}';
        var testcases = ["1 2"];
        var expected = ["3"];
        judge("c", source, testcases, expected, function (body) {
            body.should.equal('3');
        });
    });
});