import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PolaroidFrameProps {
  imageUrl: string;
  caption: string;
  absolute: boolean;
  altText?: string;
}

const PolaroidFrame: React.FC<PolaroidFrameProps> = ({ imageUrl, caption, absolute, altText }) => {
  const [rotationAngle, setRotationAngle] = useState(0);


  return (
    <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "linear" }}
      className={`${absolute && "absolute"} max-w-4xl max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden`}
      style={{ transform: `rotate(${rotationAngle}deg)` }}
    >
      <div className="p-4">
        <div className="bg-gray-200 p-2 rounded-xl">
          <img
            src={imageUrl}
            alt={altText || caption}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700 text-lg font-handwriting">{caption}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PolaroidFrame;