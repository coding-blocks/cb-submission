let Mocha = require('mocha');
let mocha = new Mocha({});
let mail = require('../mail/mail.js');

let runTests = () => {
  let isJudgeDown = false;
  mocha.addFile('test/index.js');
  mocha.addFile('test/time.js');
  mocha.addFile('test/python.js');
  mocha.addFile('test/java.js');
  mocha.addFile('test/run.js');
  mocha.addFile('test/javascript.js');
  mocha.addFile('test/csharp.js');

  mocha.run()
    .on('pass', (test) => {
      console.log('Test passed');
    })
    .on('fail', (test, error) => {
      console.error('Test fail');
      isJudgeDown = true;
    })
    .on('end',(test) => {
      if(isJudgeDown){
        mail.sendMail();
      }
    });
}

module.exports.runTests = runTests;
