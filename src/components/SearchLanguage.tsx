'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SearchLanguage() {
  const router = useRouter();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get('search');
    router.push(`/repos/${search}`);
  }
  return (
    <form
      className="form-control w-full max-w-xs mx-auto items-center"
      onSubmit={handleSubmit}
    >
      <label className="label">
        <span className="label-text">
          Can&apos;t find the language you want?
        </span>
      </label>
      <div className="flex">
        <input
          type="text"
          placeholder="Search for your language"
          className="input input-bordered w-full input-info max-w-xs rounded-tr-none rounded-br-none"
          name="search"
        />
        <button
          type="submit"
          className="btn btn-square hover:bg-primary-2 hover:text-black rounded-tl-none rounded-bl-none"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
