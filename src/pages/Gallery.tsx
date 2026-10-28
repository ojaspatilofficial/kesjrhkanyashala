import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import { Tag, Calendar, Eye } from 'lucide-react';
import { dataService } from '../services/dataService';
import type { GalleryItem } from '../data/mockData';
import LightboxModal from '../components/shared/LightboxModal';

const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['All', 'Campus', 'Sports', 'Science Exhibition', 'Cultural', 'Annual Gathering'];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await dataService.getGallery(selectedCategory);
        setGallery(data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [selectedCategory]);

  return (
    <div>
      <PageHero eyebrow="Visual Memories" title="Life at Kanyashala Gallery" description="Glimpses of academic milestones, science exhibitions, inter-school sports championships, and cultural celebrations." />
    <div className="section-padding space-y-12">

      {/* Categories Bar */}
      <div className="container-custom">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`chip ${
                selectedCategory === cat
                  ? 'chip-active'
                  : 'chip-idle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container-custom">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Loading gallery photos...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-primary-100/70 cursor-pointer group hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-primary-100">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="p-3 bg-white/90 text-slate-900 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={18} />
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-950/60 text-white backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="font-serif font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-primary-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
    </div>
  );
};

export default Gallery;
