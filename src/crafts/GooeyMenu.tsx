import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, Plus, Settings, X } from 'lucide-react'

const GooeyMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    },
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    closed: { y: 0, opacity: 0, transition: { duration: 0.2 } },
    open: (custom: number) => ({
      y: [0, -20, custom],
      opacity: 1,
      transition: { 
        y: { type: "spring", stiffness: 300, damping: 24, duration: 0.7 },
        opacity: { duration: 0.2 }
      }
    })
  }
  

  return (
    <div className="relative w-16 h-80" >
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="absolute bottom-0 flex flex-col items-center w-full"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          className="w-16 h-16 rounded-full flex items-center justify-center z-10"
          animate={{ 
            rotate: isOpen ? 180 : 0,
            backgroundColor: isOpen ? "#FF4500" : "#000000",
          }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut",
            backgroundColor: { duration: 0.3 }
          }}
        >
          <motion.span
            className="text-2xl"
            animate={{ 
              rotate: isOpen ? 180 : 0,
              color: isOpen ? "#000000" : "#FFFFFF"
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              color: { duration: 0.3 }
            }}
          >
            {isOpen ? <X size={24} /> : <Plus size={24} />}
          </motion.span>
        </motion.button>
        
        <motion.div custom={-180} variants={itemVariants} className="menu-item absolute">
          <Heart size={24} />
        </motion.div>
        <motion.div custom={-120} variants={itemVariants} className="menu-item absolute">
          <Settings size={24} />
        </motion.div>
        <motion.div custom={-60} variants={itemVariants} className="menu-item absolute">
          <Mail size={24} />
        </motion.div>
      </motion.div>
      
      <style jsx>{`
        .menu-item {
          @apply w-16 h-16 bg-black text-white rounded-full flex items-center justify-center;
          bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default GooeyMenu