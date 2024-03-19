import nodemailer from "nodemailer"

export const sendMail = async (email: any, subject: any, text: any) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			service: process.env.SERVICE,
			port: Number(process.env.SMTP_PORT),
			secure: false,
			auth: {
				user: process.env.SMTP_MAIL,
				pass: process.env.SMTP_PASSWORD,
			},
            tls: {
                minVersion: 'TLSv1.2', // Specify the minimum SSL/TLS version
                maxVersion: 'TLSv1.3', // Specify the maximum SSL/TLS version
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