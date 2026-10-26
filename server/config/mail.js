const nodemailer = require('nodemailer')
const keys = require('./keys')

transporter = nodemailer.createTransport({
    host : 'smtp.zoho.com',
    port : 465,
    secure : true,
    auth : {
        user : keys.email.user,
        pass : keys.email.password
    }
})

module.exports = transporter