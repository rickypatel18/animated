"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CircleChevronLeft, CircleChevronRight, X } from "lucide-react";

const COLORS = ["#dba8f0", "#bef0a8", "#f0d1a8", "#f0a8b5", "#a8def0", "#f0d4a8", "#aff0a8", "#f0a8c8", "#e4f0a8"];

const initialItems = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/image${i + 1}.jpg`,
  alt: `Gallery image ${i + 1}`,
  bgColor: COLORS[i % COLORS.length],
}));

const GalleryPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [items, setItems] = useState(initialItems);

  const selectedItem = items.find((item) => item.id === selectedId);

  const shuffleItems = () => {
    setSelectedId(null);
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedId === null || items.length <= 1) return;

    const currentIndex = items.findIndex(item => item.id === selectedId);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % items.length;
    setSelectedId(items[nextIndex].id);
  }, [selectedId, items, setSelectedId]);

  const handlePrevious = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedId === null || items.length <= 1) return;

    const currentIndex = items.findIndex(item => item.id === selectedId);
    if (currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedId(items[prevIndex].id);
  }, [selectedId, items, setSelectedId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedId === null) return;

      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId, handleNext, handlePrevious, setSelectedId]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-center text-gray-300 mb-8">
        Click an image to enlarge. Demonstrates layout animations, modals, and prev/next navigation.
      </p>

      <div className="text-center mb-8">
        <motion.button
          onClick={shuffleItems}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shuffle Items
        </motion.button>
      </div>

      {/* LayoutGroup enables shared layout animations */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {items.map((item) => (
            <motion.div
              layoutId={`card-container-${item.id}`}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
              style={{ backgroundColor: item.bgColor }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <motion.img
                layoutId={`image${item.id}`}
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedId && selectedItem && (
            <motion.div
              className="full-div fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                key={selectedItem.id}
                layoutId={`card-container-${selectedItem.id}`}
                className="card-div relative bg-gray-800 p-2 sm:p-4 rounded-xl shadow-3xl max-w-2xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundColor: selectedItem.bgColor }}
              >

                <motion.img
                  layoutId={`image${selectedItem.id}`}
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="max-w-full max-h-[calc(90vh-80px)] sm:max-h-[calc(90vh-100px)] object-contain rounded-md"
                />

                {/* Previous Button */}
                {items.length > 1 && (
                  <motion.button
                    onClick={handlePrevious}
                    className="absolute left-[-35px] sm:left-[-45px] top-1/2 -translate-y-1/2 bg-black hover:bg-black/60 text-white rounded-full p-1.5 sm:p-2 z-20 transition-colors"
                    aria-label="Previous image"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CircleChevronLeft />
                  </motion.button>
                )}

                {/* Next Button */}
                {items.length > 1 && (
                  <motion.button
                    onClick={handleNext}
                    className="absolute right-[-35px] sm:right-[-45px] top-1/2 -translate-y-1/2 bg-black hover:bg-black/60 text-white rounded-full p-1.5 sm:p-2 z-20 transition-colors"
                    aria-label="Next image"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CircleChevronRight />
                  </motion.button>
                )}

                {/* close button */}
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-1.5 sm:p-2 leading-none z-20"
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X />
                </motion.button>
                <motion.h3
                  className="text-lg sm:text-xl font-semibold mt-3 text-gray-900 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                >
                  {selectedItem.alt}
                </motion.h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </LayoutGroup>
    </div>
  );
};

export default GalleryPage;