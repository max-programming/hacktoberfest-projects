'use client';

import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <div className="relative inline-block group w-fit transition-all duration-500">
      <button
        className={cn(
          'text-xs sm:text-sm font-bold inline-flex justify-center items-center uppercase py-2 sm:py-3 px-3 sm:px-4 text-center text-white bg-primary-btn-gradient shadow-primary-btn-shadow hover:bg-primary-btn-hover-gradient min-w-16 sm:min-w-20 active:scale-95 active:shadow-lg transition-all duration-150 ease-in-out whitespace-nowrap',
          className
        )}
        {...props}
      >
        <p className="btn-clip group-hover:opacity-0 duration-300 group-hover:scale-95"></p>
        <span className="relative z-20 flex justify-center items-center text-hacktoberfest-light gap-1 sm:gap-2 font-bold">
          {children}
        </span>
      </button>
    </div>
  );
}
