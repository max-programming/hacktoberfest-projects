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

  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      searchQuery: searchParams.get('q') as string
    }
  });

  const searchQuery = watch('searchQuery');

  if (!pathname.startsWith('/repos')) {
    return null;
  }

  function onSubmit({ searchQuery }: FormValues) {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      const sp = new URLSearchParams(searchParams);
      sp.set('q', trimmedQuery);
      router.push(`${pathname}?${sp.toString()}`);
    }
  }

  return (
    <div className="w-full">
      <form
        className="w-full form-control"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            placeholder="Search"
            className="w-full pr-16 bg-transparent text-hacktoberfest-light input input-bordered border-hacktoberfest-light focus:border-hacktoberfest-light-blue focus:outline-none placeholder:text-hacktoberfest-beige transition-colors duration-200 text-sm sm:text-base"
            type="text"
            {...register('searchQuery', { required: true })}
          />
          {searchQuery && searchQuery.trim() !== '' && (
            <button
              className="absolute top-0 right-0 rounded-l-none btn btn-ghost btn-sm"
              type="button"
              onClick={() => reset()}
            >
              <GoX color="white" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
