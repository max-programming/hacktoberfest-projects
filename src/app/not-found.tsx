import Link from 'next/link';
import { Header } from './(public)/_components/header';
import { Button } from './(public)/_components/button';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-61px)] flex items-center justify-center bg-gradient-to-br from-hacktoberfest-blue via-hacktoberfest-light-blue to-hacktoberfest-blue">
        <div className="text-center max-w-2xl mx-auto px-6">
          {/* 404 Number with Animation */}
          <div className="relative mb-8">
            <h1 className="text-[12rem] md:text-[15rem] leading-none text-hacktoberfest-light font-bold animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hacktoberfest-light to-transparent opacity-20 animate-pulse"></div>
          </div>

          {/* Error Message */}
          <div className="space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-hacktoberfest-light mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-xl md:text-2xl text-hacktoberfest-light/80 leading-relaxed">
              The page you're looking for seems to have wandered off into the
              digital void. Don't worry, it happens to the best of us!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button>🏠 Go Back Home</Button>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-4 opacity-60">
            <div className="w-3 h-3 bg-hacktoberfest-light rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-hacktoberfest-light rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-3 h-3 bg-hacktoberfest-light rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
