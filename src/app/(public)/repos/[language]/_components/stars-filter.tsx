'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface FormValues {
  startStars: number | '';
  endStars: number | '';
}

export function StarsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      startStars: !searchParams.get('startStars')
        ? ''
        : +(searchParams.get('startStars') as string),
      endStars: !searchParams.get('endStars')
        ? ''
        : +(searchParams.get('endStars') as string)
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset(), [params.language]);

  function onSubmit({ startStars, endStars }: FormValues) {
    const sp = new URLSearchParams(searchParams);
    if (
      typeof endStars === 'number' &&
      typeof startStars === 'number' &&
      endStars < startStars
    ) {
      reset({ startStars, endStars: '' });
      sp.delete('endStars');
      sp.set('startStars', startStars.toString());
    } else {
      sp.set('startStars', startStars.toString());
      sp.set('endStars', endStars.toString());
    }
    router.push(`${pathname}?${sp.toString()}`);
  }

  return (
    <form
      className="w-full px-2 m-2 mx-auto mb-4 lg:w-2/4 form-control"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <Controller
          name="startStars"
          render={({ field }) => (
            <input
              type="number"
              className="w-3/5 pr-4 m-auto text-center bg-transparent sm:w-full input input-bordered md:text-left text-hacktoberfest-light placeholder:text-hacktoberfest-light-green border-hacktoberfest-light focus:outline-hacktoberfest-light-pink"
              {...field}
              onChange={e => field.onChange(e.target.valueAsNumber)}
              placeholder="Star's Starting Range"
              min="0"
            />
          )}
          control={control}
        />
        <Controller
          name="endStars"
          render={({ field }) => (
            <input
              type="number"
              className="w-3/5 pr-4 m-auto text-center bg-transparent sm:w-full input input-bordered md:text-left text-hacktoberfest-light placeholder:text-hacktoberfest-light-green border-hacktoberfest-light focus:outline-hacktoberfest-light-pink"
              {...field}
              onChange={e => field.onChange(e.target.valueAsNumber)}
              placeholder="Star's Finish Range"
              min="0"
            />
          )}
          control={control}
        />

        {/* Flex container to center the button */}
        <div className="flex items-center justify-center">
          <button
            className="w-3/5 mx-auto btn btn-ghost text-hacktoberfest-light ring-1 ring-hacktoberfest-light md:w-full"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
