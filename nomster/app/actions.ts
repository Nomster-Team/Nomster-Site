import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY); // Replace with your actual API key

// Function to send a thank-you email
export const sendThankYouEmail = async (email: string) => {
    try {
        const response = await resend.emails.send({
            from: 'Adam <adam@nomster.me>',
            to: [email],
            subject: 'Thank You!',
            html: '<p>Thank you for signing up! We appreciate your interest.</p>',
        });
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};