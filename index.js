/**
 * Created by umair on 16/12/16.
 */

var request = require("request");

const URL = "http://cb.lk:3000/api/";

module.exports = {
    judge: function(lang, source, testcases, callback) {
        request({
            uri: URL + "submission",
            method: "POST",
            form: {
                lang: lang,
                source: source,
                testcases: testcases
            }
        }, function(error, response, body) {
            console.log(body);
            callback(body);
        });
    }
}
