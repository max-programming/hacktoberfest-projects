import Link from 'next/link';

import { motion } from 'framer-motion';

import languages from 'assets/languages.json';

const { main: mainLanguages, others: otherLanguages } = languages;

const Hero = () => {
  return (
    <div
      className="min-h-screen hero"
      style={{
        backgroundImage:
          'url("https://hacktoberfest.digitalocean.com/_nuxt/img/logo-hacktoberfest-full.f42e3b1.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '80%'
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Select your language</h1>
          <p className="mb-5">
            Select the programming language you would like to find repositories
            for.
          </p>
          {mainLanguages.map(language => (
            <Link key={language} href={`/repos/${language.toLowerCase()}`}>
              <a>
                <motion.button
                  initial={{ scale: 0.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ rotate: '4deg' }}
                  className="m-2 button border-0 btn btn-lg"
                >
                  {language}
                </motion.button>
              </a>
            </Link>
          ))}

          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              className="m-1 btn btn-lg hover:bg-primary-2 hover:text-black"
            >
              Other languages
            </div>

            <ul
              tabIndex={0}
              className="h-64 p-2 overflow-y-scroll shadow menu dropdown-content bg-base-100 rounded-box w-60"
            >
              {otherLanguages.sort().map(language => (
                <li key={language}>
                  <Link href={`/repos/${language.toLowerCase()}`}>
                    <a>{language}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <a href="https://github.com/max-programming/hacktoberfest-projects/">
            <button className="m-2 border-0 hover:bg-primary-2 hover:text-black btn btn-lg">
              Add another language
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
