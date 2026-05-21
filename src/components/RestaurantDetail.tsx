import { useState } from 'react';
import { MapPin, Clock, Phone, ChevronDown, Heart, ArrowLeft } from 'lucide-react';

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

interface RestaurantDetailProps {
  selectedResto: Restaurant;
  onBack: () => void;
}

const REVIEWS = [
  {
    name: 'Anindita Putri',
    avatarImg: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&q=80',
    rate: '5.0',
    time: '2 days ago',
    text: (cuisine: string) => `${cuisine}-nya fresh dan enak banget! Tempatnya juga nyaman, pelayanan ramah. Pasti akan kembali lagi ke sini!`,
    reviewImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&auto=format&fit=crop&q=70',
  },
  {
    name: 'Rizky Pratama',
    avatarImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    rate: '4.0',
    time: '1 week ago',
    text: () => 'Tempat yang bagus untuk makan bersama keluarga. Harga sesuai dengan kualitas makanannya.',
    reviewImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&auto=format&fit=crop&q=70',
  },
  {
    name: 'Dewi Ayu',
    avatarImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
    rate: '4.5',
    time: '2 weeks ago',
    text: () => 'Suka banget suasananya. Tenang dan makanannya konsisten enak. Recommended!',
    reviewImg: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=200&auto=format&fit=crop&q=70',
  },
];

export default function RestaurantDetail({ selectedResto, onBack }: RestaurantDetailProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8">
      {/* Hero Card */}
      <div className="bg-black rounded-2xl overflow-hidden shadow-xl mb-5">
        <div className="relative h-[240px] md:h-[340px]">
          <img
            src={selectedResto.image}
            className="w-full h-full object-cover opacity-75"
            alt={selectedResto.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 pt-5">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white font-semibold text-sm hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to list
            </button>
            <button
              onClick={() => setSaved(s => !s)}
              className="w-9 h-9 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Heart className={`w-4 h-4 transition-colors ${saved ? 'fill-red-400 text-red-400' : 'text-white'}`} />
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-4 md:pb-6">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-1.5 md:mb-2">{selectedResto.name}</h1>
            <div className="flex flex-wrap items-center gap-1 md:gap-1.5 text-xs md:text-sm text-gray-200 mb-2 md:mb-3">
              <span className="text-amber-400 font-bold flex items-center gap-0.5">★ {selectedResto.rating}</span>
              <span className="text-gray-300">({selectedResto.reviews_count} reviews)</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-200">{selectedResto.cuisine}</span>
              {selectedResto.cuisine.toLowerCase() !== 'cafe' && (
                <>
                  <span className="text-gray-400 mx-1">•</span>
                  <span className="text-gray-300">Restaurant</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-black text-lg tracking-wider">{'$'.repeat(selectedResto.price_level)}</span>
              <span className={`text-white text-xs px-3 py-1 rounded-full font-bold ${selectedResto.is_open ? 'bg-emerald-600' : 'bg-red-600'}`}>
                {selectedResto.is_open ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div className="flex items-start gap-3 p-5">
            <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-gray-500 mb-1">Location</h4>
              <p className="text-sm font-medium text-gray-800 leading-snug">{selectedResto.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-5">
            <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-gray-500 mb-1">Open Today</h4>
              <p className="text-sm font-medium text-gray-800">10:00 AM - 10:00 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-5">
            <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-gray-500 mb-1">Phone</h4>
              <p className="text-sm font-medium text-gray-800">(021) 1234 5678</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
        <div className="h-[220px] relative">
          {selectedResto.lat && selectedResto.lon ? (
            <iframe
              title="Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${selectedResto.lat},${selectedResto.lon}&z=16&output=embed`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 bg-gray-50">
              Map not available
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900">Reviews ({selectedResto.reviews_count})</h3>
          <button className="text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-all">
            Write a review
          </button>
        </div>

        <div className="space-y-4">
          {REVIEWS.map((rev, index) => (
            <div key={index} className="flex items-start justify-between gap-4 bg-gray-50/60 rounded-xl p-4 border border-gray-100">
              <div className="flex gap-3 flex-1">
                <img
                  src={rev.avatarImg}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100"
                  alt={rev.name}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h5 className="font-bold text-sm text-gray-900">{rev.name}</h5>
                    <span className="text-xs text-gray-400">{rev.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-amber-400 text-xs font-bold">★</span>
                    <span className="text-xs font-semibold text-gray-700">{rev.rate}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{rev.text(selectedResto.cuisine)}</p>
                </div>
              </div>
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                <img src={rev.reviewImg} className="w-full h-full object-cover" alt="Food" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 pt-4 border-t border-gray-100">
          <button className="text-xs font-semibold text-gray-400 hover:text-gray-600 inline-flex items-center gap-1.5 border border-gray-200 px-5 py-2 rounded-full hover:bg-gray-50 transition-all">
            Load more reviews <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
