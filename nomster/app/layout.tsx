import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import Image from "next/image"
import * as motion from "framer-motion/client"
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import "./globals.css";
import { reverse } from "dns";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nomster",
  description: "Nomster Landing",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
          <div className="flex h-screen w-screen bg-gradient-to-b from-[#FED8DF] to-blue-200">
            <div className="m-auto text-center">
              <div className="mb-8">
                <motion.h1 
                animate={{y:[0, 30, 0]}} 
                transition={{ repeat: Infinity, duration: 8, repeatType:"loop", ease:"anticipate"}}
                className="font-bubbly text-9xl font-bold drop-shadow-lg text-white mb-10 y-100">NOMSTER</motion.h1>
                <motion.p animate={{ color: ["#e57373", "#ffffff"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }} 
                className="font-bubbly font-thin italic text-3xl">Coming soon</motion.p>
                <Button>Sign Up</Button>
              </div>

              <div className="flex flex-col gap-3">
              </div>
            </div>
          </div>
      </body>
    </html>
  );
}
