import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.replace(/(^|\s)\S/g, letter => letter.toUpperCase());
}

export function sortByName(a: string, b: string): number {
  const lowerA = a.toLowerCase();
  const lowerB = b.toLowerCase();

  if (lowerA < lowerB) return -1;
  if (lowerA > lowerB) return 1;

  // names must be equal
  return 0;
}
