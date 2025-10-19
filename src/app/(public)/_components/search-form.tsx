'use client';

import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';
import { useQueryState } from 'nuqs';

interface FormValues {
  searchQuery: string;
}

export function SearchForm() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useQueryState('q', {
    defaultValue: '',
    parse: (value: string) => value,
    serialize: (value: string) => value || ''
  });

  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      searchQuery: searchQuery
    }
  });

  const queryValue = watch('searchQuery');

  if (!pathname.startsWith('/repos')) {
    return null;
  }

  function onSubmit({ searchQuery }: FormValues) {
    if (!pathname.startsWith('/repos')) return;

    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      void setSearchQuery(trimmedQuery);
    }
  }

  return (
    <div className="w-full">
      <form className="w-full form-control" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            placeholder="Search"
            className="w-full pr-16 bg-transparent text-hacktoberfest-light input input-bordered border-hacktoberfest-light focus:border-hacktoberfest-light-blue focus:outline-none placeholder:text-hacktoberfest-beige transition-colors duration-200 text-sm sm:text-base"
            type="text"
            {...register('searchQuery', { required: true })}
          />
          {queryValue && queryValue.trim() !== '' && (
            <button
              className="absolute top-0 right-0 rounded-l-none btn btn-ghost btn-sm"
              type="button"
              onClick={() => {
                reset();
                void setSearchQuery(null);
              }}
            >
              <GoX color="white" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
