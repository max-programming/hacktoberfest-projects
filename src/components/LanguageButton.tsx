import { motion } from "framer-motion";
import Link from "next/link";

const LanguageButton = ({ language }: { language: string }) => {
  return (
    <Link href={`/repos/${language.toLowerCase()}`}>
      <motion.button
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ rotate: "4deg" }}
        className={`button btn-clip btn-lg btn m-2 border-0 umami--click--${language.toLowerCase()}-button`}
      >
        {language}
      </motion.button>
    </Link>
  );
};

export default LanguageButton;
