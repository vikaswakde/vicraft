import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Bell,
  Brush,
  Box,
  Image,
  Search,
  Gauge,
  Eraser,
} from "lucide-react";

const RadialMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [centerIcon, setCenterIcon] = useState<React.ElementType>(Menu);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Bell, label: "Notifications" },
    { icon: Brush, label: "Draw" },
    { icon: Box, label: "Package" },
    { icon: Image, label: "Images" },
    { icon: Search, label: "Search" },
    { icon: Gauge, label: "Dashboard" },
    { icon: Eraser, label: "Erase" },
  ];

  const buttonVariants = {
    closed: { scale: 1, rotate: 0 },
    open: { scale: 1, rotate: 360 },
  };

  const menuItemVariants = {
    closed: (custom: number) => ({
      scale: 0,
      opacity: 0,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 14,
        delay: custom * 0.08,
        duration: 0.4,
      },
    }),
    open: (custom: number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 14,
        delay: custom * 0.08,
        duration: 0.4,
      },
    }),
  };

  const centerIconVariants = {
    initial: { scale: 1, rotate: 0 },
    selected: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const radius = 120; // Adjust this value to change the size of the circle

  const handleIconClick = useCallback((icon: React.ElementType) => {
    setCenterIcon(icon);
    setIsOpen(false);
  }, []);

  return (
    <div className="relative w-64 h-64">
      <motion.button
        onClick={toggleMenu}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white rounded-full p-4 shadow-lg cursor-pointer bg-black"
        variants={buttonVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          variants={centerIconVariants}
          initial="initial"
          animate="selected"
          key={centerIcon.toString()} // Use toString() instead of name
        >
          {React.createElement(centerIcon, { size: 24 })}
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            {menuItems.map((item, index) => {
              const angle =
                (index / menuItems.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <motion.button
                  key={index}
                  className="absolute top-1/2 left-1/2 bg-white text-gray-800 rounded-full p-3 shadow-md cursor-pointer"
                  variants={menuItemVariants}
                  custom={index}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  style={{
                    x: `calc(-10% + ${Math.cos(angle) * radius}px)`,
                    y: `calc(-10% + ${Math.sin(angle) * radius}px)`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleIconClick(item.icon)}
                >
                  <item.icon size={24} />
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>
      <div className="gooey-filter" />
      <style jsx>{`
        .gooey-filter {
          filter: url(#gooey);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
      <svg
        className="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default RadialMenu;
