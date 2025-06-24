import { cn } from "@/app/lib/utils";
import React from "react";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import pocketlogo from "@/app/images/pocket-logo.png";
import { PlusIcon, XIcon } from "lucide-react";
import { Gemini, OpenAI } from "@lobehub/icons";
import { motion } from "motion/react";

const PocketCard = () => {
  return (
    <div
      className={cn(
        "w-[28rem] min-h-[42rem] h-[42rem] rounded-[0.82rem]",

        // the below code has a space so it does not get parsed by tailwind
        // shadow-[0px_1px_1px_rgba(0,0,0,0.05), 0px_4px_6px_rgba(34,42,53,0.04),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]",

        // the below codes does not have a space so it gets parsed by tailwind
        // taken from perpexlity card shadow
        "shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1)]",

        // this one is from tutorial
        // "shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]",

        "p-6 flex flex-col bg-white",
        GeistSans.className
      )}
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-neutral-700/90">
          Pocket AI
        </h2>
        <motion.button
          initial="rest"
          whileHover="hover"
          variants={{
            rest: {
              opacity: 0.98,
              scale: 1,
              gap: "4px",
            },
            hover: {
              opacity: 1,
              scale: 1.05,
              gap: "8px",
            },
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className={cn(
            "flex items-center  text-lg",
            "shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1)]",
            "rounded-[0.82rem] px-3 py-2  opacity-85"
          )}
        >
          <Image
            width={60}
            height={60}
            className="h-8 w-8"
            alt="logo"
            src={pocketlogo}
          />
          <motion.div
            variants={{
              rest: {
                width: 0,
                opacity: 0,
              },
              hover: {
                width: "auto",
                opacity: 1,
              },
            }}
            className="overflow-hidden"
          >
            <XIcon className="text-neutral-400 h-5 w-5 ml-1" />
          </motion.div>
        </motion.button>
      </div>

      <p className="text-neutral-600/70 text-[15px] leading-5 text-wrap max-w-[52%] -mt-3.5">
        A beautiful collection of AI cards.
      </p>

      <div className="flex-1 mt-8 bg-gray-100 rounded-[0.82rem] border border-dashed border-neutral-300 relative">
        {/* list models here */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
            filter: "blur(10px)",
          }}
          whileHover={{
            opacity: 1,
            scale: 1.05,
            filter: "blur(0px)",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 18,
          }}
          className="absolute inset-0 h-full w-full bg-white/35 rounded-lg  divide-y divide-neutral-200 p-2.5"
        >
          {/* card-1 */}
          <div className="flex gap-6 p-4">
            <div className="h-12 w-12 flex-shrink-0 bg-gradient-to-br shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1)] bg-white/10 rounded-3xl flex items-center justify-center border-white border-2 opacity-75">
              <Gemini.Avatar size={32} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-neutral-600/95">
                Google Gemini
              </p>
              <p className="text-neutral-500/75 text-sm mt-1">
                A collection of top gemini models
              </p>
            </div>
          </div>

          {/* card-2 */}
          <div className="flex gap-6 p-4">
            <div className="h-12 w-12 flex-shrink-0 bg-gradient-to-br shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1)] bg-white/10 rounded-3xl flex items-center justify-center border-white border-2 opacity-75">
              <OpenAI.Avatar size={32} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-neutral-500/95">
                OpenAI
              </p>
              <p className="text-neutral-500/75 text-sm mt-1">
                A collection of top OpenAI models
              </p>
            </div>
          </div>

          {/* action button */}
          <div className="flex gap-4 p-5 items-center justify-center">
            <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1)] bg-white/10 rounded-3xl flex items-center justify-center border-white border-2 opacity-75">
              <PlusIcon size={18} className="text-neutral-700/95" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-bold text-neutral-400 mt-1">
                More AI Cards
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PocketCard;
