import nodemailer from 'nodemailer';


export default async function nodeMailer(to, subject, text){

    const provider='gmail'

    const transporter = nodemailer.createTransport({
        service: provider,
        auth: {
            user: 'radekmorong@gmail.com',
            pass: 'cxxoqtogpnjsfreg',
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const mailOptions = {
        from: 'radekmorong@gmail.com',
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