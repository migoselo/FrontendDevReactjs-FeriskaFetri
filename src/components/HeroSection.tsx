interface HeroSectionProps {
  selectedCity: string;
}

export default function HeroSection({ selectedCity }: HeroSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 md:pt-8">
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[220px] md:min-h-[320px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
        <div className="relative z-10 px-7 py-8 md:px-14 md:py-14 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3 md:mb-4 drop-shadow-md">
            Explore the best<br />restaurants in{' '}
            <span className="text-emerald-400">{selectedCity}</span>
          </h1>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-xs md:max-w-sm">
            Find and explore top-rated restaurants, cafes, and culinary gems from all around Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
