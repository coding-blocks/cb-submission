const nodemailer = require('nodemailer');
var exports = module.exports = {};

const sendMail = function(){
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        service: 'outlook',
                        auth: {
                            user: process.env.NOTI_EMAIL,
                            pass: process.env.NOTI_EMAIL_PASS
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: process.env.NOTI_EMAIL, // sender address
                        to: 'umair@codingblocks.com, prajjwal@codingblocks.com, arnav@codingblocks.com', // list of receivers
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

