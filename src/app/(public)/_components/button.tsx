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
      <div className="absolute transition duration-1000 rounded-lg opacity-25 -inset-0 group-hover:bg-gradient-to-r from-2023-bavarian-red-2 via-2023-bavarian-gold-2 to-2023-bavarian-blue-2 blur group-hover:opacity-100 group-hover:duration-200"></div>
      <button
        className={cn(
          'relative p-6 bg-2023-void-2 hover:bg-2023-void-2 btn btn-lg text-white ring-1 ring-2023-manga-3 rounded-2xl leading-none hover:text-shadow hover:shadow-2023-bavarian-gold-3',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
