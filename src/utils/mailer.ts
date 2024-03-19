import nodemailer from "nodemailer"

export const sendMail = async (email: any, subject: any, text: any) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			service: process.env.SERVICE,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_MAIL,
				pass: process.env.SMTP_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};