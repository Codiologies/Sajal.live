"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Section, SectionHeader, SectionTitle } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface Testimonial {
  message: string;
  avatar: string;
  name: string;
  position: string;
}

interface LazyTestimonialsProps {
  testimonials: Testimonial[];
}

const LazyTestimonials = ({ testimonials }: LazyTestimonialsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Load the testimonials when they become visible
  useEffect(() => {
    if (isVisible && !isLoaded) {
      // Small delay to ensure smooth loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded]);

  return (
    <div ref={containerRef}>
      <Section paddingY="none" className="mb-0">
        <div className="py-2 pb-0 sm:pb-4 md:py-8">
          <SectionHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 mb-3 bg-zinc-800/70 px-3 py-1 rounded-full">
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Company Appreciation</span>
              </div>
              <SectionTitle>Testimonials</SectionTitle>
            </motion.div>
          </SectionHeader>
          
          {isLoaded ? (
            <div className='relative'>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                navigation={true}
                speed={1000}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className='testimonials-swiper'
              >
                {testimonials.map((testimonial, index) => {
                  const isExpanded = expandedIndex === index;

                  return (
                  <SwiperSlide key={index}>
                    <motion.div 
                      className={`group relative rounded-2xl border border-zinc-800/70 bg-zinc-900/50 p-6 sm:p-7 backdrop-blur-md h-[320px] sm:h-[360px] lg:h-[380px] ${isExpanded ? "overflow-y-auto" : "overflow-hidden"} shadow-[0_12px_30px_rgba(0,0,0,0.35)] before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)] before:opacity-0 before:transition-opacity group-hover:before:opacity-100`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: "rgba(59, 130, 246, 0.3)"
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        scale: { type: "spring", stiffness: 300 }
                      }}
                      viewport={{ margin: "-100px" }}
                    >
                      {/* Quote mark */}
                      <div className="text-5xl font-serif text-zinc-800 absolute top-3 left-3">
                        "
                      </div>
                      
                      <div className="flex flex-col h-full relative z-10">
                        {/* Message with better readability */}
                        <p className={`${isExpanded ? "" : "testimonial-message"} text-zinc-300 italic mb-4 text-sm sm:text-base pl-4 leading-relaxed`}>
                          {testimonial.message}
                        </p>

                        <div className="flex items-center justify-end mb-4">
                          <button
                            type="button"
                            className="text-xs sm:text-sm text-blue-300 hover:text-blue-200 transition-colors"
                            onClick={(event) => {
                              event.stopPropagation();
                              setExpandedIndex(isExpanded ? null : index);
                            }}
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? "Show less" : "Read full"}
                          </button>
                        </div>
                        
                        {/* Author info with cleaner design */}
                        <div className="flex items-center mt-auto border-t border-zinc-800/50 pt-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4 object-cover border border-zinc-700"
                            loading="lazy"
                          />
                          <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</h4>
                            <p className="text-zinc-400 text-xs sm:text-sm">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Subtle accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                    </motion.div>
                  </SwiperSlide>
                );
                })}
              </Swiper>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px] sm:h-[300px]">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-blue-400 border-r-transparent"></div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default LazyTestimonials; 