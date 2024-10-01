import Link from 'next/link';
import { Header } from './(public)/_components/header';
import { Button } from './(public)/_components/button';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div>
        <div className="text-center">
          <h1 className="text-[15rem] leading-tight text-hacktoberfest-green">
            404
          </h1>
          <div className="text-[1.4rem] text-hacktoberfest-light-green">
            <h2>Page not found!</h2>
            <p>
              The Page you are looking for might have been removed or it is
              Temporarily unavailable
            </p>
            <Link href="/">
              <Button className="hover:bg-hacktoberfest-green hover:text-hacktoberfest-dark-green">
                Go back Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
