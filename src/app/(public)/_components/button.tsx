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
    <div className="relative inline-block group w-fit">
      <button
        className={cn(
          'bg-hacktoberfest-black m-1 hover:bg-hacktoberfest-dark-green btn btn-md md:btn-lg text-hacktoberfest-light rounded-2xl leading-none border-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
