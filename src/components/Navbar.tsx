import { useState } from 'react';
import CustomSelect from '@/components/CustomSelect';
import { Search, X } from 'lucide-react';

const CITY_OPTIONS = [
  { value: 'Indonesia', label: '🇮🇩 Indonesia (All)' },
  { value: 'Jakarta', label: 'Jakarta' },
  { value: 'Bandung', label: 'Bandung' },
  { value: 'Surabaya', label: 'Surabaya' },
  { value: 'Yogyakarta', label: 'Yogyakarta' },
  { value: 'Balikpapan', label: 'Balikpapan' },
];

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
  onLogoClick: () => void;
}

export default function Navbar({ search, onSearchChange, selectedCity, onCityChange, onLogoClick }: NavbarProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Main row */}
      <div className="px-4 md:px-8 lg:px-12 py-3 md:py-4 lg:py-5 flex items-center justify-between gap-3">

        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={onLogoClick}>
          <svg className="w-8 h-8 md:w-10 md:h-10 text-[#15803d]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12c0 4.42 3.58 8 8 8h4c4.42 0 8-3.58 8-8H2zm18-3H4v1h16V9zm-2-4H6v2h12V5z" opacity="0.15"/>
            <path d="M3 11c0 4.97 4.03 9 9 9s9-4.03 9-9H3zm16-2H5c0-1.66 1.34-3 3-3h8c1.66 0 3 1.34 3 3zm-2-5H7c0-.55.45-1 1-1h8c.55 0 1 .45 1 1z" fill="currentColor"/>
          </svg>
          <div className="flex flex-col">
            <span className="text-base md:text-xl font-black tracking-widest text-gray-950 leading-none">EATERY</span>
            <span className="text-[9px] md:text-xs text-gray-400 font-semibold mt-1 leading-none">Explore Indonesia</span>
          </div>
        </div>

        {/* Search — hidden on mobile, visible md+ */}
        <div className="relative w-full max-w-xl mx-4 hidden md:block">
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search restaurants, cuisines..."
            className="w-full pl-12 pr-5 py-3 bg-[#F3F4F6] rounded-full border border-transparent focus:outline-none focus:bg-white focus:border-gray-200 text-sm text-gray-800 placeholder-gray-400 font-medium transition-all"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Mobile search toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
            onClick={() => setMobileSearchOpen(o => !o)}
          >
            {mobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          {/* City select — hidden on small mobile */}
          <div className="hidden sm:flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 4L9 7" />
            </svg>
            <CustomSelect
              options={CITY_OPTIONS}
              value={selectedCity}
              onChange={onCityChange}
              minWidth="150px"
            />
          </div>

          <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />

          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 object-cover cursor-pointer shadow-sm hover:ring-2 hover:ring-[#15803d]/20 transition-all"
            alt="Profile"
          />
        </div>
      </div>

      {/* Mobile search row */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <svg className="absolute left-4 top-3 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F3F4F6] rounded-full border border-transparent focus:outline-none focus:bg-white focus:border-gray-200 text-sm text-gray-700 placeholder-gray-400 font-medium"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
          </div>
          {/* City select on mobile */}
          <div className="flex items-center gap-2 mt-2 sm:hidden">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 4L9 7" />
            </svg>
            <CustomSelect
              options={CITY_OPTIONS}
              value={selectedCity}
              onChange={onCityChange}
              minWidth="160px"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
