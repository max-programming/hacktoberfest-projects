import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box">
      <Link href="/">
        <a>
          <div className="flex-none">
            <div className="w-10 h-10 m-1 rounded-full">
              <Image
                width={50}
                height={50}
                alt="Hacktoberfest"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrQcAAZ8BDlpDGcMAAAAASUVORK5CYII="
                placeholder="blur"
                src="https://raw.githubusercontent.com/github/explore/b9a0686036b9a0322b1d6f85ec26e4aa3e768a4b/topics/hacktoberfest/hacktoberfest.png"
              />
            </div>
          </div>
          <div className="flex-1 px-2 mx-auto">
            <span className="text-2xl font-bold">Hacktoberfest Projects</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
