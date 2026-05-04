import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'VIPIN',
    source: 'Justdial.com',
    date: '03:22 PM, 16 Jun',
    content: 'I recently used Globe Express Logistics for transporting my personal items, and I couldn\'t be more satisfied! Their safe packaging ensured everything arrived in perfect condition.'
  },
  {
    name: 'Priya Sharma',
    source: 'Google Reviews',
    date: '11:45 AM, 22 Jun',
    content: 'Excellent service from start to finish. The team was professional, punctual, and handled our commercial freight with utmost care. Highly recommend for business logistics.'
  },
  {
    name: 'Rajesh Kumar',
    source: 'Justdial.com',
    date: '02:15 PM, 28 Jun',
    content: 'Globe Express made our household relocation stress-free. Their systematic approach and good customer service made the entire process smooth. Great value for money!'
  }
];

function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{letterSpacing: '-0.02em'}}>
          Customer testimonials
        </h2>
        
        <div className="relative">
          <div className="absolute -top-6 -left-4 text-primary/20">
            <Quote className="w-16 h-16" />
          </div>
          
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <p className="text-lg md:text-xl leading-relaxed mb-6 text-foreground">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].source} • {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-border'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSlider;