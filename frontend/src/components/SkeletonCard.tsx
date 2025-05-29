const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>

        {/* Name */}
        <div className="mb-4">
            <div className="w-16 h-3 bg-gray-200 rounded mb-2"></div>
            <div className="w-32 h-5 bg-gray-200 rounded"></div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <div className="w-12 h-3 bg-gray-200 rounded mb-1"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
            <div>
                <div className="w-16 h-3 bg-gray-200 rounded mb-1"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div>
                <div className="w-14 h-3 bg-gray-200 rounded mb-1"></div>
                <div className="w-28 h-4 bg-gray-200 rounded"></div>
            </div>
            <div>
                <div className="w-18 h-3 bg-gray-200 rounded mb-1"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
        </div>

        {/* Aadhaar Number */}
        <div className="mb-4">
            <div className="w-20 h-3 bg-gray-200 rounded mb-2"></div>
            <div className="w-36 h-5 bg-gray-200 rounded"></div>
        </div>

        {/* Address */}
        <div className="mb-4">
            <div className="w-12 h-3 bg-gray-200 rounded mb-2"></div>
            <div className="space-y-1">
                <div className="w-full h-3 bg-gray-200 rounded"></div>
                <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
                <div className="w-3/5 h-3 bg-gray-200 rounded"></div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
            <div className="flex-1 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
    </div>
);

// Skeleton Grid Component
export const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>
);