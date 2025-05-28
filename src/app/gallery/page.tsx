// app/gallery/page.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import AnimatedText from "../(components)/AnimatedText";

const COLORS = [
  "hsl(283, 70%, 80%)",
  "hsl(102, 70%, 80%)",
  "hsl(34, 70%, 80%)",
  "hsl(349, 70%, 80%)",
  "hsl(195, 70%, 80%)",
  "hsl(37, 70%, 80%)",
  "hsl(114, 70%, 80%)",
  "hsl(333, 70%, 80%)",
  "hsl(70, 70%, 80%)",
];
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
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedText
        text="Our Awesome Gallery"
        el="h1"
        className="text-4xl sm:text-5xl font-bold mb-4 text-center text-teal-400"
      />
      <p className="text-center text-gray-300 mb-8">
        Click an image to enlarge. Demonstrates layout animations and modals.
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

      {/* LayoutGroup enables shared layout animations between items even if they re-render */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {items.map((item) => (
            <motion.div
              layoutId={`card-container-${item.id}`} // Shared layout ID for the card
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
              style={{ backgroundColor: item.bgColor }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <motion.img
                layoutId={`image${item.id}`} // Shared layout ID for the image
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
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
              onClick={() => setSelectedId(null)} // Close on backdrop click
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                layoutId={`card-container-${selectedItem.id}`} // Connects to the card
                className="relative bg-gray-800 p-2 sm:p-4 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                style={{ backgroundColor: selectedItem.bgColor }}
              >
                <motion.img
                  layoutId={`image-${selectedItem.id}`} // Connects to the image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="max-w-full max-h-[75vh] object-contain rounded-md"
                />
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-1.5 sm:p-2 leading-none"
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
