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
          <svg className="drop-shadow-xl -z-10 transform size-[12rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1280 1024">
                  <g>
                    <g id="Layer_1">
                      <g>
                        <path fill="#050505" d="M432.74,457.64c-16.16-23.05-32.24-45.56-46.57-69.2-22.26-36.73-44.5-73.5-60.35-113.62-9.34-23.64-16.41-47.97-16.6-73.62-.25-33.64,9.47-63.81,35.89-86.01,29.63-24.89,63.06-28.09,98.22-12.82,29.93,13,50.53,36.24,67.37,63.31,20.37,32.74,34.13,68.4,46,104.86,12.07,37.07,21.24,74.88,28.65,113.13.43,2.25.44,4.65,1.96,7.03,30.29-4.84,60.75-5.28,91.54-.53,3.11-14.19,6.08-28.15,9.24-42.07,13.35-58.8,31.42-115.94,60.52-169.08,14.17-25.87,31.92-48.83,56.71-65.45,19.79-13.27,41.36-21.72,65.7-19.85,40.28,3.09,71.61,28.43,83.99,67.08,8.92,27.83,6.76,55.51-.54,83.21-8.56,32.45-23.3,62.24-39.3,91.51-21.68,39.68-47.05,76.97-73.38,113.64-.67.93-1.25,1.92-1.99,3.07,7.49,6.65,14.97,12.96,22.09,19.66,38.43,36.16,64.89,79.82,80.96,129.93,12.89,40.2,17.95,81.32,12.1,123.2-8.1,57.98-34.84,106.31-78.04,145.76-43.13,39.39-94.83,60.9-151.1,72.75-67.98,14.32-135.7,12.74-202.79-5.46-42.56-11.55-81.95-29.86-115.7-58.82-46.96-40.3-76.93-90.41-83.84-152.46-9.77-87.78,14.32-165.68,71.53-233.1,10.47-12.34,22.29-23.38,34.98-33.47.89-.71,1.68-1.56,2.75-2.57ZM456.97,461.56c-4.37,3.69-8.02,6.84-11.73,9.9-31.18,25.77-57.27,55.76-75.28,92.21-22.2,44.93-32.09,92.52-29.34,142.62,1.44,26.26,5.85,51.92,16.74,76.11,22.67,50.39,59.31,87.51,107.99,112.97,43.95,22.99,91.31,33.66,140.36,37.74,29.32,2.44,58.57,1.1,87.67-3.07,49.15-7.05,95.83-21.47,138.1-48.1,47.42-29.88,80.44-71.09,96.89-125.13,13.69-44.97,12.44-90.09.95-135.05-15.09-59.07-47.32-107.76-92.45-148.23-6.52-5.85-13.3-11.41-20.16-17.27,2.57-4.11,4.89-7.95,7.34-11.69,19.15-29.25,39.39-57.79,57.45-87.75,22.22-36.85,42.91-74.42,53.93-116.45,7.1-27.07,9.14-54.04-1.42-80.91-14.35-36.52-53.78-55.71-91.02-43.92-25.48,8.06-44.72,24.59-60.51,45.46-18.95,25.05-31.88,53.38-43.44,82.35-18.14,45.45-29.81,92.78-40.06,140.5-1.98,9.22-3.88,18.46-5.92,28.21-40.51-8.27-80.69-7.82-120.94.59-.46-2.23-.78-3.66-1.04-5.11-7.62-42.31-17.15-84.16-30.15-125.16-12.5-39.44-26.89-78.09-50.32-112.66-13.73-20.26-30.21-37.52-52.2-49.13-31.02-16.38-68.82-9.17-90.72,18.16-17.35,21.65-21.9,46.93-19.34,73.9,2.25,23.67,10.27,45.72,19.88,67.18,24.38,54.47,56.63,104.35,90.08,153.52,6.26,9.2,12.28,18.56,18.65,28.21Z"/>
                        <path fill="#fefefe" d="M456.97,461.56c-6.37-9.65-12.39-19.01-18.65-28.21-33.45-49.17-65.7-99.05-90.08-153.52-9.61-21.46-17.63-43.51-19.88-67.18-2.56-26.97,1.99-52.24,19.34-73.9,21.9-27.33,59.69-34.54,90.72-18.16,21.99,11.61,38.47,28.87,52.2,49.13,23.43,34.57,37.82,73.22,50.32,112.66,12.99,41,22.53,82.85,30.15,125.16.26,1.45.59,2.88,1.04,5.11,40.26-8.42,80.43-8.87,120.94-.59,2.05-9.76,3.94-19,5.92-28.21,10.25-47.72,21.92-95.05,40.06-140.5,11.56-28.96,24.48-57.3,43.44-82.35,15.79-20.87,35.03-37.4,60.51-45.46,37.24-11.79,76.67,7.41,91.02,43.92,10.56,26.87,8.52,53.84,1.42,80.91-11.02,42.03-31.72,79.6-53.93,116.45-18.06,29.96-38.3,58.5-57.45,87.75-2.45,3.75-4.77,7.59-7.34,11.69,6.86,5.86,13.64,11.43,20.16,17.27,45.13,40.47,77.36,89.16,92.45,148.23,11.49,44.97,12.74,90.09-.95,135.05-16.45,54.04-49.47,95.25-96.89,125.13-42.27,26.63-88.95,41.05-138.1,48.1-29.1,4.17-58.35,5.51-87.67,3.07-49.05-4.08-96.41-14.75-140.36-37.74-48.68-25.47-85.32-62.59-107.99-112.97-10.89-24.2-15.3-49.85-16.74-76.11-2.75-50.1,7.14-97.69,29.34-142.62,18.01-36.44,44.09-66.44,75.28-92.21,3.71-3.07,7.36-6.21,11.73-9.9ZM380.89,745.56c.3,28.09,21.14,48.64,48.94,48.24,27.06-.39,48.48-21.98,48.14-48.51-.37-28.28-21.89-48.91-50.6-48.51-26.17.37-46.76,21.99-46.48,48.78ZM847.2,696.58c-24.95-1.19-47.05,19.93-48.26,46.12-1.3,28.05,17.99,49.65,45.56,51.02,26.37,1.31,49.35-19.18,50.45-44.97,1.25-29.41-18.29-50.76-47.75-52.16ZM632.65,763.1c2.16,2.76,3.99,5.31,6.03,7.69,15.38,17.99,44.07,17.89,59.48-.15,2.8-3.28,3.8-6.67.86-10.33-2.63-3.27-6.51-3.53-10.74-.78-1.39.9-2.64,2.02-3.99,2.99-14.43,10.45-28.57,7.52-38.43-7.34-7.13-10.75-6.91-22.58-6.74-34.59.03-2.37,1.75-2.55,3.16-3.22,9.52-4.56,18.05-10.62,26.17-17.29,4.45-3.66,5.26-7.57,2.61-11.21-2.82-3.88-7.54-4.25-12.34-.89-5.04,3.52-9.86,7.34-15.13,10.57-7.29,4.46-14.45,4.59-21.65.18-5.67-3.48-11.13-7.28-16.79-10.78-5.64-3.5-10.22-2.96-13.2,1.3-2.88,4.11-1.64,7.92,4.2,11.87,8.68,5.87,17.47,11.6,26.92,16.19,1.79.87,2.91,1.69,2.81,4.01-.29,6.64-.09,13.31-.46,19.95-.46,8.24-4.5,14.95-10.31,20.46-8.95,8.5-19.08,9.32-29.64,2.75-2.96-1.84-5.75-3.96-8.66-5.89-3.64-2.42-7.09-1.79-9.86,1.3-2.67,2.98-2.44,6.45-.28,9.67,1.67,2.51,3.96,4.48,6.38,6.27,20.53,15.17,43.91,10.35,59.61-12.75ZM471.98,644.24c-.02,13.1,3.99,23.72,11.02,31.29,9.67,10.43,25.87,11.16,36.44,1.66,17.69-15.91,16.14-48.66-2.98-62.72-9.81-7.21-22.07-6.8-31.26,1.16-9.32,8.08-12.7,18.79-13.22,28.6ZM805.16,647.93c-.12-10.35-2.45-19.2-8.24-26.95-10.92-14.61-28.87-15.55-41.23-2.21-12.89,13.91-13.8,38.59-1.97,53.49,12.22,15.39,32.82,14.87,44.06-1.21,5-7.15,7.42-15.17,7.38-23.13Z"/>
                        <path fill="#d94924" d="M380.89,745.56c-.28-26.8,20.31-48.42,46.48-48.78,28.7-.4,50.23,20.23,50.6,48.51.35,26.54-21.08,48.13-48.14,48.51-27.8.4-48.64-20.15-48.94-48.24Z"/>
                        <path fill="#d94924" d="M847.2,696.58c29.46,1.41,49,22.76,47.75,52.16-1.1,25.79-24.08,46.28-50.45,44.97-27.57-1.37-46.86-22.96-45.56-51.02,1.21-26.19,23.31-47.31,48.26-46.12Z"/>
                        <path fill="#050505" d="M632.65,763.1c-15.7,23.1-39.08,27.92-59.61,12.75-2.42-1.79-4.71-3.77-6.38-6.27-2.15-3.22-2.38-6.69.28-9.67,2.77-3.1,6.22-3.72,9.86-1.3,2.91,1.93,5.7,4.05,8.66,5.89,10.56,6.56,20.69,5.74,29.64-2.75,5.81-5.52,9.85-12.22,10.31-20.46.37-6.64.17-13.31.46-19.95.1-2.32-1.02-3.14-2.81-4.01-9.45-4.59-18.23-10.32-26.92-16.19-5.85-3.95-7.08-7.76-4.2-11.87,2.98-4.26,7.56-4.8,13.2-1.3,5.65,3.5,11.12,7.31,16.79,10.78,7.19,4.41,14.36,4.28,21.65-.18,5.27-3.22,10.09-7.04,15.13-10.57,4.8-3.36,9.52-2.99,12.34.89,2.65,3.64,1.84,7.54-2.61,11.21-8.12,6.67-16.65,12.73-26.17,17.29-1.4.67-3.12.85-3.16,3.22-.17,12.01-.39,23.85,6.74,34.59,9.86,14.87,24,17.8,38.43,7.34,1.35-.98,2.6-2.09,3.99-2.99,4.23-2.74,8.11-2.49,10.74.78,2.94,3.66,1.94,7.05-.86,10.33-15.41,18.04-44.09,18.14-59.48.15-2.03-2.38-3.87-4.93-6.03-7.69Z"/>
                        <path fill="#050505" d="M471.98,644.24c.52-9.82,3.9-20.52,13.22-28.6,9.19-7.96,21.45-8.37,31.26-1.16,19.12,14.06,20.68,46.81,2.98,62.72-10.57,9.51-26.77,8.77-36.44-1.66-7.03-7.58-11.03-18.19-11.02-31.29Z"/>
                        <path fill="#050505" d="M805.16,647.93c.04,7.96-2.38,15.98-7.38,23.13-11.24,16.08-31.84,16.6-44.06,1.21-11.83-14.9-10.92-39.58,1.97-53.49,12.36-13.34,30.31-12.4,41.23,2.21,5.79,7.75,8.11,16.6,8.24,26.95Z"/>
                      </g>
                    </g>
                  </g>
                </svg>
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
            <svg className="drop-shadow-xl -z-10 transform size-[12rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1280 1024">
                  <g>
                    <g id="Layer_1">
                      <g>
                        <path fill="#050505" d="M432.74,457.64c-16.16-23.05-32.24-45.56-46.57-69.2-22.26-36.73-44.5-73.5-60.35-113.62-9.34-23.64-16.41-47.97-16.6-73.62-.25-33.64,9.47-63.81,35.89-86.01,29.63-24.89,63.06-28.09,98.22-12.82,29.93,13,50.53,36.24,67.37,63.31,20.37,32.74,34.13,68.4,46,104.86,12.07,37.07,21.24,74.88,28.65,113.13.43,2.25.44,4.65,1.96,7.03,30.29-4.84,60.75-5.28,91.54-.53,3.11-14.19,6.08-28.15,9.24-42.07,13.35-58.8,31.42-115.94,60.52-169.08,14.17-25.87,31.92-48.83,56.71-65.45,19.79-13.27,41.36-21.72,65.7-19.85,40.28,3.09,71.61,28.43,83.99,67.08,8.92,27.83,6.76,55.51-.54,83.21-8.56,32.45-23.3,62.24-39.3,91.51-21.68,39.68-47.05,76.97-73.38,113.64-.67.93-1.25,1.92-1.99,3.07,7.49,6.65,14.97,12.96,22.09,19.66,38.43,36.16,64.89,79.82,80.96,129.93,12.89,40.2,17.95,81.32,12.1,123.2-8.1,57.98-34.84,106.31-78.04,145.76-43.13,39.39-94.83,60.9-151.1,72.75-67.98,14.32-135.7,12.74-202.79-5.46-42.56-11.55-81.95-29.86-115.7-58.82-46.96-40.3-76.93-90.41-83.84-152.46-9.77-87.78,14.32-165.68,71.53-233.1,10.47-12.34,22.29-23.38,34.98-33.47.89-.71,1.68-1.56,2.75-2.57ZM456.97,461.56c-4.37,3.69-8.02,6.84-11.73,9.9-31.18,25.77-57.27,55.76-75.28,92.21-22.2,44.93-32.09,92.52-29.34,142.62,1.44,26.26,5.85,51.92,16.74,76.11,22.67,50.39,59.31,87.51,107.99,112.97,43.95,22.99,91.31,33.66,140.36,37.74,29.32,2.44,58.57,1.1,87.67-3.07,49.15-7.05,95.83-21.47,138.1-48.1,47.42-29.88,80.44-71.09,96.89-125.13,13.69-44.97,12.44-90.09.95-135.05-15.09-59.07-47.32-107.76-92.45-148.23-6.52-5.85-13.3-11.41-20.16-17.27,2.57-4.11,4.89-7.95,7.34-11.69,19.15-29.25,39.39-57.79,57.45-87.75,22.22-36.85,42.91-74.42,53.93-116.45,7.1-27.07,9.14-54.04-1.42-80.91-14.35-36.52-53.78-55.71-91.02-43.92-25.48,8.06-44.72,24.59-60.51,45.46-18.95,25.05-31.88,53.38-43.44,82.35-18.14,45.45-29.81,92.78-40.06,140.5-1.98,9.22-3.88,18.46-5.92,28.21-40.51-8.27-80.69-7.82-120.94.59-.46-2.23-.78-3.66-1.04-5.11-7.62-42.31-17.15-84.16-30.15-125.16-12.5-39.44-26.89-78.09-50.32-112.66-13.73-20.26-30.21-37.52-52.2-49.13-31.02-16.38-68.82-9.17-90.72,18.16-17.35,21.65-21.9,46.93-19.34,73.9,2.25,23.67,10.27,45.72,19.88,67.18,24.38,54.47,56.63,104.35,90.08,153.52,6.26,9.2,12.28,18.56,18.65,28.21Z"/>
                        <path fill="#fefefe" d="M456.97,461.56c-6.37-9.65-12.39-19.01-18.65-28.21-33.45-49.17-65.7-99.05-90.08-153.52-9.61-21.46-17.63-43.51-19.88-67.18-2.56-26.97,1.99-52.24,19.34-73.9,21.9-27.33,59.69-34.54,90.72-18.16,21.99,11.61,38.47,28.87,52.2,49.13,23.43,34.57,37.82,73.22,50.32,112.66,12.99,41,22.53,82.85,30.15,125.16.26,1.45.59,2.88,1.04,5.11,40.26-8.42,80.43-8.87,120.94-.59,2.05-9.76,3.94-19,5.92-28.21,10.25-47.72,21.92-95.05,40.06-140.5,11.56-28.96,24.48-57.3,43.44-82.35,15.79-20.87,35.03-37.4,60.51-45.46,37.24-11.79,76.67,7.41,91.02,43.92,10.56,26.87,8.52,53.84,1.42,80.91-11.02,42.03-31.72,79.6-53.93,116.45-18.06,29.96-38.3,58.5-57.45,87.75-2.45,3.75-4.77,7.59-7.34,11.69,6.86,5.86,13.64,11.43,20.16,17.27,45.13,40.47,77.36,89.16,92.45,148.23,11.49,44.97,12.74,90.09-.95,135.05-16.45,54.04-49.47,95.25-96.89,125.13-42.27,26.63-88.95,41.05-138.1,48.1-29.1,4.17-58.35,5.51-87.67,3.07-49.05-4.08-96.41-14.75-140.36-37.74-48.68-25.47-85.32-62.59-107.99-112.97-10.89-24.2-15.3-49.85-16.74-76.11-2.75-50.1,7.14-97.69,29.34-142.62,18.01-36.44,44.09-66.44,75.28-92.21,3.71-3.07,7.36-6.21,11.73-9.9ZM380.89,745.56c.3,28.09,21.14,48.64,48.94,48.24,27.06-.39,48.48-21.98,48.14-48.51-.37-28.28-21.89-48.91-50.6-48.51-26.17.37-46.76,21.99-46.48,48.78ZM847.2,696.58c-24.95-1.19-47.05,19.93-48.26,46.12-1.3,28.05,17.99,49.65,45.56,51.02,26.37,1.31,49.35-19.18,50.45-44.97,1.25-29.41-18.29-50.76-47.75-52.16ZM632.65,763.1c2.16,2.76,3.99,5.31,6.03,7.69,15.38,17.99,44.07,17.89,59.48-.15,2.8-3.28,3.8-6.67.86-10.33-2.63-3.27-6.51-3.53-10.74-.78-1.39.9-2.64,2.02-3.99,2.99-14.43,10.45-28.57,7.52-38.43-7.34-7.13-10.75-6.91-22.58-6.74-34.59.03-2.37,1.75-2.55,3.16-3.22,9.52-4.56,18.05-10.62,26.17-17.29,4.45-3.66,5.26-7.57,2.61-11.21-2.82-3.88-7.54-4.25-12.34-.89-5.04,3.52-9.86,7.34-15.13,10.57-7.29,4.46-14.45,4.59-21.65.18-5.67-3.48-11.13-7.28-16.79-10.78-5.64-3.5-10.22-2.96-13.2,1.3-2.88,4.11-1.64,7.92,4.2,11.87,8.68,5.87,17.47,11.6,26.92,16.19,1.79.87,2.91,1.69,2.81,4.01-.29,6.64-.09,13.31-.46,19.95-.46,8.24-4.5,14.95-10.31,20.46-8.95,8.5-19.08,9.32-29.64,2.75-2.96-1.84-5.75-3.96-8.66-5.89-3.64-2.42-7.09-1.79-9.86,1.3-2.67,2.98-2.44,6.45-.28,9.67,1.67,2.51,3.96,4.48,6.38,6.27,20.53,15.17,43.91,10.35,59.61-12.75ZM471.98,644.24c-.02,13.1,3.99,23.72,11.02,31.29,9.67,10.43,25.87,11.16,36.44,1.66,17.69-15.91,16.14-48.66-2.98-62.72-9.81-7.21-22.07-6.8-31.26,1.16-9.32,8.08-12.7,18.79-13.22,28.6ZM805.16,647.93c-.12-10.35-2.45-19.2-8.24-26.95-10.92-14.61-28.87-15.55-41.23-2.21-12.89,13.91-13.8,38.59-1.97,53.49,12.22,15.39,32.82,14.87,44.06-1.21,5-7.15,7.42-15.17,7.38-23.13Z"/>
                        <path fill="#d94924" d="M380.89,745.56c-.28-26.8,20.31-48.42,46.48-48.78,28.7-.4,50.23,20.23,50.6,48.51.35,26.54-21.08,48.13-48.14,48.51-27.8.4-48.64-20.15-48.94-48.24Z"/>
                        <path fill="#d94924" d="M847.2,696.58c29.46,1.41,49,22.76,47.75,52.16-1.1,25.79-24.08,46.28-50.45,44.97-27.57-1.37-46.86-22.96-45.56-51.02,1.21-26.19,23.31-47.31,48.26-46.12Z"/>
                        <path fill="#050505" d="M632.65,763.1c-15.7,23.1-39.08,27.92-59.61,12.75-2.42-1.79-4.71-3.77-6.38-6.27-2.15-3.22-2.38-6.69.28-9.67,2.77-3.1,6.22-3.72,9.86-1.3,2.91,1.93,5.7,4.05,8.66,5.89,10.56,6.56,20.69,5.74,29.64-2.75,5.81-5.52,9.85-12.22,10.31-20.46.37-6.64.17-13.31.46-19.95.1-2.32-1.02-3.14-2.81-4.01-9.45-4.59-18.23-10.32-26.92-16.19-5.85-3.95-7.08-7.76-4.2-11.87,2.98-4.26,7.56-4.8,13.2-1.3,5.65,3.5,11.12,7.31,16.79,10.78,7.19,4.41,14.36,4.28,21.65-.18,5.27-3.22,10.09-7.04,15.13-10.57,4.8-3.36,9.52-2.99,12.34.89,2.65,3.64,1.84,7.54-2.61,11.21-8.12,6.67-16.65,12.73-26.17,17.29-1.4.67-3.12.85-3.16,3.22-.17,12.01-.39,23.85,6.74,34.59,9.86,14.87,24,17.8,38.43,7.34,1.35-.98,2.6-2.09,3.99-2.99,4.23-2.74,8.11-2.49,10.74.78,2.94,3.66,1.94,7.05-.86,10.33-15.41,18.04-44.09,18.14-59.48.15-2.03-2.38-3.87-4.93-6.03-7.69Z"/>
                        <path fill="#050505" d="M471.98,644.24c.52-9.82,3.9-20.52,13.22-28.6,9.19-7.96,21.45-8.37,31.26-1.16,19.12,14.06,20.68,46.81,2.98,62.72-10.57,9.51-26.77,8.77-36.44-1.66-7.03-7.58-11.03-18.19-11.02-31.29Z"/>
                        <path fill="#050505" d="M805.16,647.93c.04,7.96-2.38,15.98-7.38,23.13-11.24,16.08-31.84,16.6-44.06,1.21-11.83-14.9-10.92-39.58,1.97-53.49,12.36-13.34,30.31-12.4,41.23,2.21,5.79,7.75,8.11,16.6,8.24,26.95Z"/>
                      </g>
                    </g>
                  </g>
                </svg>

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
