import nodemailer from 'nodemailer';


export default async function nodeMailer(to, subject, text){

    const provider='gmail'

    const transporter = nodemailer.createTransport({
        service: provider,
        auth: {
            user: process.env.Email_user,
            pass: process.env.Email_pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const mailOptions = {
        from: process.env.Email_user,
        to: to,
        subject: subject,
        text: text,
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('email byl úspěšně odeslán')
        console.log(mailOptions)
    } catch (error) {
        console.log('chyba při odeslání emailu', error)
    }
}