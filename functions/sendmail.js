const nodemailer = require("nodemailer");
const { SMTP_USER, SMTP_PASS } = process.env;

const currentTime = new Date();

exports.handler = function (event, context, callback) {

    if (event.headers["Origin"] != "https://mortimerbaltus.com") {
        return callback(null, { statusCode: 403 });
    }

    let data = JSON.parse(event.body);

    let transporter = nodemailer.createTransport(
        {
            service: "Outlook365",
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS
            }
        }
    );

    transporter.sendMail({
        from: "contact@mortimerbaltus.com",
        to: "contact@mortimerbaltus.com",
        replyTo: data.userEmail,
        subject: `New message from ${data.userEmail} on ${currentTime}`,
        html: `<h3>Email from ${data.userEmail} to ${data.recipient}</h3>
        <p>${data.message}</p>
        <footer><p>If you reply to this email your message will be forwarded to ${data.userEmail}</p></footer>`
    }, function (error, info) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    'result': 'success'
                })
            });
        }
    })
}