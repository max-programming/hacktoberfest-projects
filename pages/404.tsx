import Button from 'components/Button';
import Header from 'components/Header';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Header />

      <div>
        <div className="text-center ">
          <h1 className="text-[15rem] text-2023-bavarian-red-1">404</h1>
          <div className="text-[1.4rem] text-gray-50">
            <h2>We are sorry,Page not found!</h2>
            <p>
              The Page you are looking for might have been removed or it is
              Temporarily unavailable
            </p>
            <Link href="/">
              <Button>Go back Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
