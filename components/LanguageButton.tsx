import Link from 'next/link';
import Button from './Button';
import Icons from './Icons';

function LanguageButton({ language }: { language: string }) {

  let lan:string = language.toLowerCase();
  lan === "c++" ? lan = "cpp" : "";
  let icon = Icons[lan];

  return (
    <Link href={`/repos/${language.toLowerCase()}`}>
      <Button className='flex items-center gap-3'>
      <svg className='w-5 h-4' >
       {icon}
      </svg>
      
         {language}
      </Button>
    </Link>
  );
} 

export default LanguageButton;
