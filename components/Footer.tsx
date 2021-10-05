const Footer = () => {
  // Footer with copyright and credits and icons in the right end for the github repo and twitter profile using tailwind and daisy UI
  return (
    <footer className="bg-gray-800 text-center text-white py-4 text-lg">
      <div className="container mx-auto px-4">
        <p>
          Made with <span className="text-red-500">💗</span> by{' '}
          <a
            href="https://twitter.com/MaxProgramming1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Usman
          </a>{' '}
          and{' '}
          <a
            href="https://twitter.com/JanaSunrise/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Sunrit
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
