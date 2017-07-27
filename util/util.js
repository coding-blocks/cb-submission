let R = require('ramda'),
    base64 = require("base-64"),
    util = require("../util/util")

// Require variables from the environment.
const requireFromEnvironment = (variable) => {
  let value = process.env[variable]

  if (! value) {
    console.error("No $" + variable + " found in environment.")
    console.log("You probably forgot to export the correct variables specified in util/env.sh")
    process.exit(1)
  }

  return value
}

const noop = () => undefined

const assertResult = (response, expectedResult, expectedTestResults, expectedTestOutputs) => {
  let testcases = response.data.testcases
  console.log("response.result: ", response.result); 
 console.log("exceptedResult",expectedResult);
  response.result.should.equal(expectedResult)

  R.forEach(
    ([{ result, output }, [expectedResult, expectedOutput]]) => {
      console.log("output: ", output)
      console.log("expectedOutput: ", expectedOutput)
      result.should.equal(expectedResult)
      base64.decode(output)
        .should
        .equal(expectedOutput)
    },

    R.zip(
      testcases,
      R.zip(expectedTestResults, expectedTestOutputs)
    )
  )

}

exports.requireFromEnvironment = requireFromEnvironment
exports.noop = noop
exports.assertResult = assertResult
