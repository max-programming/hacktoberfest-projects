import Link from 'next/link'
import Image from 'next/image';
import astronaut from '../public/astronaut.png';
import fourgif from '../public/404.gif';
export default function FourOhFour() {
  return (
    <>
      <div className="container-404 flex justify-between my-auto bg-[url('../public/spacebg.jpg')] w-full h-screen">
        <div className="text-container flex flex-col gap-4 justify-center text-center">
          <div className="img-c mx-5 ">
            <Image
              src={fourgif}
              alt="codeai infrastructure"
              width={300}
              height={300}
            />
          </div>
          <div className=" bg-cyan-900 rounded-full p-2 w-40  mx-auto">
            <Link href="/">Go back home</Link>
          </div>
        </div>
        <div className="astronaut w-48 md:w-56 lg:w-60 animate-bounce ease-in-out delay-1000 duration-1000  absolute top-24  md:top-48 lg:top-48 right-12 lg:right-4 md:right-4">
          <Image src={astronaut} alt="" />
        </div>
      </div>
    </>
  );
}
