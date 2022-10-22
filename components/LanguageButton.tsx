import { motion } from 'framer-motion';
import Link from 'next/link';

const LanguageButton = ({ language }: { language: string }) => {
  return (
    <Link href={`/repos/${language.toLowerCase()}`}>
      <a>
        <motion.button
          initial={{ scale: 0.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ rotate: '4deg' }}
          className={`m-2 button border-0 btn btn-lg btn-clip umami--click--${language.toLowerCase()}-button`}
        >
          {language}
        </motion.button>
      </a>
    </Link>
  );
};

export default LanguageButton;
