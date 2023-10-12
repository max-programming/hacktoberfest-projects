import Link from 'next/link';
import Button from './Button';

function LanguageButton({ language }: { language: {name:string,icon:string} }) {
  return (
    <Link href={`/repos/${language.name.toLowerCase()}`}>
      <Button>
        <i className={language.icon} style={{marginRight:'1rem',fontSize:'1.1em'}}/>
        {language.name}
      </Button>
    </Link>
  );
}

export default LanguageButton;
