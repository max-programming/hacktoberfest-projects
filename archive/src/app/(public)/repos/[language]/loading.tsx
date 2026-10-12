export default function Loading() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="border-b border-hacktoberfest-dark-green">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-shimmer animate-shimmer rounded-md"></div>
            <div className="flex space-x-4">
              <div className="h-8 w-20 bg-shimmer animate-shimmer rounded-md"></div>
              <div className="h-8 w-24 bg-shimmer animate-shimmer rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="min-h-screen pt-5">
          {/* Title Section Skeleton */}
          <div className="text-center">
            <div className="w-5/6 max-w-md mx-auto">
              <div className="mb-5 space-y-3">
                <div className="h-12 w-full bg-shimmer animate-shimmer rounded-lg"></div>
                <div className="h-8 w-3/4 mx-auto bg-shimmer animate-shimmer rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Sorter Skeleton */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-4">
              <div className="h-10 w-24 bg-shimmer animate-shimmer rounded-md"></div>
              <div className="h-10 w-28 bg-shimmer animate-shimmer rounded-md"></div>
              <div className="h-10 w-20 bg-shimmer animate-shimmer rounded-md"></div>
            </div>
          </div>

          {/* Stars Filter Skeleton */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-3">
              <div className="h-10 w-32 bg-shimmer animate-shimmer rounded-md"></div>
              <div className="h-10 w-16 bg-shimmer animate-shimmer rounded-md"></div>
              <div className="h-10 w-32 bg-shimmer animate-shimmer rounded-md"></div>
            </div>
          </div>

          {/* Repository Cards Grid Skeleton */}
          <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 21 }).map((_, index) => (
              <div
                key={index}
                className="bg-hacktoberfest-black border border-hacktoberfest-dark-green rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Repository Title */}
                <div className="mb-4">
                  <div className="h-6 w-3/4 bg-shimmer animate-shimmer rounded mb-2"></div>
                  <div className="h-4 w-full bg-shimmer animate-shimmer rounded"></div>
                  <div className="h-4 w-2/3 bg-shimmer animate-shimmer rounded mt-1"></div>
                </div>

                {/* Language and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-shimmer animate-shimmer rounded-full"></div>
                    <div className="h-4 w-16 bg-shimmer animate-shimmer rounded"></div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-shimmer animate-shimmer rounded"></div>
                      <div className="h-4 w-8 bg-shimmer animate-shimmer rounded"></div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-shimmer animate-shimmer rounded"></div>
                      <div className="h-4 w-8 bg-shimmer animate-shimmer rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-6 w-20 bg-shimmer animate-shimmer rounded-full"></div>
                  <div className="h-6 w-16 bg-shimmer animate-shimmer rounded-full"></div>
                  <div className="h-6 w-24 bg-shimmer animate-shimmer rounded-full"></div>
                </div>

                {/* Action Button */}
                <div className="h-10 w-full bg-shimmer animate-shimmer rounded-md"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center space-x-2 py-8">
          <div className="h-10 w-20 bg-shimmer animate-shimmer rounded-md"></div>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-10 w-10 bg-shimmer animate-shimmer rounded-md"
              ></div>
            ))}
          </div>
          <div className="h-10 w-20 bg-shimmer animate-shimmer rounded-md"></div>
        </div>
      </div>
    </>
  );
}
