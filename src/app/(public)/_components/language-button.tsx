import Link from 'next/link';
import { Button } from './button';
import { Icons } from './icons';

interface LanguageButtonProps {
  language: string;
}

export function LanguageButton({ language }: LanguageButtonProps) {
  const lan = language.toLowerCase();

  return (
    <Link href={`/repos/${lan}`}>
      <Button className="flex items-center gap-3">
        <svg className="w-5 h-4">{Icons[lan === 'c++' ? 'cpp' : lan]}</svg>
        {language}
      </Button>
    </Link>
  );
}
