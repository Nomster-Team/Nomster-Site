import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const CuteFooter = () => {
  return (
    <footer className="bg-pink-200 p-6 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
          <FaFacebook size={30} />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
          <FaTwitter size={30} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
          <FaInstagram size={30} />
        </a>
      </div>
      <p className="text-pink-700"><span className='font-bubbly'>© BonsAI LLC. All rights reserved.</span></p>
    </footer>
  );
};

export default CuteFooter;