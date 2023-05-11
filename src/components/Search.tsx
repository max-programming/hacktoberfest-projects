'use client';
import { useForm } from 'react-hook-form';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { GoX } from 'react-icons/go';

interface FormValues {
  searchQuery: string;
}

export default function Search() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      searchQuery: searchParams.get('q') as string,
    },
  });
  function onSubmit(values: FormValues) {
    const { q, language, ...rest } = Object.fromEntries(searchParams);
    const restParams = new URLSearchParams(rest).toString();

    router.push(`
      ${pathname}?q=${values.searchQuery}&${restParams}
    `);
  }

  return (
    <>
      {pathname.startsWith('/repos/') && (
        <div className='justify-center flex-1'>
          <form
            className='w-full m-2 lg:w-2/4 form-control'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='relative'>
              <input
                placeholder='Search'
                className='w-full pr-16 input input-primary input-bordered border-primary'
                type='text'
                {...register('searchQuery', { required: true })}
              />
              <button
                className='absolute top-0 right-0 rounded-l-none btn btn-ghost'
                type='button'
                onClick={() => reset()}
              >
                <GoX />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
