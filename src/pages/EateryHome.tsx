import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FilterCard from '@/components/FilterCard';
import RestaurantGrid from '@/components/RestaurantGrid';
import RestaurantDetail from '@/components/RestaurantDetail';

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

const CUISINE_IMAGES: Record<string, string[]> = {
  Indonesian: [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=70',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=70',
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&auto=format&fit=crop&q=70',
  ],
  Japanese: [
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=70',
    'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&auto=format&fit=crop&q=70',
  ],
  Italian: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=70',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop&q=70',
  ],
  Cafe: [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=70',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop&q=70',
  ],
  Chinese: [
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=70',
  ],
  Western: [
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=70',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&auto=format&fit=crop&q=70',
  ],
  Seafood: [
    'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&auto=format&fit=crop&q=70',
  ],
  Sunda: [
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&auto=format&fit=crop&q=70',
  ],
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=400&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&auto=format&fit=crop&q=70',
];

function getCuisineImage(cuisine: string, id: number): string {
  const normalized = cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase();
  const imgs = CUISINE_IMAGES[normalized] || FALLBACK_IMAGES;
  return imgs[Math.abs(id) % imgs.length];
}

const MOCK_RESTAURANTS: Restaurant[] = [
  { id: 301, name: "Nusantara Rasa", cuisine: "Indonesian", rating: 4.8, reviews_count: 128, price_level: 3, address: "Jl. MH Thamrin, Jakarta Selatan", lat: -6.2088, lon: 106.8456, is_open: true, image: '' },
  { id: 302, name: "Sushi Tei", cuisine: "Japanese", rating: 4.7, reviews_count: 156, price_level: 3, address: "Pacific Place Mall, Jakarta Pusat", lat: -6.2244, lon: 106.8091, is_open: true, image: '' },
  { id: 303, name: "La Tavola Bistro", cuisine: "Italian", rating: 4.6, reviews_count: 98, price_level: 2, address: "Jl. Braga, Bandung", lat: -6.9175, lon: 107.6191, is_open: true, image: '' },
  { id: 304, name: "Kopi Kalyan", cuisine: "Cafe", rating: 4.4, reviews_count: 76, price_level: 1, address: "Jl. Malioboro, Yogyakarta", lat: -7.7929, lon: 110.3652, is_open: false, image: '' },
  { id: 305, name: "Saung Pengkolan", cuisine: "Sunda", rating: 4.4, reviews_count: 98, price_level: 2, address: "Jl. Raya Lembang, Bogor", lat: -6.5481, lon: 107.0167, is_open: true, image: '' },
  { id: 306, name: "Bunga Rampai", cuisine: "Western", rating: 4.5, reviews_count: 189, price_level: 3, address: "Jl. Pemuda, Surabaya", lat: -7.2575, lon: 112.7521, is_open: true, image: '' },
  { id: 307, name: "Pesisir Seafood", cuisine: "Seafood", rating: 4.7, reviews_count: 276, price_level: 3, address: "Jl. Pantai Kuta, Bali", lat: -8.7175, lon: 115.1686, is_open: true, image: '' },
  { id: 308, name: "Dapur Solo", cuisine: "Indonesian", rating: 4.6, reviews_count: 198, price_level: 3, address: "Jl. Slamet Riyadi, Solo", lat: -7.5561, lon: 110.8315, is_open: true, image: '' },
  { id: 309, name: "Giri Ramen House", cuisine: "Japanese", rating: 4.5, reviews_count: 112, price_level: 2, address: "Jl. Sudirman, Jakarta Pusat", lat: -6.1944, lon: 106.8229, is_open: true, image: '' },
  { id: 310, name: "Gudeg Wijilan", cuisine: "Indonesian", rating: 4.9, reviews_count: 240, price_level: 1, address: "Jl. Wijilan, Yogyakarta", lat: -7.8012, lon: 110.3644, is_open: true, image: '' },
  { id: 311, name: "Sepinggan Cafe", cuisine: "Cafe", rating: 4.3, reviews_count: 62, price_level: 2, address: "Jl. MT Haryono, Balikpapan", lat: -1.2654, lon: 116.8312, is_open: true, image: '' },
  { id: 312, name: "Trattoria Roma", cuisine: "Italian", rating: 4.5, reviews_count: 87, price_level: 3, address: "Jl. Kemang Raya, Jakarta Selatan", lat: -6.2615, lon: 106.8146, is_open: false, image: '' },
  { id: 313, name: "Dragon Palace", cuisine: "Chinese", rating: 4.4, reviews_count: 143, price_level: 2, address: "Glodok, Jakarta Barat", lat: -6.1456, lon: 106.8165, is_open: true, image: '' },
  { id: 314, name: "The Steak House", cuisine: "Western", rating: 4.6, reviews_count: 204, price_level: 4, address: "SCBD, Jakarta Selatan", lat: -6.2297, lon: 106.8093, is_open: true, image: '' },
  { id: 315, name: "Warung Ibu Ita", cuisine: "Indonesian", rating: 4.7, reviews_count: 321, price_level: 1, address: "Jl. Gajah Mada, Semarang", lat: -6.9932, lon: 110.4203, is_open: true, image: '' },
  { id: 316, name: "Hakata Ramen", cuisine: "Japanese", rating: 4.6, reviews_count: 178, price_level: 2, address: "Jl. Senopati, Jakarta Selatan", lat: -6.2432, lon: 106.8096, is_open: true, image: '' },
].map(r => ({ ...r, image: getCuisineImage(r.cuisine, r.id) }));

