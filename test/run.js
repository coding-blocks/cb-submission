let should = require('chai').should(),
  expect = require('chai').expect,
  base64 = require("base-64"),
  submission = require('../index'),
  util = require('../util/util'),
  run = submission.run

const TIMEOUT = 6000;

describe('Test /run endpoint', function () {
  it('returns correct result for correct sample with no input', function (done) {
    const source = 'public class Main {\n' +
      '    public static void main(String args[]) {' +
      '        System.out.println("Hello World!");' +
      '    }' +
      '}'
    const input = ""
    const expectedOutput = base64.encode("Hello World!\n")

    run("java", source, input, 5, (body) => {
      let result = body.result,
        output = body.data.output

      console.log("Actual Output: ", base64.decode(output))

      result.should.equal("success")
      output.should.equal(expectedOutput)

      done()
    });
  }).timeout(TIMEOUT)

  it('returns correct result for correct sample with input', (done) => {
    const source = '#include<stdio.h>\n' +
      'int main(void) {\n' +
      'int a = 0;\n' +
      'scanf("%d", &a);\n' +
      'printf("%d %d", a, a);\n' +
      'return 0;\n' +
      '}'
    const input = "42"
    const expectedOutput = base64.encode("42 42")

    run("c", source, input, 5, (body) => {
      let { result, data: { output } } = body

      console.log("Actual Output: ", base64.decode(output))

      result.should.equal("success")
      output.should.equal(expectedOutput)

      done()
    })
  }).timeout(TIMEOUT)
})

it('indicates compilation error for incorrect sample', (done) => {
  const source = 'public class Main {\n' +
    '    pubic stetic woid m8(String args[]) {' +
    '        System.out.println("Hello World!");' +
    '    }' +
    '}'
  const input = ""

  run("java", source, input, 5, (body) => {
    let result = body.result,
      error = body.error

    console.log("Actual Output: ", base64.decode(error))

    result.should.equal("compile_error")

    done()
  });
}).timeout(TIMEOUT)
