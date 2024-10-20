import React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Hello, {firstName}!</h1>
      <p>Welcome to our service. We’re excited to have you on board!</p>
    </div>
  );
};
