'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPhone(window.matchMedia('(max-width: 600px)').matches);
    }
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Partners', path: '/partners' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full fixed z-50 top-0 py-2 px-6">
      {isPhone ? (
        // Mobile Navigation
        <div className="relative">
        <motion.div
          className="bg-white/30 backdrop-blur-md rounded-full p-4 shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <Link href="/">
              <motion.span
                className="font-bubbly text-2xl font-bold text-slate-700"
                whileHover={{ scale: 1.05 }}
              >
                BonsAI
              </motion.span>
            </Link>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2"
            >
              <div className="bg-white backdrop-blur-md rounded-3xl p-4 shadow-lg">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <motion.div
                      className={`py-2 px-4 rounded-full mb-2 ${
                        pathname === item.path
                          ? 'bg-[#FED8DF]/50 text-slate-700'
                          : 'text-slate-600 hover:bg-[#e6f0e7]/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      ) : (
        // Desktop Navigation
        <motion.div
          className="w-full bg-white/30 backdrop-blur-md rounded-full p-4 drop-shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}

          
        >
          <div className="flex justify-between items-center px-6">
            <Link href="/">
              <motion.span
                className="font-bubbly text-3xl font-bold text-slate-700"
                whileHover={{ scale: 1.05 }}
              >
                BonsAI
              </motion.span>
            </Link>
            <div className="flex gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <motion.div
                    className={`py-2 px-6 rounded-full text-lg transition-colors ${
                      pathname === item.path
                        ? 'bg-[#FED8DF]/50 text-slate-700'
                        : 'text-slate-600 hover:bg-[#e6f0e7]/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}