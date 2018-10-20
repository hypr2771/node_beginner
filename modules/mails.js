var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dev.test.vcastelluci@gmail.com',
    pass: 'devtestvincent'
  }
})

var mailOptions = {
  from: 'N\'importe qui',
  to: 'vincent.castelluci@gmail.com',
  subject: 'Testing send mail',
  text: 'That was indeed easy'
}

exports.mails = function() {
  transporter.sendMail(mailOptions, function(error, info){
    if(error) console.log(error);
    else console.log(info.response);
  })
}
