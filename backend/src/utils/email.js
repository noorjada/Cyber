import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '../../.env');
dotenv.config({ path: envPath });

let transporter;

const initializeMailer = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    return transporter;
};

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailer = initializeMailer();
        const verificationLink = `${process.env.FRONTEND_URL}/verify-account?token=${verificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your CyberLab Account',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #0066ff, #00b4ff); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0;">CyberLab</h1>
                    </div>
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #1f2937; margin-top: 0;">Welcome to CyberLab!</h2>
                        <p style="color: #6b7280; line-height: 1.6;">
                            Thank you for signing up. Please verify your email address to get started with your cybersecurity learning journey.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${verificationLink}" style="background: linear-gradient(135deg, #0066ff, #00b4ff); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                Verify Email
                            </a>
                        </div>
                        <p style="color: #6b7280; font-size: 14px;">
                            Or copy this link: <br/>
                            <code style="background: #e5e7eb; padding: 5px 10px; border-radius: 3px; word-break: break-all;">${verificationLink}</code>
                        </p>
                        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                            This link expires in 24 hours.
                        </p>
                    </div>
                </div>
            `,
        };

        await mailer.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
};

export const sendResendVerificationEmail = async (email, verificationToken) => {
    return sendVerificationEmail(email, verificationToken);
};
