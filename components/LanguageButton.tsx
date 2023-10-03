import Link from 'next/link';
import Button from './Button';

function LanguageButton({ language }: { language: string }) {
  let url;
  if (language == 'HTML') {
    language = 'HTML5';
    url = `https://cdn.simpleicons.org/${language.toLowerCase()}/default`;
  } else if (language == 'Java') {
    url = 'https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png';
  } else if (language == 'Rust') {
    url = `https://cdn.simpleicons.org/${language.toLowerCase()}/red`;
  } else {
    url = `https://cdn.simpleicons.org/${language.toLowerCase()}/default`;
  }
  return (
    <Link href={`/repos/${language.toLowerCase()}`}>
      <Button>
        {' '}
        <img className="mr-1 h-5 w-5" src={url} alt={language} /> {language}
      </Button>
    </Link>
  );
}

export default LanguageButton;
