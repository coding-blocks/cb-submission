/**
 * Created by umair on 27/12/16.
 */

var should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    submission = require('../index'),
    judge = submission.judge;

describe('#Test Java submissions', function () {
    it('judges a trivial Java submission', function (done) {
        var source = 'public class Main {\n' +
            '    public static void main(String args[]) {' +
            '        System.out.println("Hello World!");' +
            '    }' +
            '}';
        var testcases = [""];
        var expected = ["Hello World!"];
        var test_count = 1;
        judge("java", source, test_count, testcases, expected, true, function (body) {
            body = JSON.parse(body);
            done();
        });
    }).timeout(6000);
});
