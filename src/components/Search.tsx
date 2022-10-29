import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';

interface FormValues {
  searchQuery: string;
}

export default function Search() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      searchQuery: router.query.q as string
    }
  });
  const onSubmit: SubmitHandler<FormValues> = ({ searchQuery }) => {
    console.log(router.asPath);
    router.push({ query: { ...router.query, q: searchQuery } });
  };
  return (
    <form
      className="w-full m-2 lg:w-2/4 form-control"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative">
        <input
          placeholder="Search"
          className="w-full pr-16 input input-primary input-bordered border-primary"
          type="text"
          {...register('searchQuery', { required: true })}
        />
        <button
          className="absolute top-0 right-0 rounded-l-none btn btn-ghost"
          type="button"
          onClick={() => reset()}
        >
          <GoX />
        </button>
      </div>
    </form>
  );
}
