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
    <div className="relative inline-block m-3 group w-fit">
      <button
        className={cn(
          'bg-hacktoberfest-black hover:bg-hacktoberfest-dark-green btn btn-lg text-hacktoberfest-light rounded-2xl leading-none border-none h-auto p-2',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
