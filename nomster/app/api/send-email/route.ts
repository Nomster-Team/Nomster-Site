import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, name } = await request.json();
  const { data, error } = await resend.emails.send({
    from: 'nomster@nomster.me',
    to: email,
    subject: 'Welcome to Nomster!',
    react: EmailTemplate({ firstName: name}),
  });

  if (error) {
    return Response.json({ error });
  }

  return Response.json(data);
}