"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  LazyMotion,
  domAnimation,
  AnimatePresence,
  motion,
} from "framer-motion";
import { usePathname } from "next/navigation";
import ScrollIndicator from "./(components)/ScrollIndicator";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>Framer Motion Showcase</title>
        <meta
          name="description"
          content="Demonstrating Framer Motion with Next.js 15"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <LazyMotion features={domAnimation}>
          <ScrollIndicator />
          <main className="pt-20 md:pt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="w-full h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </LazyMotion>
      </body>
    </html>
  );
}
