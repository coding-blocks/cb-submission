/**
 * Created by umair on 16/12/16.
 */

var request = require("request");
var base64 = require("base-64");

const URL = "http://cb.lk:3000/api/";

module.exports = {
    judge: function(lang, source, test_count, testcases, expected, get_output, callback) {
        source = base64.encode(source);
        for (var i = 0; i < testcases.length; ++i) {
            testcases[i] = base64.encode(testcases[i]);
            expected[i] = base64.encode(expected[i]);
        }
        request({
            uri: URL + "submission",
            method: "POST",
            form: {
                lang: lang,
                source: source,
                test_count: test_count,
                testcases: testcases,
                expected: expected,
                get_output: get_output,
                wait: true
            }
        }, function(error, response, body) {
            console.log(body);
            callback(body);
        });
    }
}
