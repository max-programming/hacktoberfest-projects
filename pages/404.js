import Link from 'next/link'
import Image from 'next/image';
import astronaut from '../public/astronaut.png';
import fourgif from '../public/404.gif';
export default function FourOhFour() {
  return (
    <>
      <div className="container-404 flex justify-between  bg-[url('../public/spacebg.jpg')] w-full h-screen">
        <div className="text-container flex flex-col gap-4 justify-center mx-auto md:mx-10 lg:mx-10">
          <div className="img-c mx-auto w-56 md:w-auto lg:w-auto  ">
            <Image src={fourgif} alt="" />
          </div>
          <div className="button bg-cyan-900 rounded-full p-2 w-40  mx-auto">
            <Link href="/">Go back home</Link>
          </div>
        </div>
      </div>
      <div className="astronaut w-48 md:w-72 lg:w-72 animate-bounce ease-in-out delay-1000 duration-1000  absolute top-24  md:top-48 lg:top-48 right-12 lg:right-28 md:right-28">
        <Image src={astronaut} alt="" />
      </div>
    </>
  );
}
