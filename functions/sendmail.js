const nodemailer = require("nodemailer");
const { SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport(
    {
        service: "Outlook365",
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    }
);

const currentTime = new Date();

exports.handler = async (event) => {
    // limits the origin. Will deny access in any other environment thant prod.
    if (event.headers["Origin"] != "https://mortimerbaltus.com") {
        return {
            'result': 'ACCESS DENIED',
            statusCode: 403,
        };
    }

    const data = JSON.parse(event.body);

    await transporter.sendMail({
        from: "contact@mortimerbaltus.com",
        to: "contact@mortimerbaltus.com",
        replyTo: data.userEmail,
        subject: `New message from ${data.userEmail} on ${currentTime}`,
        html: `<h3>Email from ${data.userEmail} to ${data.recipient}</h3>
        <p>${data.message}</p>
        <footer><p>If you reply to this email your message will be forwarded to ${data.userEmail}</p></footer>`
    })
        .then((info) => {
            console.log(info);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    'result': 'OK',
                    'message': info
                })
            }
        })
        .catch(error => {
            console.error(error)
            return {
                statusCode: 418,
                body: JSON.stringify({
                    'result': 'Internal Server Error',
                    'message': error
                })
            }
        })
}