var should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    submission = require('../index'),
    judge = submission.judge;

describe('#Test Python submissions', function () {
    it('judges a trivial python submission', function (done) {
        var source = 'print("Hello World!")';
        var testcases = [""];
        var expected = ["Hello World!"];
        var test_count = 1;
        judge("py2", source, test_count, testcases, expected, true, function (body) {
            done();
        });
    });
});
