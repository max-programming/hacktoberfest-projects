'use client';

import {
  useParams,
  usePathname
} from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryStates } from 'nuqs';

interface FormValues {
  startStars: number | '';
  endStars: number | '';
}

type Pathname = '/repos' | `/repos/${string}`;

export function StarsFilter() {
  const pathname = usePathname() as Pathname;
  const params = useParams();
  const [{ startStars, endStars, p }, setStarsParams] = useQueryStates({
    startStars: { parse: (value: string) => (value ? +value : ''), serialize: (value: number | '') => value === '' ? '' : String(value) },
    endStars: { parse: (value: string) => (value ? +value : ''), serialize: (value: number | '') => value === '' ? '' : String(value) },
    p: { parse: (value: string) => (value ? +value : 1), serialize: (value: number) => String(value) }
  });

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      startStars: startStars === '' ? '' : startStars || '',
      endStars: endStars === '' ? '' : endStars || ''
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset(), [params.language]);

  function onSubmit({ startStars, endStars }: FormValues) {
    if (
      typeof endStars === 'number' &&
      typeof startStars === 'number' &&
      endStars < startStars
    ) {
      reset({ startStars, endStars: '' });
      void setStarsParams({
        startStars,
        endStars: '',
        p: 1
      });
    } else {
      void setStarsParams({
        startStars: typeof startStars === 'number' ? startStars : '',
        endStars: typeof endStars === 'number' ? endStars : '',
        p: 1
      });
    }
  }

  return (
    <form
      className="w-full px-4 mx-auto mb-4 sm:w-3/4 xl:w-2/4 form-control"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <Controller
          name="startStars"
          render={({ field }) => (
            <input
              type="number"
              className="w-full px-4 py-3 text-center sm:text-left bg-transparent input input-bordered text-hacktoberfest-light placeholder:text-hacktoberfest-beige border-hacktoberfest-light focus:border-hacktoberfest-light-blue focus:outline-none transition-colors duration-200"
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
              className="w-full px-4 py-3 text-center sm:text-left bg-transparent input input-bordered text-hacktoberfest-light placeholder:text-hacktoberfest-beige border-hacktoberfest-light focus:border-hacktoberfest-light-blue focus:outline-none transition-colors duration-200"
              {...field}
              onChange={e => field.onChange(e.target.valueAsNumber)}
              placeholder="Star's Finish Range"
              min="0"
            />
          )}
          control={control}
        />

        <button
          className="w-full sm:w-auto sm:min-w-[120px] px-6 py-3 btn bg-hacktoberfest-blue border-hacktoberfest-light text-hacktoberfest-light hover:bg-hacktoberfest-light-blue hover:text-hacktoberfest-blue transition-colors duration-200 whitespace-nowrap"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}
