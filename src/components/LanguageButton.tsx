'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LanguageButton(props: { language: string }) {
  return (
    <Link href={`/repos/${props.language.toLowerCase()}`}>
      <motion.button
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ rotate: '4deg' }}
        className={`m-2 button border-0 btn btn-lg btn-clip umami--click--${props.language.toLowerCase()}-button`}
      >
        {props.language}
      </motion.button>
    </Link>
  );
}
