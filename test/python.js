let should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    R = require('ramda'),
    submission = require('../index'),
    util = require('../util/util.js'),
    { judge } = submission

const TIMEOUT = 5000

describe('#Test Python submissions', () => {
  it('returns success for a trivial, and correct python sample', (done) => {
    let source = `print("Hello World!")`,
        testcases = [""],
        expected = ["Hello World!\n"],
        test_count = 1

    judge("py2", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["correct"], expected)
      done()
    })
  }).timeout(TIMEOUT)

  it('indicates wrong-answer for a python sample that returns incorrect output', (done) => {
    let source = 'print("Obviously Incorrect Output")',
        testcases = [""],
        expected = ["Hello World!\n"],
        test_count = 1

    judge("py2", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["wrong-answer"], ["Obviously Incorrect Output\n"])
      done()
    })
  }).timeout(TIMEOUT)

  it('returns compilation_error when python sample is invalid', (done) => {
    let source = 'int main(void) { return 0; }',
        testcases = [""],
        expected = [""],
        test_count = 1

    judge("py2", source, test_count, testcases, expected, true, ({ result, error }) => {
      result.should.equal("compile_error")
      done()
    })
  }).timeout(TIMEOUT)

  // TODO
  // -- Test nontrivial python samples
  // -- Test samples with multiple inputs
})
