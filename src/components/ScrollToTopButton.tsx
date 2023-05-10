'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs';

export default function ScrollToTopButton() {
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function onScroll() {
    if (window.scrollY >= 200) {
      setScrollToTopBtn(true);
    } else {
      setScrollToTopBtn(false);
    }
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <AnimatePresence>
      {scrollToTopBtn && (
        <motion.div
          className="fixed cursor-pointer z-20 bottom-2 right-2"
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-16 h-16 rounded-full bg-primary">
            <div className="absolute inset-3">
              <BsArrowUp size={40} className="text-slate-100" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
