import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
];

export default function Gallery() {
  return (
    <div className="overflow-hidden w-full py-10 bg-white">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...images, ...images].map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-72 h-48 object-cover rounded-2xl shadow-lg"
          />
        ))}
      </motion.div>
    </div>
  );
}