const CITY_COORDS: Record<string, { lat: number; lon: number }[]> = {
  Jakarta: [{ lat: -6.2088, lon: 106.8456 }],
  Bandung: [{ lat: -6.9175, lon: 107.6191 }],
  Surabaya: [{ lat: -7.2575, lon: 112.7521 }],
  Yogyakarta: [{ lat: -7.7956, lon: 110.3695 }],
  Balikpapan: [{ lat: -1.2654, lon: 116.8312 }],
  Indonesia: [
    { lat: -6.2088, lon: 106.8456 },
    { lat: -7.2575, lon: 112.7521 },
    { lat: -6.9175, lon: 107.6191 },
    { lat: -7.7956, lon: 110.3695 },
    { lat: -1.2654, lon: 116.8312 },
  ],
};

export default function EateryHome() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [openNow, setOpenNow] = useState(false);
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState('All Categories');
  const [selectedCity, setSelectedCity] = useState('Indonesia');
  const [selectedResto, setSelectedResto] = useState<Restaurant | null>(null);

  const fetchOSMData = async (city: string) => {
    setLoading(true);
    const overpassUrl = 'https://overpass.kumi.systems/api/interpreter';
    const targetPoints = CITY_COORDS[city] || CITY_COORDS['Jakarta'];

    const radiusQueries = targetPoints
      .map(p => `nwr["amenity"~"restaurant|cafe"]["name"](around:2000, ${p.lat}, ${p.lon});`)
      .join('\n');

    const query = `[out:json][timeout:15];(${radiusQueries});out center 80;`;

    try {
      const res = await fetch(overpassUrl, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      if (!res.ok) throw new Error('OSM error');
      const data = await res.json();
      if (!data.elements?.length) throw new Error('No data');

      const formatted: Restaurant[] = data.elements.map((el: any) => {
        const tags = el.tags || {};
        const id = el.id;
        const lat = el.lat || el.center?.lat;
        const lon = el.lon || el.center?.lon;
        const rawCuisine = (tags.cuisine || 'Indonesian').split(';')[0].replace(/_/g, ' ');
        const cuisine = rawCuisine.charAt(0).toUpperCase() + rawCuisine.slice(1);

        let detectedCity = city === 'Indonesia' ? 'Indonesia' : city;
        if (city === 'Indonesia' && lat && lon) {
          if (lat < -7.1) detectedCity = 'Surabaya';
          else if (lon > 115) detectedCity = 'Balikpapan';
          else if (lon > 107.5 && lat < -6.8) detectedCity = 'Bandung';
          else if (lon > 110 && lon < 111) detectedCity = 'Yogyakarta';
          else detectedCity = 'Jakarta';
        }

        return {
          id,
          name: tags.name || 'Unknown Restaurant',
          cuisine,
          rating: Math.min(+(4.0 + (id % 10) * 0.1).toFixed(1), 4.9),
          reviews_count: (id % 150) + 12,
          price_level: (id % 4) + 1,
          address: tags['addr:street'] ? `${tags['addr:street']}, ${detectedCity}` : `Jl. Raya, ${detectedCity}`,
          lat,
          lon,
          is_open: (id % 3) !== 0,
          image: getCuisineImage(cuisine, id),
        };
      });

      setRestaurants(formatted);
    } catch {
      setRestaurants(MOCK_RESTAURANTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOSMData(selectedCity);
  }, [selectedCity]);

  const filtered = restaurants.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q);
    const matchOpen = openNow ? r.is_open : true;
    const matchPrice = priceRange ? r.price_level === priceRange : true;
    const matchCuisine = selectedCuisine === 'All Categories' ? true : r.cuisine.toLowerCase() === selectedCuisine.toLowerCase();
    return matchSearch && matchOpen && matchPrice && matchCuisine;
  });

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedResto(null);
  };

  if (selectedResto) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          search={search}
          onSearchChange={setSearch}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          onLogoClick={() => setSelectedResto(null)}
        />
        <RestaurantDetail selectedResto={selectedResto} onBack={() => setSelectedResto(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        onLogoClick={() => setSelectedResto(null)}
      />
      <HeroSection selectedCity={selectedCity} />
      <FilterCard
        openNow={openNow}
        onOpenNowChange={setOpenNow}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        selectedCuisine={selectedCuisine}
        onCuisineChange={setSelectedCuisine}
      />
      <RestaurantGrid
        restaurants={filtered}
        loading={loading}
        onSelectResto={setSelectedResto}
      />
    </div>
  );
}
