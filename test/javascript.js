let should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    submission = require('../index'),
    util = require('../util/util'),
    judge = submission.judge

const TIMEOUT = 6000;

describe('#Test JavaScript submissions', function () {
  it('returns success for a trivial, and correct sample', function (done) {
    const source = 'console.log ("Hello, World!")'
    const testcases = [""]
    const expected = ["Hello, World!\n"]
    const test_count = 1

    judge("js", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["correct"], expected)

      done()
    });

  }).timeout(TIMEOUT)

  it('indicates wrong-answer on unexpected output', (done) => {
    const source = 'console.log ("Allo, World!")'
    const testcases = [""]
    const expected = ["Hello, World!\n"]
    const test_count = 1

    judge("js", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["wrong-answer"], ["Allo, World!\n"])

      done()
    });
  }).timeout(TIMEOUT)

  it('return run error when sample is invalid', (done) => {
    const source = 'public stetic void Pain ()'
    const testcases = [""]
    const expected = [""]
    const test_count = 1

    judge("js", source, test_count, testcases, expected, true, ({ result, data }) => {
      result.should.equal("success")
      data.testcases[0].result.should.equal ('run-error')

      done()
    });
  }).timeout(TIMEOUT)
})
