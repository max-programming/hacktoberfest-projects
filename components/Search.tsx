import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormValues {
  searchQuery: string;
}

export default function Search() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = ({ searchQuery }) => {
    console.log(router.asPath);
    router.push({ query: { ...router.query, q: searchQuery } });
  };
  return (
    <form className="w-2/4 m-2 form-control" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <input
          placeholder="Search"
          className="w-full pr-16 input input-primary input-bordered border-primary"
          type="text"
          {...register('searchQuery', { required: true })}
        />
      </div>
    </form>
  );
}
