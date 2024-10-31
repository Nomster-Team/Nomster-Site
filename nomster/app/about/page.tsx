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
            'linear-gradient(to top, #e6f0e7, #e6f0e7, #FED8DF, #fae7e3)',
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
  
  if (isPhone) {
    return (
      <motion.div
        animate={{
          background: [
            'linear-gradient(to top, #e6f0e7, #e6f0e7, #FED8DF, #fae7e3)',
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
        <section className="min-h-screen px-4 py-16 flex flex-col items-center justify-center">
          <motion.h1
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 7, repeatType: 'loop', ease: 'easeInOut' }}
            className="font-bubbly text-4xl font-bold drop-shadow-lg text-white mb-8 text-center"
          >
            About Nomster
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-600 text-lg text-center leading-relaxed space-y-4 mb-4"
          >
            <motion.span className="relative inline-block px-2 py-1">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute inset-0 -z-10 bg-white rounded-lg"
              />
              BonsAI
            </motion.span>{' '}
            is an AI-powered gaming studio founded by{' '}
            <motion.span className="relative inline-block px-2 py-1">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute inset-0 -z-10 bg-white rounded-lg"
              />
              computer science students from the University of Florida,
            </motion.span> united by their love for{' '}
            <motion.span className="relative inline-block px-2 py-1">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute inset-0 -z-10 bg-white rounded-lg"
              />
              food, video games, and hackathons.
            </motion.span> Our debut game,{' '}
            <motion.span className="relative inline-block px-2 py-1">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute inset-0 -z-10 bg-white rounded-lg h-9"
              />
              Nomster,
            </motion.span> blends the joy of food with cutting-edge mobile gaming.
          </motion.p>
  
          {/* New Polaroid Frame in Hero Section */}
          <PolaroidFrame
            caption="Adam, founder of BonsAI"
            imageUrl="./DSC00873.JPG"
            absolute={false}
          />
        </section>
  
        {/* Mission Section */}
        <section className="py-16 px-4 bg-[#e6f0e7] min-h-screen flex flex-col items-center justify-center">
          <motion.h1 className="font-bubbly text-3xl font-bold drop-shadow-lg text-white mb-8 text-center">
            Our Inspiration
          </motion.h1>
          <div className="flex flex-col space-y-8">
            <PolaroidFrame 
              imageUrl="./DSC00789.JPG" 
              absolute={false} 
              caption='The inspiration for Nomster comes from co-founder Adam, who grew up in a restaurant family and is surrounded by food lovers.'
            />
            <PolaroidFrame 
              imageUrl="./DSC00777.JPG" 
              absolute={false} 
              caption="Adam saw an opportunity to bring the social and cultural connection of food to the virtual world."
            />
            <PolaroidFrame 
              imageUrl="./DSC00786.JPG" 
              absolute={false} 
              caption="By harnessing the latest in spatial computing and artificial intelligence, BonsAI creates immersive, fun experiences that connect people through food and gaming."
            />
          </div>
        </section>
        
        {/* Team Section with Favorite Food Items */}
        <section className="bg-[#FAE7E3] min-h-screen py-16 px-4 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-xl">
              <motion.h1 className="font-bubbly text-3xl font-bold drop-shadow-lg text-white mb-8 text-center">
                Meet the Team
              </motion.h1>   
              <div className="flex flex-col space-y-6">
              <PolaroidFrame
                caption={`Adam Ababon | CEO\nFavorite food: Scallop Risotto`}
                imageUrl='./IMG_9414.jpg'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Shreyas Adireddy | CTO\nFavorite food: Sushi`}
                imageUrl='./be8688b5076fcff78877c5fbf00a1059.png'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Chuyang Zhang | Developer\nFavorite food: Ice Cream`}
                imageUrl='./448815892_18340409146141507_5044874822570739837_n.jpg'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Eren Chang | Developer\nFavorite food: Hot Pot`}
                imageUrl='./464764638_18308184070162313_5816475910846627647_n.jpg'
                absolute={false}
              />
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>
    );
  }
  
  

  return (
    <>
      {/* Background Animation */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(0deg, #e6f0e7, #e6f0e7, #FED8DF, #fae7e3)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="fixed top-0 left-0 w-full h-full z-[-1]" // Fixed background
      />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-row items-center justify-center px-4 py-16">
        <div className='flex flex-col w-1/2 items-center justify-center px-4 py-16'>
        <motion.h1
          animate={{ y: [20, -20, 20] }}
          transition={{ repeat: Infinity, duration: 7, repeatType: 'loop', ease: 'easeInOut' }}
          className="font-bubbly text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg text-white mb-6 text-center"
          style={{ willChange: 'transform' }} // Performance optimization
        >
          About Nomster
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-600 text-xl md:text-2xl text-center max-w-2xl px-4 leading-relaxed space-y-4"
        >
          <motion.span className="relative inline-block px-2 py-1">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute inset-0 -z-10 bg-white rounded-lg"
            />
            BonsAI
          </motion.span>{' '}
          is an AI-powered gaming studio founded by{' '}
          <motion.span className="relative inline-block px-2 py-1">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute inset-0 -z-10 bg-white rounded-lg"
            />
            computer science students from the University of Florida,
          </motion.span> united by their love for{' '}
          <motion.span className="relative inline-block px-2 py-1">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute inset-0 -z-10 bg-white rounded-lg"
            />
            food, video games, and hackathons.
          </motion.span> Our debut game,{' '}
          <motion.span className="relative inline-block px-2 py-1">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute inset-0 -z-10 bg-white rounded-lg"
            />
            Nomster,
          </motion.span> blends the joy of food with 
          <div className='h-0.1'></div>
          <span className='mt-2'> cutting-edge mobile gaming.</span>
        </motion.p>
        </div>
        <PolaroidFrame caption='Adam, founder of BonsAI' absolute={false} imageUrl='./DSC00873.JPG'></PolaroidFrame>

      </section>

      {/* Mission Section */}
      <section className="p-8 bg-[#e6f0e7] min-h-screen flex flex-col items-center justify-center">
        <motion.h1
          className="-mt-2 font-bubbly text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg text-white mb-6 text-center"
        >
          Our Inspiration
        </motion.h1>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center'>
          <PolaroidFrame 
            imageUrl="./DSC00789.JPG" 
            absolute={false} 
            caption='The inspiration for Nomster comes from co-founder Adam, who grew up in a restaurant family and is surrounded by food lovers.'
          />
          <PolaroidFrame 
            imageUrl='./DSC00777.JPG' 
            absolute={false} 
            caption='Adam saw an opportunity to bring the social and cultural connection of food to the virtual world.'
          />
          <PolaroidFrame 
            imageUrl='./DSC00786.JPG' 
            absolute={false} 
            caption='By harnessing the latest in spatial computing and artificial intelligence, BonsAI creates immersive, fun experiences that connect people through food and gaming.'
          />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-[#FAE7E3] min-h-screen flex items-center justify-center px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full"
        >
          <div className="bg-white/30 backdrop-blur-md rounded-lg p-8 shadow-lg">
            <motion.h1
              className="font-bubbly text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg text-white mb-6 text-center"
            >
              Meet the Team
            </motion.h1>   
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PolaroidFrame
                caption={`Adam Ababon | CEO\nFavorite food: Scallop Risotto`}
                imageUrl='./IMG_9414.jpg'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Shreyas Adireddy | CTO\nFavorite food: Sushi`}
                imageUrl='./be8688b5076fcff78877c5fbf00a1059.png'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Chuyang Zhang | Developer\nFavorite food: Ice Cream`}
                imageUrl='./448815892_18340409146141507_5044874822570739837_n.jpg'
                absolute={false}
              />
              <PolaroidFrame
                caption={`Eren Chang | Developer\nFavorite food: Hot Pot`}
                imageUrl='./464764638_18308184070162313_5816475910846627647_n.jpg'
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