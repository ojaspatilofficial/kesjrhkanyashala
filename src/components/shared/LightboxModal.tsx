import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag } from 'lucide-react';
import type { GalleryItem } from '../../data/mockData';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col z-10 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview Container */}
            <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px] max-h-[60vh]">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-contain max-h-[60vh]"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors backdrop-blur-md"
                aria-label="Close image viewer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Caption & Metadata */}
            <div className="p-6 bg-white flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary">
                    <Tag size={12} /> {item.category}
                  </span>
                  {item.event_date && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                      <Calendar size={12} /> {new Date(item.event_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LightboxModal;
