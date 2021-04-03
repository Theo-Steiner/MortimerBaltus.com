const nodemailer = require("nodemailer");
const { SMTP_USER, SMTP_PASS } = process.env;

const currentTime = new Date();

exports.handler = function (event, context, callback) {
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
        from: "mail-server@mortimerbaltus.com",
        to: data.recipient,
        replyTo: data.userEmail,
        subject: `New message from ${data.userEmail} on ${currentTime}`,
        html: `<h3>Email from ${data.userEmail}</h3>
        <p>${data.message}</p>
        <footer><p>If you reply to this email your message will be forwarded to ${data.userEmail}</p></footer>`
    })
}