import Header from 'components/Header';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Header />

      <div className=" Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif">
        <div className=" text-center relative mt-[13rem] hero">
          <h1 className="text-[15rem]  text-rose-900">404</h1>
          <div className="absolute  -left-15 -top-19 text-[1.4rem] text-gray-50 mt-[9rem]">
            <h2>We are sorry,Page not found!</h2>
            <p>
              The Page you are looking for might have been removed or it is
              Temporarily unavailable
            </p>
            <Link rel="stylesheet" href="/">
              <button className="rounded-none transition delay-150 duration-300 ease-in-out btn shadow-lg button mt-6 mt-[3rem] bg-[#fafafa] text-[#170f1e] ">
                Go back Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
