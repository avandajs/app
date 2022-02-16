import Message from "./Message";
import nodemailer from "nodemailer";
import { Env } from "../../index";
async function send(msg, state = {}) {
    let message = new Message(state);
    msg(message);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: Env.get('SMTP_HOST'),
        port: Env.get('SMTP_PORT'),
        secure: Env.get('SMTP_SECURE') == 'true',
        auth: {
            user: Env.get('SMTP_USER'),
            pass: Env.get('SMTP_PASS'), // generated ethereal password
        },
    });
    //    send mail now
    let toSend = {
        from: typeof message._from == 'string' ? message._from : `"${message._from.name}" <${message._from.email}>`,
        to: message._to,
        subject: message._subject, // Subject line
    };
    if (message.isHtml) {
        toSend['html'] = message._body;
    }
    else {
        toSend['text'] = message._body;
    }
    try {
        return await transporter.sendMail(toSend);
    }
    catch (e) {
        return false;
    }
}
export { send };
