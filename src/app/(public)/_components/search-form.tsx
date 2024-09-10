'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';

interface FormValues {
  searchQuery: string;
}

export function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pathname.startsWith('/repos')) {
    return null;
  }

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      searchQuery: searchParams.get('q') as string
    }
  });

  function onSubmit({ searchQuery }: FormValues) {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      const sp = new URLSearchParams(searchParams);
      sp.set('q', trimmedQuery);
      router.push(`${pathname}?${sp.toString()}`);
    }
  }

  return (
    <div className="hidden px-2 mb-3 sm:flex-1 sm:max-w-md sm:mb-0 sm:px-6 sm:inline-flex">
      <form
        className="w-full m-2 mx-auto form-control"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            placeholder="Search"
            className="w-full pr-16 bg-transparent text-neutral-100 input input-bordered border-2023-bavarian-gold-2 focus:outline-2023-bavarian-gold-2"
            type="text"
            {...register('searchQuery', { required: true })}
          />
          <button
            className="absolute top-0 right-0 rounded-l-none btn btn-ghost"
            type="button"
            onClick={() => reset()}
          >
            <GoX color="white" />
          </button>
        </div>
      </form>
    </div>
  );
}
