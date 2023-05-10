'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

interface FormValues {
  startStars: number;
  endStars: number | string;
}

export default function StarsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      startStars: !searchParams.get('startStars')
        ? undefined
        : Number(searchParams.get('startStars')),
      endStars: !searchParams.get('endStars')
        ? undefined
        : Number(searchParams.get('endStars'))
    }
  });

  function onSubmit({ startStars, endStars }: FormValues) {
    let query;
    if (Number(endStars) < startStars) {
      reset({ startStars, endStars: '' });
      query = { startStars };
      const { endStars, ...rest } = Object.fromEntries(searchParams);
      const restParams = new URLSearchParams(rest);
      router.push(
        `${pathname}?${restParams.toString()}&startStars=${query.startStars}`
      );
    } else {
      query = {
        startStars: startStars.toString(),
        endStars: endStars.toString()
      };
      const {
        endStars: es,
        startStars: ss,
        ...rest
      } = Object.fromEntries(searchParams);
      const queryParams = new URLSearchParams(query);
      const restParams = new URLSearchParams(rest);
      router.push(
        `${pathname}?${restParams.toString()}&${queryParams.toString()}`
      );
    }
  }

  return (
    <form
      className="w-full m-2 mx-auto mb-4 lg:w-2/4 form-control"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 flex-col sm:flex-row">
        <Controller
          name="startStars"
          render={({ field }) => (
            <input
              type="number"
              className="w-3/5 m-auto sm:w-full pr-4 input input-primary input-bordered border-primary"
              {...field}
              onChange={e => {
                field.onChange(parseInt(e.target.value, 10));
              }}
              placeholder="Star's Starting Range"
            />
          )}
          control={control}
        />
        <Controller
          name="endStars"
          render={({ field }) => (
            <input
              type="number"
              className="w-3/5 m-auto sm:w-full pr-4 input input-primary input-bordered border-primary"
              {...field}
              onChange={e => {
                field.onChange(parseInt(e.target.value, 10));
              }}
              placeholder="Star's Finish Range"
            />
          )}
          control={control}
        />

        <button className="rounded-tr- btn btn-ghost " type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
