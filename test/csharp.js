let should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    submission = require('../index'),
    util = require('../util/util'),
    judge = submission.judge

const TIMEOUT = 10000;

describe('#Test C# submissions', function () {
  it('returns success for a trivial, and correct sample', function (done) {
    const source = `using System;public class Test{public static void Main(){Console.WriteLine("Hello World");}}`
    const testcases = [""]
    const expected = ["Hello World\n"]
    const test_count = 1

    judge("csharp", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["correct"], expected)
      done()
    });
  }).timeout(TIMEOUT)
  
  it('returns compile error for a trivial, and incorrect sample', function (done) {
    const source = `using System;public class Test{private dynamic full auxiliary(){Console.WriteLine("Hello World");}}`
    const testcases = [""]
    const expected = [""]
    const test_count = 1

    judge("csharp", source, test_count, testcases, expected, true, ({ result, error }) => {
      result.should.equal("compile_error")
      done()
    });
  }).timeout(TIMEOUT)
  
  it('returns sucess for a non-trivial, and correct sample', function (done) {
    const source = `using System;using System.Collections.Generic;namespace StackDemo {class OddIntStacker {static void Main(string[] args) {Stack<int> xs = new Stack<int>();for (int i = 1; i < 10; i += 2) {xs.Push(i);}try {while (true) Console.WriteLine(xs.Pop());}catch (InvalidOperationException) {Console.WriteLine("The Stack is empty!");}}}}`
    const testcases = [""]
    const expected = ["9\n7\n5\n3\n1\nThe Stack is empty!\n"]
    const test_count = 1

    judge("csharp", source, test_count, testcases, expected, true, (body) => {
      util.assertResult(body, "success", ["correct"], expected)
      done()
    });
  }).timeout(TIMEOUT)

})
