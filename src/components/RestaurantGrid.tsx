import { useState } from 'react';
import { MapPin, Heart } from 'lucide-react';
import CustomSelect from '@/components/CustomSelect';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviews_count: number;
  price_level: number;
  address: string;
  lat: number;
  lon: number;
  is_open: boolean;
  image: string;
}

interface RestaurantGridProps {
  restaurants: Restaurant[];
  loading: boolean;
  onSelectResto: (resto: Restaurant) => void;
}

const ITEMS_PER_PAGE = 12;

export default function RestaurantGrid({ restaurants, loading, onSelectResto }: RestaurantGridProps) {
  const [page, setPage] = useState(1);
  const [sortDir, setSortDir] = useState<'high' | 'low'>('high');
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const sorted = [...restaurants].sort((a, b) =>
    sortDir === 'high' ? b.rating - a.rating : a.rating - b.rating
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleSaved = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="flex justify-between items-center mb-5 md:mb-7">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">All Restaurants</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {restaurants.length > 0 ? `${restaurants.length.toLocaleString()}+ restaurants found` : 'Loading...'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Sort by:</span>
          <CustomSelect
            options={[
              { value: 'high', label: 'Rating High' },
              { value: 'low', label: 'Rating Low' },
            ]}
            value={sortDir}
            onChange={(v) => { setSortDir(v as 'high' | 'low'); setPage(1); }}
            minWidth="130px"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {paginated.map((resto) => (
              <div
                key={resto.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col cursor-pointer"
                onClick={() => onSelectResto(resto)}
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={resto.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={resto.name}
                  />
                  <span className={`absolute left-3 top-3 text-xs font-bold px-2.5 py-1 rounded-full text-white shadow-sm ${
                    resto.is_open ? 'bg-emerald-600' : 'bg-red-500'
                  }`}>
                    {resto.is_open ? 'Open' : 'Closed'}
                  </span>
                  <button
                    onClick={(e) => toggleSaved(e, resto.id)}
                    className="absolute right-3 top-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${saved.has(resto.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-orange-500 text-xs font-bold uppercase tracking-wider block mb-1">
                    {resto.cuisine}
                  </span>
                  <h3 className="font-bold text-base text-gray-900 line-clamp-1 mb-2">{resto.name}</h3>

                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                    <span className="text-amber-500 font-bold text-xs flex items-center gap-0.5">
                      ★ <span className="text-gray-800">{resto.rating}</span>
                    </span>
                    <span className="text-gray-400 text-xs">({resto.reviews_count})</span>
                    <span className="text-gray-300 mx-0.5">|</span>
                    <span className="text-gray-600 text-xs font-semibold">{'$'.repeat(resto.price_level)}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="line-clamp-1">{resto.address}</span>
                  </div>

                  <div className="mt-auto">
                    <span className="text-[#15803d] text-xs font-bold hover:underline inline-flex items-center gap-0.5">
                      Learn more →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm transition-all"
              >
                ‹
              </button>
              {getPageNumbers().map((p, i) => (
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                      page === p
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                )
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm transition-all"
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
