import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="font-bubbly text-6xl font-bold text-white drop-shadow-lg mb-8">
        Contact Us
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        We'd love to hear from you! Reach out to us through any of our social media platforms or send us an email.
      </p>
      <div className="flex justify-center space-x-6 mb-8">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
          <FaFacebook size={40} />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
          <FaTwitter size={40} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
          <FaInstagram size={40} />
        </a>
      </div>
      <p className="text-gray-700 mb-4">Email: nomster@nomster.me</p>
    </div>
  );
};

export default ContactPage;