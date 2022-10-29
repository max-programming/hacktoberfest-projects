const creators: Record<string, string> = {
  Usman: 'https://twitter.com/MaxProgramming1/',
  Sunrit: 'https://twitter.com/JanaSunrise/'
};

const Footer = () => {
  return (
    <footer className="bg-base-200 text-center text-white py-4 text-lg">
      <div className="container mx-auto px-4">
        <p>
          Made with <span className="text-red-500">💗</span> by{' '}
          {Object.keys(creators).map((creator, index) => (
            <a
              key={creator}
              href={creators[creator]}
              target="_blank"
              rel="noreferrer"
              className="text-primary-500 hover:text-primary-400"
            >
              {creator}
              {index === Object.keys(creators).length - 2
                ? ' and '
                : index === Object.keys(creators).length - 1
                ? ''
                : ', '}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
