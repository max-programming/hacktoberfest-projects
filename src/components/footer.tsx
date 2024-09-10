import Link from 'next/link';

const creators = ['Usman', 'Sunrit', 'you all'];
const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction'
});

export function Footer() {
  return (
    <footer className="text-center text-white py-4 text-lg border-t-[0.5px] border-dashed border-t-2023-manga-3">
      <div className="container px-4 mx-auto">
        <Link href="/contributors">
          Made with <span className="text-red-500">💗</span> by{' '}
          {formatter.format(creators)}
        </Link>
      </div>
    </footer>
  );
}
