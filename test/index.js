/**
 * Created by umair on 16/12/16.
 */

var should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    submission = require('../index'),
    judge = submission.judge;

describe('#Test C Submissions', function () {

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
    }).timeout(5000);

    it('judges a submission and make sure output is not present', function (done) {
        var source = '#include<stdio.h> \nint main() {\nprintf("Hello World!");\n}';
        var testcases = [""];
        var expected = ["Hello World!"];
        var test_count = 1;
        judge("c", source, test_count, testcases, expected, false, function (body) {
            body = JSON.parse(body);
            body.result.should.equal("success");
            var testcases = body.data.testcases;
            for (var i = 0; i < testcases.length; ++i) {
                testcases[i].result.should.equal("correct");
                expect(testcases[i].output).to.be.undefined;
            }
            done();
        });
    }).timeout(5000);

    it('check if a wrong program gives out a compilation error', function (done) {
        var source = '#include<stdio.h> \nint main() {\nprintf("Hello World!")\n}';
        var testcases = [""];
        var expected = [""];
        var test_count = 1;
        judge("c", source, test_count, testcases, expected, true, function (body) {
            body = JSON.parse(body);
            body.result.should.equal("compile_error");
            done();
        })
    }).timeout(5000);
});
