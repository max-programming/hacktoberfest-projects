import Link from 'next/link';
import Button from './Button';

function LanguageButton({ language }: { language: string }) {
  return (
    <Link href={`/repos/${language.toLowerCase()}`}>
      <Button>{language}</Button>
    </Link>
  );
}

export default LanguageButton;
