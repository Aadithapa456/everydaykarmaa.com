import { Button } from "@/ui/shadcn/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const screenshots = [
  "/public/feedbacks/feedback-01.png",
  "/public/feedbacks/feedback-02.png",
  "/public/feedbacks/feedback-03.png",
  "/public/feedbacks/feedback-04.png",
  "/public/feedbacks/feedback-05.jng",
  "/public/feedbacks/feedback-06.png",
  "/public/feedbacks/feedback-07.png",
  "/public/feedbacks/feedback-08.png",
  "/public/feedbacks/feedback-09.jpg",
  "/public/feedbacks/feedback-10.png",
  "/public/feedbacks/feedback-11.png",
  "/public/feedbacks/feedback-13.png",
  "/public/feedbacks/feedback-14.png",
  "/public/feedbacks/feedback-15.png",
  "/public/feedbacks/feedback-16.png",
];

export default function FeedbackSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewingAll, setIsViewingAll] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(screenshots.length / itemsPerSlide);

  useEffect(() => {
    if (!isViewingAll) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isViewingAll, totalSlides, itemsPerSlide]);

  const handleViewAll = () => {
    setIsViewingAll(!isViewingAll);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:my-10">
      <p className="~text-4xl/7xl text-everydaykarma text-center font-bold mb-16">
        What our student's have to say?
      </p>

      {!isViewingAll ? (
        <div className="relative px-2 mx-4 md:px-16 md:mx-10">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              className="flex gap-4 "
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: itemsPerSlide }).map((_, offset) => {
                const index =
                  (currentIndex * itemsPerSlide + offset) % screenshots.length;
                return (
                  <div
                    key={index}
                    className={`${itemsPerSlide === 1 ? "w-full" : itemsPerSlide === 2 ? "w-1/2" : "w-1/3"}`}
                  >
                    <img
                      src={screenshots[index]}
                      alt={`Student feedback screenshot ${index + 1}`}
                      className="w-full h-[200px] object-contain rounded-lg shadow-lg"
                    />
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          <Button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 rounded-full p-2 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 rounded-full p-2 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl  mx-auto">
          {screenshots.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Student feedback screenshot ${index + 1}`}
              className="w-full h-[200px] object-contain rounded-lg shadow-lg"
            />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Button
          onClick={handleViewAll}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isViewingAll ? "View Less" : "View All"}
        </Button>
      </div>
    </div>
  );
}
