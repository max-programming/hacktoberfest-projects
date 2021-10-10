import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';

interface FormValues {
  startStars: number;
  endStars: number;
}

export default function StarsFilter() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = ({ startStars, endStars }) => {
    const query = endStars
      ? {
          startStars,
          endStars,
        }
      : { startStars };
    router.push({ query: { ...router.query, ...query } });
  };

  return (
    <form
      className='w-full m-2 mx-auto mb-4 lg:w-2/4 form-control'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex gap-2'>
        <input
          placeholder='Start stars'
          className='w-full pr-16 input input-primary input-bordered border-primary'
          type='number'
          {...register('startStars', { required: true })}
        />
        <input
          placeholder='End stars'
          className='w-full pr-16 input input-primary input-bordered border-primary'
          type='number'
          {...register('endStars')}
        />
        <button className='rounded-l-none btn btn-ghost' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
}
