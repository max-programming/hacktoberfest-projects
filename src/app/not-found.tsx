'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <div className="h-screen">
        <div className="text-center flex flex-col items-center justify-center w-full">
          <h1 className="text-[15rem] text-primary">404</h1>
          <div className="text-[1.4rem] text-gray-50">
            <h2>Page not found!</h2>
            <p>
              The Page you are looking for might have been removed or it is
              Temporarily unavailable
            </p>
            <Link href="/">
              <motion.button
                initial={{ scale: 0.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ rotate: '4deg' }}
                className={`m-2 button border-0 btn btn-lg btn-clip`}
              >
                Go back home
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
