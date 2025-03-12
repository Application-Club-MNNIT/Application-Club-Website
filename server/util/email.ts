import nodemailer from "nodemailer";

interface EmailOptions {
    email: string;
    subject: string;
    html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<any> => {
    if (process.env.NODE_ENV === "development") {
        console.log(`${options.html}`);
        return;
    }

    //1.create a transporter=> a service that will send the email, node itself won't.
    const transporter = nodemailer.createTransport({
        host: process.env.GODADDY_EMAIL_HOST as string,
        port: Number(process.env.GODADDY_EMAIL_PORT),
        secure: false, auth: {
            user: process.env.GODADDY_PROFESSIONAL_EMAIL,
            pass: process.env.GODADDY_PROFESSIONAL_EMAIL_PASSWORD,
        },
    });


    //2.define email options
    const mailOptions = {
        from: process.env.GODADDY_PROFESSIONAL_EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.html
    }


    //3.actually send the email with nodemailer
    return transporter.sendMail(mailOptions);
};
//
// const sendContactEmail = async (options) => {
//     //1.create a transporter=> a service that will send the email, node itself won't.
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST_CONTACTUS,
//         port: process.env.EMAIL_PORT_CONTACTUS,
//         secure: false,
//         auth: {
//             user: process.env.EMAIL_USERNAME_CONTACTUS,
//             pass: process.env.EMAIL_PASSWORD_CONTACTUS,
//         },
//     });
//
//     //2.define email options
//     const mailOptions = {
//         from: "jigyashusaini7@gmail.com",
//         to: options.email,
//         subject: options.subject,
//         html: options.html,
//     };
//
//     //3.actually send the email with nodemailer
//     await transporter.sendMail(mailOptions, (err, res) => {
//         if (err) {
//             console.log(`Email was not sent to ${options.email}!`);
//         } else {
//             console.log(`Email sent successfully to ${options.email}!`);
//         }
//     });
//
//     return true;
// };
//
// //this is supposed to throw an error on failure
// const sendPasswordResetEmail = async (options) => {
//     //1.create a transporter=> a service that will send the email, node itself won't.
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         secure: false,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD,
//         },
//     });
//
//     //2.define email options
//     const mailOptions = {
//         from: process.env.EMAIL_USERNAME,
//         to: options.email,
//         subject: options.subject,
//         html: options.html,
//     };
//
//     //3.actually send the email with nodemailer
//     await transporter.sendMail(mailOptions);
// };