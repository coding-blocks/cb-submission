/**
 * Created by umair on 16/12/16.
 */

var should = require('chai').should(),
    submission = require('../index'),
    judge = submission.judge;

describe('#judge', function () {
    it('judges a trivial submission to add two numbers', function (done) {
        var source = '#include<stdio.h> int main() {int a, b, c; scanf("%d%d", &a, &b); c = a + b; printf("%d", c);}';
        var testcases = ["1 2"];
        var expected = ["3"];
        var test_count = 1;
        judge("c", source, test_count, testcases, expected, function (body) {
            body.should.equal('3');
            done();
        });
    });
});
