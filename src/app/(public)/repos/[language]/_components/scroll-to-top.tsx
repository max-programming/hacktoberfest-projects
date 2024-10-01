'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
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
    window.scrollTo(0, 0);
  }

  return (
    <AnimatePresence>
      {scrollToTopBtn && (
        <motion.div
          className="fixed z-20 bottom-4 right-4"
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="relative flex items-center justify-center w-12 text-2xl transition-transform rounded-full aspect-square bg-hacktoberfest-green text-hacktoberfest-dark-green hover:scale-95 ">
            <ChevronUp className="text-slate-100" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
