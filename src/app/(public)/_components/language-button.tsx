import Link from 'next/link';
import { Button } from './button';
import { Icons } from './icons';

interface LanguageButtonProps {
  language: string;
}

export function LanguageButton({ language }: LanguageButtonProps) {
  let lan = language.toLowerCase();

  if (lan === 'c++') 
    lan = 'cpp'
  
  return (
    <Link href={`/repos/${lan}`}>
      <Button>
        <svg className="w-5 h-4">{Icons[lan]}</svg>
        {language}
      </Button>
    </Link>
  );
}
