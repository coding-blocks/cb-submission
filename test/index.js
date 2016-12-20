/**
 * Created by umair on 16/12/16.
 */

var should = require('chai').should(),
    base64 = require("base-64"),
    submission = require('../index'),
    judge = submission.judge;

describe('#judge', function () {
    it('judges a trivial c submission to add two numbers', function (done) {
        var source = '#include<stdio.h> \nint main() {\nint a, b, c; \nscanf("%d%d", &a, &b); \nc = a + b; printf("%d", c);\n}';
        var testcases = ["1 2"];
        var expected = ["3"];
        var test_count = 1;
        judge("c", source, test_count, testcases, expected, true, function (body) {
            body = JSON.parse(body);
            body.result.should.equal("success");
            var testcases = body.data.testcases;
            for (var i = 0; i < testcases.length; ++i) {
                testcases[i].result.should.equal("correct");
                var output = base64.decode(testcases[i].output);
                output.should.equal("3");
            }
            done();
        });
    }).timeout(6000);
});
