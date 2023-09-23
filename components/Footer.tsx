const creators: Record<string, string> = {
  Usman: 'https://twitter.com/MaxProgramming1/',
  Sunrit: 'https://twitter.com/JanaSunrise/',
  'You all': '/contributors'
};

const Footer = () => {
  return (
    <footer className="text-center text-white py-4 text-lg border-t-[0.5px] border-dashed border-t-2023-manga-3">
      <div className="container mx-auto px-4">
        <p>
          Made with <span className="text-red-500">💗</span> by{' '}
          {Object.keys(creators).map((creator, index) => (
            <a
              key={creator}
              href={creators[creator]}
              target="_blank"
              rel="noreferrer"
              className="text-2023-bavarian-gold-2"
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
