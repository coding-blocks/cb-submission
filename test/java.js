let should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    submission = require('../index'),
    util = require('../util/util'),
    judge = submission.judge

const TIMEOUT = 6000;

describe('#Test Java submissions', function () {
  it('returns success for a trivial, and correct sample', function (done) {
    const source = 'public class Main {\n' +
      '    public static void main(String args[]) {' +
      '        System.out.println("Hello World!");' +
      '    }' +
      '}'
    const testcases = [""]
    const expected = ["Hello World!\n"]
    const test_count = 1

    judge("java", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["correct"], expected)
      done()
    });
  }).timeout(TIMEOUT)

  it('indicates wrong-answer on unexpected output', (done) => {
    const source = 'public class Main {\n' +
      '    public static void main(String args[]) {' +
      '        System.out.println("Allo, World!");' +
      '    }' +
      '}'
    const testcases = [""]
    const expected = ["Hello World!\n"]
    const test_count = 1

    judge("java", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["wrong-answer"], ["Allo, World!\n"])
      done()
    });
  }).timeout(TIMEOUT)

  it('return compilation_error when sample is invalid', (done) => {
    const source = 'public class Pain {\n' +
      '    public staatic void pain(Sterling args[]) {' +
      '        System.out.println("Hello World!");' +
      '    }' +
      '}'
    const testcases = [""]
    const expected = [""]
    const test_count = 1

    judge("java", source, test_count, testcases, expected, true, ({ result, error }) => {
      result.should.equal("compile_error")
      done()
    });
  }).timeout(TIMEOUT)
})
