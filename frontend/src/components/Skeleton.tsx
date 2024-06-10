export default function Skeleton() {
    return (
      <div className="w-1/2 p-4 animate-pulse mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-4 h-2 bg-gray-200 rounded-full mr-4"></div>
            <div className="w-2 h-2 bg-gray-200 rounded"></div>
          </div>
          <div className="w-4 h-2 bg-gray-200 rounded"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-2 bg-gray-200 rounded"></div>
      </div>
    );
  }
  