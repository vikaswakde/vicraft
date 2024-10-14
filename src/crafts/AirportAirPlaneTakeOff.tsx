import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import bangaloreAirport from "@/app/images/bagalore-airport.png"
import puneAirport from '@/app/images/pune-airport.png'
import indigoPlane from '@/app/images/indigo-plane.png'

const AirportAirPlaneTakeOff: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-blue-200 overflow-hidden">
      {/* Bangalore Airport */}
      <div className="absolute bottom-0 left-0 w-2/5 h-2/5 border border-red-400 border-3">
        <Image
          src={bangaloreAirport}
          alt="Bangalore Airport"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Pune Airport */}
      <div className="absolute top-0 right-0 w-2/5 h-2/5">
        <Image
          src={puneAirport}
          alt="Pune Airport"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Airplane */}
      <motion.div
        className="absolute z-10 top-0 right-0"
        initial={{ translateX: '-65rem', translateY: '-10rem' }}
        animate={{ translateX: '10rem', translateY: '-10rem' }}
        transition={{ 
          duration: 10, 
          ease: "easeInOut"
        }}
      >
        <Image
          src={indigoPlane}
          alt="Indigo Plane"
          width={100}
          height={50}
        />
      </motion.div>
    </div>
  )
}

export default AirportAirPlaneTakeOff