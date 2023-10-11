import { useRouter } from 'next/router';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';

interface FormValues {
  startStars: number;
  endStars: number | string;
}

export default function StarsFilter() {
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      startStars: !router.query.startStars
        ? undefined
        : +(router.query.startStars as string),
      endStars: !router.query.endStars
        ? undefined
        : +(router.query.endStars as string)
    }
  });

  const onSubmit: SubmitHandler<FormValues> = ({ startStars, endStars }) => {
    let query;
    if (typeof endStars === 'number' && endStars < startStars) {
      reset({ startStars, endStars: '' });
      query = { startStars };
      const { endStars, ...rest } = router.query;
      router.push({ query: { ...rest, ...query } });
    } else {
      query = {
        startStars,
        endStars
      };
      router.push({ query: { ...router.query, ...query } });
    }
  };

  return (
    <form
      className="w-full m-2 mx-auto mb-4 lg:w-2/4 form-control px-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 flex-col sm:flex-row">
        <Controller
          name="startStars"
          render={({ field }) => (
            <input
              type="number"
              className="w-3/5 text-neutral-100 m-auto sm:w-full pr-4 input input-bordered border-2023-bavarian-gold-2 focus:outline-2023-bavarian-gold-2 bg-transparent text-center md:text-left"
              {...field}
              onChange={e => {
                field.onChange(parseInt(e.target.value, 10));
              }}
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
              className="w-3/5 text-neutral-100 m-auto sm:w-full pr-4 input input-bordered border-2023-bavarian-gold-2 focus:outline-2023-bavarian-gold-2 bg-transparent text-center md:text-left"
              {...field}
              onChange={e => {
                field.onChange(parseInt(e.target.value, 10));
              }}
              placeholder="Star's Finish Range"
              min="0"
            />
          )}
          control={control}
        />

        {/* Flex container to center the button */}
        <div className="flex justify-center items-center">
          <button
            className="btn btn-ghost text-2023-manga-2 ring-1 ring-2023-manga-2 mx-auto w-3/5 md:w-full"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
