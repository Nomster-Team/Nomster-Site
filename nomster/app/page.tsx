import Image from 'next/image'
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Index() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        <div className="mt-8 space-x-4">
        </div>
        <a href="#" className="inline-block">
            <Image
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              width={135}
              height={40}
            />
          </a>
      </main> 
    </>
  );
}
