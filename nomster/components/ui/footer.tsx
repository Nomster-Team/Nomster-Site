import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

const CuteFooter = () => {
  return (
    <footer className="bg-pink-200 p-6 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 duration-300">
          <FaFacebook size={30} />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 duration-300">
          <FaXTwitter size={30} />
        </a>
        <a href="https://instagram.com/nomster.me" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 duration-300">
          <FaInstagram size={30} />
        </a>
      </div>
      <p className="text-pink-700"><span className='font-bubbly'>© BonsAI LLC. All rights reserved.</span></p>
    </footer>
  );
};

export default CuteFooter;