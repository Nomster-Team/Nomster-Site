import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#e6f0e7] flex flex-col items-center space-y-10 p-6">
      <h1 className="font-bubbly text-6xl font-bold text-white drop-shadow-lg mt-[20vh]">
        Our Partners
      </h1>
      <div className="p-8 bg-white/50 rounded-lg shadow-lg">
      <img className='w-[14rem]' src='./Screenshot_2024-10-31_at_12.06.34â¯AM-transformed-Photoroom.png'/>
      </div>

    </div>
  );
};

export default ContactPage;