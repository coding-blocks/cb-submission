const nodemailer = require('nodemailer');
var exports = module.exports = {};

const sendMail = function(){
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.user,
                            pass: process.env.password
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: 'abc@gmail.com', // sender address
                        to:'omerjerk@gmail.com', // list of receivers
                        subject: 'Notification - Judge is down', // Subject line
                        text: 'Error Judge is down', // plain text body
                        html: '<b>Error Judge is down</b>' // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                }

exports.sendMail = sendMail;

