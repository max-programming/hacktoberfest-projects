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
          'text-sm font-bold inline-flex justify-center items-center uppercase py-3 px-4 text-center text-white bg-primary-btn-gradient shadow-primary-btn-shadow hover:bg-primary-btn-hover-gradient min-w-20',
          className
        )}
        {...props}
      >
        <p className="btn-clip group-hover:opacity-0 duration-300 group-hover:scale-95"></p>
        <span className="relative z-20 flex justify-center items-center text-hacktoberfest-light gap-2 font-bold">
          {children}
        </span>
      </button>
    </div>
  );
}
