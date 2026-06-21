import { useState } from "react";
import { GalleryItem } from "../types";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export default function GallerySection({ galleryItems }: GallerySectionProps) {
  const [filter, setFilter] = useState<"all" | "food" | "ambience" | "experience">("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const handleNext = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#070709] border-t border-[#ffd700]/10 scroll-mt-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title section */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs text-[#ffd700] uppercase font-mono tracking-widest block mb-2">📸 Visual Showcase</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Saifoodlover Ambience</h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#f57c00] to-transparent w-40 mx-auto mt-3" />
          <p className="text-xs text-gray-400 mt-3 font-serif">
            A celebration of crispy textures, golden glows, and laughter shared over sweet milkshakes and spicy pizzas.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 text-xs font-bold leading-normal">
          {[
            { id: "all", name: "All Experiences" },
            { id: "food", name: "🍔 Gourmet Dishes" },
            { id: "ambience", name: "✨ Cafe Ambience" },
            { id: "experience", name: "💖 Good Mood Moments" }
          ].map((cat) => (
            <button
              key={cat.id}
              id={`filter-gallery-${cat.id}`}
              onClick={() => {
                setFilter(cat.id as any);
                setActivePhotoIndex(null);
              }}
              className={`px-4 py-2 rounded-full border transition-all duration-200 outline-none ${
                filter === cat.id 
                  ? "bg-[#f57c00] border-[#f57c00] text-white shadow shadow-[#f57c00]/30" 
                  : "bg-[#111115] border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="group relative h-72 bg-[#121216] border border-gray-850 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#f57c00]/40 shadow-md"
              onClick={() => setActivePhotoIndex(index)}
            >
              {/* Photo */}
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80";
                }}
              />

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[9px] text-[#f57c00] uppercase font-bold tracking-widest mb-1">{item.category}</span>
                <h4 className="text-xs font-semibold text-white tracking-wide truncate">{item.title}</h4>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                  <span className="text-[10px] text-gray-400 font-mono">View full size</span>
                  <div className="p-1.5 bg-gradient-to-r from-[#f57c00] to-orange-500 rounded-full text-white shadow">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Cover badge on non-hover for subtle decoration */}
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/5 p-1 px-2 rounded-full text-[9px] text-gray-300 font-medium group-hover:hidden transition-all uppercase tracking-wide">
                👁️ Zoom
              </div>
            </div>
          ))}
        </div>

        {/* Empty status */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <Eye className="w-12 h-12 text-gray-700 mx-auto mb-2" />
            <p className="text-sm font-bold">No photos under this category</p>
          </div>
        )}

        {/* LIGHTBOX IMPLEMENTATION */}
        {activePhotoIndex !== null && filteredItems[activePhotoIndex] && (
          <div className="fixed inset-0 z-50 bg-[#000]/95 flex items-center justify-center p-4 select-none">
            {/* Modal Exit */}
            <button 
              id="lightbox-close-header"
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev item */}
            <button
              id="lightbox-prev"
              onClick={handlePrev}
              className="absolute left-4 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white cursor-pointer active:scale-95 transition-all text-xs"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Img Container */}
            <div className="max-w-4xl w-full text-center space-y-4">
              <img 
                src={filteredItems[activePhotoIndex].imageUrl} 
                alt={filteredItems[activePhotoIndex].title} 
                className="max-h-[75vh] mx-auto object-contain rounded-xl border border-white/5 bg-[#121216]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80";
                }}
              />
              <div>
                <p className="text-[#ffd700] text-[10px] uppercase font-bold tracking-widest">{filteredItems[activePhotoIndex].category}</p>
                <h3 className="text-sm font-bold text-white mt-1">{filteredItems[activePhotoIndex].title}</h3>
                <p className="text-[10px] text-gray-500 font-mono mt-1">Image {activePhotoIndex + 1} of {filteredItems.length}</p>
              </div>
            </div>

            {/* Next item */}
            <button
              id="lightbox-next"
              onClick={handleNext}
              className="absolute right-4 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white cursor-pointer active:scale-95 transition-all text-xs"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
