import React from 'react';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

// Define meaningful constants for styles
const BUTTON_CLASS = 'relative p-6 bg-2023-void-2 hover:bg-2023-void-2 btn btn-lg text-white ring-1 ring-2023-manga-3 rounded-2xl leading-none hover:text-shadow hover:shadow-2023-bavarian-gold-3';

type ButtonProps = {
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <div className="relative group m-3 w-fit inline-block">
      <div className="absolute -inset-0 group-hover:bg-gradient-to-r from-2023-bavarian-red-2 via-2023-bavarian-gold-2 to-2023-bavarian-blue-2 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <button
        className={`${BUTTON_CLASS} ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
