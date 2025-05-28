// app/(components)/Navbar.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/servicess" },
  { name: "Gallery", href: "/gallery" },
  { name: "Playground", href: "/playground" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-sm shadow-lg "
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div variants={linkItemVariants}>
            <Link
              href="/"
              className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors"
            >
              Motion<span className="text-white">Site</span>
            </Link>
          </motion.div>

          <motion.div
            className="flex space-x-1 sm:space-x-2"
            variants={navVariants}
          >
            {" "}
            {/* Reduced space-x for more links */}
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={linkItemVariants}>
                {/* ${pathname === link.href ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} in link */}
                <Link
                  href={link.href}
                  className={`px-1.5 py-2 sm:px-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap`}
                >
                  <motion.span
                    whileHover={{ scale: 1.1, originX: 0.5 }}
                    whileTap={{ scale: 0.95 }}
                    className="block"
                  >
                    {link.name}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
