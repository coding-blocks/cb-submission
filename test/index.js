let should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    submission = require('../index'),
    R = require('ramda'),
    util = require('../util/util'),
    { judge } = submission

describe('#Test C submissions', () => {
  it('returns success for a trivial, and correct sample', (done) => {
    let source = '#include<stdio.h> \nint main(void) {\nint a, b, c; \nscanf("%d%d", &a, &b); \nc = a + b; printf("%d", c);\n}'
    let testcases = ["1 2","3 4"]
    let expected = ["3","7"]
    let test_count = 2

    judge("c", source, test_count, testcases, expected, true, (body) => {     
      util.assertResult(body, "success", ["correct"], expected)
      done()
    })
  }).timeout(5000)

  it('returns wrong-answer for unexpected output', (done) => {
    let source = '#include<stdio.h> \nint main(void) {\nint a, b, c; \nscanf("%d%d", &a, &b); \nc = a + b; printf("%d", c);\n}'
    let testcases = ["2 2"]
    let expected = ["3"]
    let test_count = 1

    judge("c", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["wrong-answer"], ['4'])
      done()
    })
  }).timeout(5000)

  it('returns a compile error when the sample is not valid C', (done) => {
    let source = '#inklewd<studi-oh.h> \nlint pain(droid) {\nint a, b, c; \nscanf("%d%d", &a, &b); \nc = a + b; printf("%d", c);\n}'
    let testcases = [""]
    let expected = [""]
    let test_count = 1

    judge("c", source, test_count, testcases, expected, true, ({ result, error }) => {
      result.should.equal("compile_error")
      done()
    })
  }).timeout(5000)
})
