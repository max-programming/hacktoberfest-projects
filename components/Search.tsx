import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';

interface FormValues {
  searchQuery: string;
}
export interface SearchProps {
  searchBarWrapperStyles?: string
}

export default function Search({ searchBarWrapperStyles }: SearchProps) {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      searchQuery: router.query.q as string
    }
  });

  const onSubmit: SubmitHandler<FormValues> = ({ searchQuery }) => {
    router.push({ query: { ...router.query, q: searchQuery } });
  };

  return (
    <div className={searchBarWrapperStyles}>
      <form
        className="w-full mx-auto m-2 form-control"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            placeholder="Search"
            className="w-full pr-16 input input-bordered border-2023-bavarian-gold-2 focus:outline-2023-bavarian-gold-2 bg-transparent"
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
    </div>
  );
}
