import Link from 'next/link';
import Button from './Button';

function LanguageButton({ language }: { language: string }) {
  if (language == "HTML") {
    language="HTML5"
  }
  const url = `https://cdn.simpleicons.org/${language.toLowerCase()}/default`;
  return (
    <Link href={`/repos/${language.toLowerCase()}`}>
      <Button>{language} <img className='ml-1 h-5 w-5' src={url} /></Button>
    </Link>
  );
}

export default LanguageButton;
