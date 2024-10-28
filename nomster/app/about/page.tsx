'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PolaroidFrame from '@/components/ui/polaroidframe';
import CuteFooter from '@/components/ui/footer';

export default function AboutPage() {
  const [isPhone, setIsPhone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPhone(window.matchMedia('(max-width: 600px)').matches);
      setLoading(false);
    }
    
  }, []);

  if (loading) {
    return (
      <motion.div
        animate={{
          background: [
            'linear-gradient(to top, #FED8DF, #FED8DF)',
            'linear-gradient(to top, #FED8DF, #BFDBFE)',
            'linear-gradient(to top, #BFDBFE, #BFDBFE)',
            'linear-gradient(to top, #BFDBFE, #FED8DF)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="h-screen w-screen"
      />
    );
  }

  return (
    <>
    <motion.div
      animate={{
        background: [
          'linear-gradient(to top, #FED8DF, #FED8DF)',
          'linear-gradient(to top, #FED8DF, #BFDBFE)',
          'linear-gradient(to top, #BFDBFE, #BFDBFE)',
          'linear-gradient(to top, #BFDBFE, #FED8DF)',
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className="min-h-screen w-full overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center">
        <motion.h1
          animate={{ y: [20, -20, 20] }}
          transition={{ repeat: Infinity, duration: 7, repeatType: 'loop', ease: 'easeInOut' }}
          className="font-bubbly text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg text-white mb-6"
        >
          About Nomster
        </motion.h1>
            <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-slate-600 text-xl md:text-2xl text-center max-w-2xl px-4 leading-relaxed"
      >
        <motion.span
          className="relative inline-block px-2 py-1"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute inset-0 -z-10 bg-white rounded-lg"
          />
          BonsAI
        </motion.span>{' '}
        is an AI-powered gaming studio founded by{' '}
        <motion.span
          className="relative inline-block px-2 py-1 mt-2"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute inset-0 -z-10 bg-white rounded-lg"
          />
          computer science students from the University of Florida
        </motion.span>, united by their love for{' '}
        <motion.span
          className="relative inline-block px-2 py-1 mt-2 mb-1"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="absolute inset-0 -z-10 bg-white rounded-lg"
          />
          food, video games, and hackathons
        </motion.span>. Our debut game,{' '}
        <motion.span
          className="relative inline-block px-2 py-1 mt-1 mb-1"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="absolute inset-0 -z-10 bg-white rounded-lg"
          />
          Nomster
        </motion.span>, blends the joy of food with cutting-edge mobile gaming.
      </motion.p>
      </section>

      {/* Mission Section */}
      <section className="p-4 bg-[#FED8DF] min-h-screen flex flex-col items-center justify-center">
      <motion.h1
          className="font-bubbly text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg text-white mb-6"
        >
          Our Inspiration
        </motion.h1>
        <div className='w-full items-center grid grid-cols-3 justify-items-center'>
        <PolaroidFrame imageUrl="./DSC00789.JPG" absolute={false} caption='The inspiration for Nomster comes from co-founder Adam, who grew up in a restaurant family and is surrounded by food lovers, including his girlfriend, a food science major at Cornell.'></PolaroidFrame>
        <PolaroidFrame imageUrl='./DSC00777.JPG' absolute={false} caption='Adam saw an opportunity to bring the social and cultural connection of food to the virtual world.'></PolaroidFrame>
        <PolaroidFrame imageUrl='./DSC00786.JPG' absolute={false} caption='By harnessing the latest in spatial computing and artificial intelligence, BonsAI creates immersive, fun experiences that connect people through food and gaming.'></PolaroidFrame>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-[#BFDBFE] min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full"
        >
          <div className="bg-white/30 backdrop-blur-md rounded-lg p-8 shadow-xl">
          <motion.h1
          className="font-bubbly text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg text-white mb-6"
        >
          Meet the Team
        </motion.h1>   
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PolaroidFrame
                caption={`Adam Ababon | Co-founder`}
                imageUrl='./Adam.jpg'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Shreyas Adireddy | Co-founder`}
                imageUrl='./out.jpg'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Chuyang Zhang | Full-Stack Developer`}
                imageUrl='./20241027_013316.jpg'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Eren Chang | Full-Stack Developer`}
                imageUrl='./Photo on 3-1-24 at 2.08 PM.jpg'
                absolute={false}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      {/*<section className="min-h-screen flex items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full"
        >
          <div className="bg-white/30 backdrop-blur-md rounded-lg p-8 shadow-xl">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Vision</h2>
            <p className="text-xl text-slate-700">
              Creating a world where everyone can discover and enjoy amazing dining experiences, one meal at a time.
            </p>
          </div>
        </motion.div>
      </section>
            */}
    </motion.div>
    </>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  );
}