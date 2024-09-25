"use client";
import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StarRating: React.FC<{
  rating: number;
  setRating: (rating: number) => void;
}> = ({ rating, setRating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTouchMove = (e: React.TouchEvent, star: number) => {
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const starElement = elements.find(el => el.tagName === 'BUTTON');
    if (starElement) {
      const starIndex = parseInt(starElement.getAttribute('data-star') || '0', 10);
      setHoveredRating(starIndex);
    }
  };

  const handleTouchEnd = () => {
    setRating(hoveredRating);
    setHoveredRating(0);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          data-star={star}
          className={`text-3xl focus:outline-none`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setRating(star)}
          onHoverStart={() => setHoveredRating(star)}
          onHoverEnd={() => setHoveredRating(0)}
          onTouchMove={(e) => handleTouchMove(e, star)}
          onTouchEnd={handleTouchEnd}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              color: star <= (hoveredRating || rating) ? "#FBBF24" : "#D1D5DB",
            }}
            transition={{ duration: 0.2 }}
          >
            ★
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
};

const FeedbackButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        feedbackRef.current &&
        !feedbackRef.current.contains(event.target as Node) &&
        isExpanded
      ) {
        setIsClosing(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleAnimationComplete = () => {
    if (isClosing) {
      setIsExpanded(false);
      setIsClosing(false);
      resetState();
    }
  };

  const resetState = () => {
    setInputValue("");
    setIsSending(false);
    setIsThankYouVisible(false);
    setRating(0);
  };

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendFeedback = () => {
    if (inputValue.trim() === "" || rating === 0) return; // Prevent submission if input is empty or no rating
    setIsSending(true);
    // Here you would typically send the feedback and rating to your server
    setTimeout(() => {
      setIsSending(false);
      setIsThankYouVisible(true);
    }, 2000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        // Only submit if input is not empty
        handleSendFeedback();
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="relative inline-block" ref={feedbackRef}>
        <AnimatePresence>
          {!isExpanded ? (
            <motion.button
              className="px-8 py-4 text-xl font-semibold bg-white/90 border-[0.5rem] border-purple-100 text-purple-500 rounded-2xl cursor-pointer shadow-lg hover:bg-purple-50 transition-colors duration-300"
              onClick={handleClick}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0 }}
            >
              Feedback
            </motion.button>
          ) : (
            <motion.div
              className="w-96 h-64 bg-purple-100 border-purple-500 rounded-2xl shadow-xl overflow-hidden p-0"
              initial={{ width: "auto", height: "auto", y: 0, opacity: 1 }}
              animate={
                isClosing
                  ? {
                      width: "auto",
                      height: "auto",
                      y: 0,
                      scale: 0.6,
                      opacity: 0.9,
                      transition: {
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1],
                      },
                    }
                  : { width: 384, height: 256, y: -128, scale: 1, opacity: 1 }
              }
              exit={{
                width: "auto",
                height: "auto",
                y: 0,
                scale: 0.5,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              onAnimationComplete={handleAnimationComplete}
            >
              <motion.div
                className="w-full h-full p-3 relative"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <textarea
                  className="w-full h-[calc(100%)] px-4 pt-3 pb-10 text-lg font-semibold rounded-xl text-purple-700 focus:outline-none resize-none"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={isThankYouVisible}
                />
                <AnimatePresence>
                  {(inputValue === "" || isClosing) && !isThankYouVisible && (
                    <motion.span
                      className="absolute text-xl font-semibold text-purple-400 pointer-events-none ml-2"
                      initial={
                        isClosing
                          ? {
                              top: "1.5rem",
                              left: "1.5rem",
                              x: 0,
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              top: "50%",
                              left: "50%",
                              x: "-50%",
                              y: "-50%",
                              opacity: 1,
                            }
                      }
                      animate={
                        isClosing
                          ? {
                              top: "50%",
                              left: "50%",
                              x: "-50%",
                              y: "-50%",
                              opacity: 1,
                              scale: 1.2,
                            }
                          : {
                              top: "1.5rem",
                              left: "1.5rem",
                              x: 0,
                              y: 0,
                              opacity: 1,
                              scale: 1,
                            }
                      }
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      Feedback
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.div
                  className="absolute bottom-5 left-3 right-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isClosing ? 0 : 1,
                    y: isClosing ? 10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="relative"
                    animate={{ opacity: isClosing ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-dashed border-purple-300 my-2"></div>
                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-[0.8rem] h-4 bg-purple-100 rounded-2xl"></div>
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-[0.8rem] h-4 bg-purple-100 rounded-2xl"></div>
                  </motion.div>
                  <div className="flex justify-between items-center pl-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isClosing ? 0 : 1,
                        x: isClosing ? -20 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <StarRating rating={rating} setRating={setRating} />
                    </motion.div>
                    <motion.button
                      className="float-right px-4 py-2 text-sm font-semibold bg-purple-500 text-white rounded-lg cursor-pointer shadow-md hover:bg-purple-600 transition-colors duration-300 mr-2 flex items-center justify-center min-w-[120px] min-h-[36px]"
                      onClick={handleSendFeedback}
                      disabled={
                        isSending ||
                        isThankYouVisible ||
                        inputValue.trim() === "" ||
                        isClosing
                      }
                      animate={{
                        opacity: isClosing ? 0 : 1,
                        scale: isClosing ? 0.8 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatePresence mode="wait">
                        {isSending ? (
                          <motion.div
                            key="loader"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-loader"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <path d="M12 2v4" />
                              <path d="m16.2 7.8 2.9-2.9" />
                              <path d="M18 12h4" />
                              <path d="m16.2 16.2 2.9 2.9" />
                              <path d="M12 18v4" />
                              <path d="m4.9 19.1 2.9-2.9" />
                              <path d="M2 12h4" />
                              <path d="m4.9 4.9 2.9 2.9" />
                            </motion.svg>
                          </motion.div>
                        ) : (
                          <motion.span
                            key="text"
                            initial={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            Send Feedback
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
              <AnimatePresence>
                {isThankYouVisible && (
                  <motion.div
                    className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="text-blue-500 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: isClosing ? 0 : 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </motion.div>
                    <motion.h2
                      className="text-2xl font-bold text-gray-800 mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        isClosing
                          ? {
                              y: 0,
                              opacity: 1,
                              scale: 1,
                              fontSize: "1.5rem",
                              color: "#8B5CF6", // Purple color to match the button
                            }
                          : {
                              y: 0,
                              opacity: 1,
                              scale: 1,
                              fontSize: "1.5rem",
                              color: "#1F2937", // Original color
                            }
                      }
                      exit={
                        isClosing
                          ? {
                              y: 0,
                              opacity: 1,
                              scale: 1.2,
                              fontSize: "1.25rem",
                              color: "#8B5CF6",
                            }
                          : {
                              y: 20,
                              opacity: 0,
                            }
                      }
                      transition={{
                        duration: 0,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      {isClosing ? "Feedback" : "Feedback received!"}
                    </motion.h2>
                    <motion.p
                      className="text-gray-600"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        isClosing ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }
                      }
                      exit={{ y: 20, opacity: 0 }}
                      transition={{
                        delay: 0.1,
                        duration: 0.3,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      Thanks for helping us improve the service.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeedbackButton;
