'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import CuteFooter from '@/components/ui/footer';

export default function HomePage() {
  const [inputValueEmail, setInputValueEmail] = useState('');
  const [inputValueName, setInputValueName] = useState('');
  const [inputValuePhone, setInputValuePhone] = useState('');
  const [isPhone, setIsPhone] = useState(false);
  const [loading, setLoading] = useState(true);

  const [lineCoordinates, setLineCoordinates] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  

 useEffect(() => {
   if (typeof window !== 'undefined') {
     setIsPhone(window.matchMedia('(max-width: 600px)').matches);
     setLoading(false); 
   }

   const updateLineCoordinates = () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    setLineCoordinates({
      // 70% of the viewport width
      x1: 0.7 * vw,
      // Start at 0% of the viewport height
      y1: 0,
      // End at 0% of the viewport width
      x2: 0,
      // End at 100% of the viewport height
      y2: vh,
    });
  };

  // Set initial line coordinates
  updateLineCoordinates();

  // Update on window resize
  window.addEventListener('resize', updateLineCoordinates);
  return () => window.removeEventListener('resize', updateLineCoordinates);
 }, []);

  const [info, setInfo] = useState('');

  const isSubmitting = useRef(false);

  const handleInputChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo('');
    setInputValueEmail(event.target.value);
  };

  const handleInputChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo('');
    setInputValueName(event.target.value);
  };

  const handleInputChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo('');
    setInputValuePhone(event.target.value);
  };

  const handleSubmit = async () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    if (inputValueEmail === '' || inputValueName === '') {
      setInfo('Please fill out all forms!');
      isSubmitting.current = false;
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!emailRegex.test(inputValueEmail) || (inputValuePhone && !phoneRegex.test(inputValuePhone))) {
      setInfo('Please make sure all forms are correct!');
      isSubmitting.current = false;
      return;
    }

    const response = await fetch(`/api/supabase-check?email=${inputValueEmail}`, {
      method:'GET',
      headers:{ 'Content-Type': 'application/json' },
    })

    const data = await response.json();
    
    if (data.exists) {
      setInfo('Looks like you already signed up, thank you!');
      isSubmitting.current = false;
      return;
    }

    const sanitizedInput = inputValuePhone === '' ? null : inputValuePhone;
    const payload = {
      Name: inputValueName,
      Email: inputValueEmail,
      Phone: sanitizedInput,
    };

    try {
      const response = await fetch('/api/supabase-insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Data inserted successfully:', result.data);
        setInfo("We'll reach out to you about Nomster soon!");

        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: inputValueEmail,
            name: inputValueName,
          }),
        });

        setTimeout(() => {
          setInputValueName('');
          setInputValueEmail('');
          setInputValuePhone('');

          setInfo('');

          isSubmitting.current = false;
        }, 4000);
      } else {
        setInfo('Error inserting data. Please try again.');
        isSubmitting.current = false;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setInfo('An unexpected error occurred. Please try again later.');
      isSubmitting.current = false;
    }
  };

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

  return (
    <>
      {isPhone ? (
        <motion.div
          initial={{ x: '-100vw', y: '100vh' }}
          animate={{ x: 0, y: 0, background: [
            'linear-gradient(to top, #e6f0e7, #e6f0e7, #FED8DF, #fae7e3)',
          ],}}
          transition={{ ease:'anticipate', duration: 2 }}
          className="z-0 relative flex h-screen w-screen"
        >
          <div className="z-20 m-auto text-center items-center flex flex-col">
          <motion.img initial={{
              y: -50
            }} 
            animate={{
              y:0
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.6
            }}
              
            className="drop-shadow-xl -z-10 transform size-[24rem] -mb-20" src="./nomster_logo2.png">
                 
            </motion.img>
            <div className="mb-8">
              <motion.h1
                initial={{ x: 0, y: -50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="font-bubbly text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold drop-shadow-lg text-white mb-6"
              >
                NOMSTER
              </motion.h1>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row space-x-4 mb-4">
                <Input placeholder="Full Name" value={inputValueName} onChange={handleInputChangeName} />
                <Input type="email" placeholder="Email" value={inputValueEmail} onChange={handleInputChangeEmail} />
              </div>
              <Input
                type="tel"
                placeholder="Phone Number (Optional)"
                className='mb-4'
                value={inputValuePhone}
                onChange={handleInputChangePhone}
              />
              <Button className='bg-[#FFB4C1] text-black hover:bg-[#FFC9D4]' onClick={handleSubmit}>Sign Up</Button>
              <motion.p className="mt-auto text-slate-500 font-thin italic text-xl drop-shadow">
                {info}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="h-screen w-screen overflow-hidden">
          <motion.div
            initial={{ x: '-50vw', y: '50vh', opacity:0}}
            animate={{ x: 0, y: 0, opacity:1, background: [
              'linear-gradient(270deg, #e6f0e7, #cbdbcd)',
              'linear-gradient(180deg, #cbdbcd, #e6f0e7)',
              'linear-gradient(90deg, #e6f0e7, #cbdbcd)',
              'linear-gradient(0deg, #cbdbcd, #e6f0e7)',
            ]}}
            transition={{ease:'anticipate', duration: 2, background: { 
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',}}}
            className="z-0 relative flex h-screen w-screen"
            style={{ clipPath: 'polygon(0 0, 0 0, 70vw 0, 0% 100vh)' }}
          >
            <div className="flex flex-col items-center mt-[30vh]">
              <div className="ml-[1vw] sm:ml-[2vw] md:ml-[3vw] lg:ml-[4vw] flex items-center flex-col">
              <motion.h1
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 7, repeatType: 'loop', ease: 'easeInOut' }}
              className="font-bubbly text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg text-white mb-6 text-center"
              style={{ willChange: 'transform' }} // Performance optimization
                >
                  NOMSTER
                </motion.h1>
                <motion.p
                  initial={{ x: 50, y: -50, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="mt-auto text-slate-500 bold italic md:text-2xl sm:text-xl drop-shadow text-center"
                >
                  Foodie Companion <br></br><br></br>
                  Coming Soon
                </motion.p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: '50vw', y: '-50vh', opacity:0}}
            animate={{ x: 0, y: 0, opacity:1, background: [
              'linear-gradient(270deg, #FED8DF, #FAE7E3)',
              'linear-gradient(180deg, #FAE7E3, #FED8DF)',
              'linear-gradient(90deg, #FED8DF, #FAE7E3)',
              'linear-gradient(0deg, #FAE7E3, #FED8DF)',
            ]}}
            transition={{ ease:'anticipate', duration: 2, background: {
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}}
            className="absolute overflow-hideen flex-col justify-center items-center inset-0 z-10 flex h-screen w-screen"
            style={{ clipPath: 'polygon(70vw 0, 100vw 0, 100vw 100vh, 0% 100vh)' }}
          >
            <div className="ml-auto sm:mt-[30vh] md:mt-[20vh] lg:mt-[10vh] mt-[40vh] mr-[15vw] flex flex-col gap-3 items-center">
            <motion.img initial={{
              y: -50
            }} 
            animate={{
              y:0
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 1.2
            }}
              
            className="drop-shadow-xl -z-10 transform size-[24rem] -mb-20" src="./nomster_logo2.png">
                 
            </motion.img>

              <div className="flex flex-row space-x-4 mb-4">
                <Input placeholder="Full Name" value={inputValueName} onChange={handleInputChangeName} />
                <Input type="email" placeholder="Email" value={inputValueEmail} onChange={handleInputChangeEmail} />
              </div>
              <Input
                type="tel"
                placeholder="Phone Number (Optional)"
                className='mb-4'
                value={inputValuePhone}
                onChange={handleInputChangePhone}
              />
              <Button className='w-full bg-[#FFB4C1] hover:bg-[#FFC9D4] text-black' onClick={handleSubmit}>Sign Up</Button>
              <motion.p className="mt-auto text-slate-500 font-thin italic text-xl drop-shadow">
                {info}
              </motion.p>
            </div>
          </motion.div>
          </div>
          <svg
      className="absolute inset-0 z-20 pointer-events-none w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define the gradient */}
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.3">
            <animate
              attributeName="offset"
              values="-1;2"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="white" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-0.5;2.5"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="white" stopOpacity="0.3">
            <animate
              attributeName="offset"
              values="0;3"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      <line
        x1={lineCoordinates.x1}
        y1={lineCoordinates.y1}
        x2={lineCoordinates.x2}
        y2={lineCoordinates.y2}
        stroke="url(#beam-gradient)"
        strokeWidth="2"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
        }}
      />
    </svg>
    </>
    )}
    </>
  );
}
