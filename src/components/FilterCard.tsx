import CustomSelect from '@/components/CustomSelect';

interface FilterCardProps {
  openNow: boolean;
  onOpenNowChange: (value: boolean) => void;
  priceRange: number | null;
  onPriceRangeChange: (value: number | null) => void;
  selectedCuisine: string;
  onCuisineChange: (value: string) => void;
}

const CUISINE_OPTIONS = [
  { value: 'All Categories', label: 'All Categories' },
  { value: 'Indonesian', label: 'Indonesian' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Western', label: 'Western' },
  { value: 'Seafood', label: 'Seafood' },
  { value: 'Cafe', label: 'Cafe' },
  { value: 'Sunda', label: 'Sunda' },
  { value: 'Street Food', label: 'Street Food' },
];

export default function FilterCard({
  openNow, onOpenNowChange,
  priceRange, onPriceRangeChange,
  selectedCuisine, onCuisineChange,
}: FilterCardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-3 lg:-mt-3 relative z-20">
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/80 px-5 lg:px-10 py-4 lg:py-5 border border-gray-100
        flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0">

        {/* Toggle Open Now */}
        <div className="flex items-center justify-between lg:justify-start lg:gap-6 lg:border-r lg:pr-12 lg:flex-1
          border-b pb-4 lg:border-b-0 lg:pb-0">
          <div>
            <span className="font-semibold block text-sm text-gray-800">Open now</span>
            <span className="text-xs text-gray-400 mt-0.5 block">Show only open restaurants</span>
          </div>
          <button
            onClick={() => onOpenNowChange(!openNow)}
            className={`w-12 h-6 rounded-full transition-colors duration-200 relative shrink-0 ${openNow ? 'bg-emerald-600' : 'bg-gray-200'}`}
          >
            <span className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 left-1 ${openNow ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Price Range */}
        <div className="lg:border-r lg:px-12 lg:flex-1 border-b pb-4 lg:border-b-0 lg:pb-0">
          <span className="font-semibold block text-sm text-gray-800 mb-2.5">Price range</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                onClick={() => onPriceRangeChange(priceRange === p ? null : p)}
                className={`px-4 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  priceRange === p
                    ? 'bg-emerald-700 border-emerald-700 text-white shadow-sm'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50 bg-white'
                }`}
              >
                {'$'.repeat(p)}
              </button>
            ))}
          </div>
        </div>

        {/* Categories / Cuisines */}
        <div className="lg:pl-12 lg:flex-1">
          <span className="font-semibold block text-sm text-gray-800 mb-2.5">Categories / Cuisines</span>
          <CustomSelect
            options={CUISINE_OPTIONS}
            value={selectedCuisine}
            onChange={onCuisineChange}
            minWidth="180px"
          />
        </div>

      </div>
    </div>
  );
}
