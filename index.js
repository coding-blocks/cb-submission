/**
 * Created by umair on 16/12/16.
 */

var request = require("request");
var base64 = require("base-64");
let util = require("./util/util.js");

const URL = util.requireFromEnvironment("JUDGE_API_URL");
const ACCESS_TOKEN = util.requireFromEnvironment("JUDGE_API_ACCESS_TOKEN");

module.exports = {
    judge: function(lang, source, test_count, testcases, expected, get_output, callback) {
        source = base64.encode(source);
        for (var i = 0; i < testcases.length; ++i) {
            testcases[i] = base64.encode(testcases[i]);
            expected[i] = base64.encode(expected[i]);
        }
        var form_data = {};
        form_data.lang = lang;
        form_data.source = source;
        form_data.test_count = test_count;
        form_data.input = testcases;
        form_data.expected_output = expected;
        form_data.get_output = get_output;
        request({
            uri: URL + "submission",
            method: "POST",
            form: form_data,
            headers: {
              "access-token": ACCESS_TOKEN
            }
        }, function(error, response, body) {
            console.log(body);
            callback(body);
        });
    }
}
