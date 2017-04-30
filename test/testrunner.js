var Mocha = require('mocha');
var mocha = new Mocha({});
var mail = require('../mail/mail.js');

var exports = module.exports = {};

var runTests = function(){
                    var isJudgeDown = false;

                    mocha.addFile('test/index.js');
                    mocha.addFile('test/python.js');
                    mocha.addFile('test/java.js');
                    
                    mocha.run()
                    .on('pass', function(test) {
                        console.log('Test passed');
                    })
                    .on('fail', function(test, err) {
                        console.log('Test failed');
                        mail.sendMail();
                    });
            }

exports.runTests = runTests;





