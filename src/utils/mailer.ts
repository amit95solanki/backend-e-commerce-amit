import nodemailer from "nodemailer"

export const sendMail = async (email: any, subject: any, text: any) => {
	try {
		const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false // Accept self-signed certificates
            }
          
		});

		await transporter.sendMail({
			from: process.env.SMTP_MAIL,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};