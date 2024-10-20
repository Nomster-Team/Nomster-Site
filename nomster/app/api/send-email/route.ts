import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();
  console.log(email)
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Hello world',
    react: EmailTemplate({ firstName: 'Chuyang' }),
  });

  if (error) {
    return Response.json({ error });
  }

  return Response.json(data);
}