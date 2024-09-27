import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {  Mail, Plus, Settings,  TwitterIcon, X } from 'lucide-react'

const GooeyMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const buttonVariants = {
    closed: { scale: 1, rotate: 0 },
    open: { scale: 1, rotate: 135 }
  }

  const menuItemVariants = {
    closed: { 
      y: 0, 
      opacity: 0,
      transition: { duration: 0.4 }
    },
    open: (custom: number) => ({ 
      y: custom, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.7, // Increased duration by 1 second
      }
    })
  }

  return (
    <div className="relative h-[300px] w-full flex items-center justify-center">
      <div className="gooey-menu relative">
        <motion.button
          className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white"
          onClick={toggleMenu}
          variants={buttonVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          {isOpen ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 46 }}
              transition={{ duration: 0.3 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <Plus size={28} />
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.button
                className="absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-white"
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                custom={-80}
              >
                <Settings size={20} />
              </motion.button>
              <motion.button
                className="absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-full bg-blue-400 text-white"
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                custom={-160}
              >
                <TwitterIcon size={20} />
              </motion.button>
              <motion.button
                className="absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white"
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                custom={-240}
              >
                <Mail size={20} />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      <svg className="absolute hidden" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        .gooey-menu {
          filter: url(#gooey);
        }
      `}</style>
    </div>
  )
}

export default GooeyMenu