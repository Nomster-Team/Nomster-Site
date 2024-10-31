import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

const CuteFooter = () => {
  return (
    <footer className="bg-white p-6 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://www.tiktok.com/@nomster.me" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 duration-300">
          <FaTiktok size={30} />
        </a>
        <a href="https://instagram.com/nomster.me" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 duration-300">
          <FaInstagram size={30} />
        </a>
        <a href="https://www.youtube.com/channel/UC2VE-S7tAzJzl1HU1tUVJdQ" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 duration-300">
          <FaYoutube size={30} />
        </a>
      </div>
      <p className="text-pink-700"><span className='font-bubbly'>© BonsAI LLC. All rights reserved.</span></p>
    </footer>
  );
};

export default CuteFooter;