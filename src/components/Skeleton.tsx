export default function Skeleton() {
  return (
    <div role="status" className="card mx-4 animate-pulse bg-base-300">
      <div className="card-body relative">
        <div className="mb-2 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-full">
          <div className="mb-4 h-6 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
