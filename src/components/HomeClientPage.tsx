"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  BugIcon, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import HeroLogos from '@/components/ui/hero-logo';
import CookieConsent from '@/components/CookieConsent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';

import { MacbookScroll } from '@/components/ui/macbook-scroll';
import { initPerformanceOptimizations } from '@/lib/performance';


import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Meteors } from '@/components/ui/meteors';

import LiquidGlass from '@/components/ui/liquid-glass';
import LogoMarquee from '@/components/ui/logo-marquee';
import PauseWhenOffscreen from '@/components/ui/PauseWhenOffscreen';

// Optimized lazy loading with preloading
const CpuArchitecture = React.lazy(() => 
  import("@/components/ui/cpu-architecture").then(module => ({
    default: module.default
  }))
);

const SplineSceneShowcase = React.lazy(() => 
  import("@/components/ui/SplineSceneShowcase").then(module => ({
    default: module.default
  }))
);

// Preload heavy components after initial render
const preloadComponents = () => {
  import("@/components/ui/cpu-architecture");
  import("@/components/ui/SplineSceneShowcase");
};

// Lazy load testimonials component
const LazyTestimonials = React.lazy(() => 
  import('./LazyTestimonials').then(module => ({
    default: module.default
  }))
);



// @ts-ignore
const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

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

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const increment = Math.ceil(target / 50);
        const interval = setInterval(() => {
          setCount((prevCount) => {
            const nextCount = prevCount + increment;
            return nextCount >= target ? target : nextCount;
          });
        }, 20);

        return () => clearInterval(interval);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [target, isVisible]);

  return <div ref={counterRef}>{isVisible ? count : 0}</div>;
};

const HomeClientPage = () => {
  // Preload heavy components after initial render
  useEffect(() => {
    const timer = setTimeout(preloadComponents, 2000);
    return () => clearTimeout(timer);
  }, []);

  const achievements = [
    { icon: Award, label: "Hall of Fame", target: 9 },
    { icon: BugIcon, label: "Bugs Reported", target: 100 },
    { icon: Briefcase, label: "Projects", target: 10 }
  ];

  const testimonials = [
    {
      message: 'Hi Sajal, we would like to extend our sincere appreciation for your attentiveness and initiative in bringing the recent security issue to our attention. Your proactive approach reflects a strong sense of responsibility and commitment to maintaining high standards in our work. Identifying such concerns early not only helps us prevent potential challenges but also enables our team to implement timely solutions. Thank you for your valuable contribution to our security.',
      avatar: "/logos/hof/hdfc.png",
      name: 'Ajay Kumar',
      position: 'Service Manager @ HDFC Bank'
    },
    {
      message: 'We appreciate your thorough security assessment and detailed findings. Your expertise in identifying critical vulnerabilities has been instrumental in strengthening our platform\'s security posture. The professional manner in which you conducted the assessment and provided clear remediation recommendations demonstrates your commitment to responsible disclosure. We look forward to continued collaboration with you.',
      avatar: "/logos/hof/rapyd.png",
      name: 'Security Team',
      position: 'Security Operations @ Rapyd'
    },
    {
      message: 'Thank you for your outstanding work in identifying and responsibly disclosing the security vulnerabilities in our systems. Your technical expertise and attention to detail have significantly contributed to improving our overall security infrastructure. We truly value your commitment to working collaboratively with our teams to resolve these issues promptly and effectively.',
      avatar: "/logos/hof/tesla.png",
      name: 'David Chen',
      position: 'Security Director @ Tesla'
    },
    {
      message: 'We are grateful for your excellent security research and proactive engagement with our vulnerability disclosure program. Your findings have helped us address potential risks and enhance our platform\'s resilience. Your professional approach to security research and timely communication throughout the process have set a benchmark for responsible disclosure practices in our industry.',
      avatar: "/logos/hof/tripadvisor.png",
      name: 'Rachel Mitchell',
      position: 'Head of Security @ Trip Advisor'
    },
    {
      message: 'On behalf of Lovely Professional University, we commend your dedication to cybersecurity excellence and your valuable contributions to the security community. Your insights on emerging threats and vulnerabilities have proven invaluable in our ongoing efforts to strengthen our digital infrastructure. We deeply appreciate your collaboration and commitment to advancing security awareness in the academic sector.',
      avatar: "/logos/hof/lpu.png",
      name: 'Dr. Vinay Anand ',
      position: 'Division of Infotech  @ Lovely Professional University'
    },
    {
      message: 'Thank you for the clear, responsible disclosure and the thorough technical details. Your findings helped us validate our security controls quickly, and your collaboration made remediation smooth and efficient. We appreciate your professionalism and commitment to keeping users safe.',
      avatar: "/logos/hof/asana.jpg",
      name: 'Sean Cassidy',
      position: 'Head of Security @ Asana'
    },
    {
      message: 'We value your proactive security research and the careful way you coordinated the disclosure. Your report was well-structured, actionable, and helped our team address the issue promptly. Thank you for contributing to a safer experience for our customers.',
      avatar: "/logos/hof/indigo.png",
      name: 'Arvind Bhandari',
      position: 'Chief Security Officer @ IndiGo'
    },
  ];

  const logos = [
    {
      src: "/logos/android-studio-icon.png",
      alt: "Android Testing",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/ios.png",
      alt: "IOS",
      width: 40,
      height: 40,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/burp.png",
      alt: "Burp Suite",
      width: 40,
      height: 40,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/nmap.jpeg",
      alt: "Nmap",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/metasploit.png",
      alt: "Metasploit",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/wireshark.png",
      alt: "Wireshark",
      width: 45,
      height: 45,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/postman.png",
      alt: "Postman",
      width: 45,
      height: 45,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/terminal.png",
      alt: "Terminal",
      width: 45,
      height: 45,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/python.png",
      alt: "Python",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/github.png",
      alt: "Github",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/js.webp",
      alt: "Javascript",
      width: 55,
      height: 55,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/aws.png",
      alt: "Aws",
      width: 45,
      height: 45,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/xcode.png",
      alt: "Xcode",
      width: 50,
      height: 50,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/kali.png",
      alt: "Kali Linux",
      width: 65,
      height: 65,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/fortify.png",
      alt: "Fortify",
      width: 40,
      height: 40,
      darkShadow: {
        hex: "",
      }
    },
    {
      src: "/logos/openvas.png",
      alt: "Openvas",
      width: 65,
      height: 65,
      darkShadow: {
        hex: "",
      }
    },
  ];

  const hallOfFames = [
    { name: 'HDFC Bank', file: 'hdfc.png', maxHeight: 48, url: '', brandColor: '#0072CE' },
    { name: 'Rapyd', file: 'rapyd.png', maxHeight: 48, url: '', brandColor: '#FF2D55' },
    { name: 'Tesla', file: 'tesla.png', maxHeight: 48, url: '', brandColor: '#CC0000' },
    { name: 'Trip Advisor', file: 'tripadvisor.png', maxHeight: 48, url: '', brandColor: '#00A95C' },
    { name: 'Lovely Professional University', file: 'lpu.png', maxHeight: 48, url: '', brandColor: '#6B1E6A' },
    { name: 'Asana', file: 'asana.jpg', maxHeight: 48, url: '', brandColor: '#FC636B' },
    { name: 'IndiGo', file: 'indigo.png', maxHeight: 48, url: '', brandColor: '#2E3192' },
    { name: 'Bisleri', file: 'bisleri.png', maxHeight: 48, url: '', brandColor: '#1B5E20' },
    { name: 'DoorDash', file: 'doordash.png', maxHeight: 48, url: '', brandColor: '#FF3008' }
  ];

  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted after component mounts
  useEffect(() => {
    setIsMounted(true);
    initPerformanceOptimizations();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      {/* Clean Dark Background with Subtle Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      

      <div className='bg-gradient-to-b from-black via-zinc-950 to-zinc-900 w-full flex justify-center pb-3 sm:pb-6 relative z-10'>
        <div className="relative z-10 max-w-5xl w-full px-4">
          <div className="text-center mb-6 sm:mb-12 relative h-[65vh] sm:h-[75vh] md:h-[85vh] flex flex-col justify-center items-center">
            <div className='max-w-lg w-full relative flex flex-col justify-center items-center pt-8 sm:pt-0'>
              <PauseWhenOffscreen className="absolute inset-0 z-0">
                <Meteors number={12} color="rainbow" />
              </PauseWhenOffscreen>
              
              <HeroLogos logos={[...logos]} />
              <div className="-mt-56 sm:-mt-64 md:-mt-72 flex flex-col items-center">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-full border border-white/10 shadow-xl mb-3 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]">
                    <img
                      className='w-full h-full object-cover'
                      src="/Sajal_Gupta.webp"
                      alt="SAJAL GUPTA"
                      width={200}
                      height={200}
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>
                </div>
                
                <h1 className="relative text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1 text-white">
                  SAJAL GUPTA
                </h1>
                <div className="text-sm text-gray-300 mb-2 sm:mb-3">
                  Security Researcher & Bug Hunter
                </div>
                <Button
                  href="/what-is-hacking"
                  variant="outline"
                  size="sm"
                  className="mt-1"
                >
                  What is Hacking?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End of first page section */}

      {/* Streamlined Hall of Fame - Logo Marquee with enhanced styling */}
      <div className="w-full">
        <div className="relative overflow-hidden border-t border-zinc-800/30">
          <div className="w-full relative bg-gradient-to-b from-black to-zinc-950/95">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-500/5 rounded-full blur-[80px]"></div>
            </div>
            
            <div className="relative max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
              {/* Enhanced header with badge */}
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent"></div>
                  <LiquidGlass variant="subtle" className="px-3 py-1 mx-3" rounded="full">
                    <h3 className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Security Researcher</h3>
                  </LiquidGlass>
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent"></div>
                </div>
                
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent pb-1">
                  Hall of Fame
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-xl text-center mt-1">
                  Recognized by leading tech companies for responsible security disclosures
                </p>
              </div>
              
              {/* Enhanced LogoMarquee with advanced styling */}
              <PauseWhenOffscreen>
                <LogoMarquee
                  logos={hallOfFames}
                  direction="right"
                  pauseOnHover={true}
                  speed={20}
                  gradientWidth={120}
                  gradientColor={'rgba(0,0,0,0.95)'}
                  imagePath={'/logos/hof/'}
                  className="max-w-[100vw] overflow-hidden"
                />
              </PauseWhenOffscreen>
              
              {/* View all accolades button */}
              <div className="flex justify-center mt-6">
                <LiquidGlass variant="subtle" className="hover:bg-white/[0.02] transition-all duration-300" rounded="lg">
                <a 
                  href="/resources/hall-of-fame" 
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  <Award size={14} />
                  View All Recognitions
                </a>
                </LiquidGlass>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-8xl w-full px-6 pb-0 sm:pb-8 md:pb-12 lg:pb-16 pt-0 sm:pt-6 md:pt-8 lg:pt-10">
        {/* 3D Interactive Showcase - Full width */}
        <div className="w-full my-8 sm:my-12 md:my-16 py-4 sm:py-8 md:py-12">
          <SplineSceneShowcase />
        </div>
        
        {/* Achievements Section */}
        <Section paddingY="md">
          <SectionHeader>
            <SectionTitle>Achievements</SectionTitle>
          </SectionHeader>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <LiquidGlass 
                  variant="card"
                  className="p-4 sm:p-6 md:p-8"
                  rounded="xl"
                  morphOnHover={true}
              >
                <motion.div 
                    className="relative"
                  whileHover={{ 
                      scale: 1.02,
                  }}
                  transition={{ 
                    duration: 0.3, 
                    scale: { type: "spring", stiffness: 300 }
                  }}
                >
                  {/* Icon and Counter layout */}
                  <div className="flex flex-col items-center text-center">
                    {/* Icon container */}
                    <div className="h-12 w-12 rounded-lg bg-zinc-800/70 flex items-center justify-center mb-5 relative">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5"></div>
                      <achievement.icon className="w-6 h-6 text-blue-400" />
                      <div
                        className="absolute -inset-0.5 rounded-lg opacity-20"
                        style={{
                          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
                        }}
                      />
                    </div>
                  
                    {/* Counter with minimal styling */}
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 text-white">
                      <AnimatedCounter target={achievement.target} />
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base">{achievement.label}</p>
                  </div>
                  
                  {/* Subtle background accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                </motion.div>
                </LiquidGlass>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CPU Architecture Section */}
        <div className="py-2 sm:py-4 md:py-6 relative">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
              <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="overflow-visible"
              >
                <PauseWhenOffscreen>
                  <CpuArchitecture
                    className="w-full h-[140px] sm:h-[180px] md:h-[220px] text-zinc-500 hover:text-zinc-300 transition-colors duration-700"
                    lineMarkerSize={3}
                    fontSize="5"
                    strokeWidth="0.25"
                    showCpuConnections={true}
                    text="CPU"
                    animateText={true}
                    showScanEffect={true}
                  />
                </PauseWhenOffscreen>
              </motion.div>
            </motion.div>
          </div>
        </div>
                  
        {/* Connector Lines - Bottom */}
        <div className="relative h-6 sm:h-8 md:h-10 overflow-hidden">
          <div className="absolute left-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent"></div>
        </div>

        <React.Suspense fallback={
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        }>
        <LazyTestimonials testimonials={testimonials} />
        </React.Suspense>

        {/* CTF Challenge Section */}
        <Section paddingY="md" className="mt-4 sm:mt-8 md:mt-16 relative">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-[70px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-[70px]"></div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-400 text-sm max-w-2xl mx-auto text-center">
              Put your security skills to the test in our interactive hacking playground
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl relative">
              {/* Left side pointer annotations */}
              <div className="hidden lg:block absolute left-0 top-1/4 z-20 xl:-translate-x-24">
                <div className="relative">
                  {/* First pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-start gap-2 mb-20"
                  >
                    <LiquidGlass variant="subtle" className="p-3 max-w-[200px] border-blue-500/30 shadow-lg shadow-blue-500/10" rounded="lg">
                      <h4 className="text-blue-400 font-medium text-sm">Learn by Doing</h4>
                      <p className="text-xs text-gray-300 mt-1">Hands-on experience with real-world security scenarios</p>
                    </LiquidGlass>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 100 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="h-[2px] bg-gradient-to-r from-blue-500/80 to-blue-500/20 mt-6 origin-left"
                    >
                    </motion.div>
                  </motion.div>
                  
                  {/* Second pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex items-start gap-2 mb-20"
                  >
                    <LiquidGlass variant="subtle" className="p-3 max-w-[200px] border-purple-500/30 shadow-lg shadow-purple-500/10" rounded="lg">
                      <h4 className="text-purple-400 font-medium text-sm">Build Portfolio</h4>
                      <p className="text-xs text-gray-300 mt-1">Track progress and showcase your achievements to employers</p>
                    </LiquidGlass>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      className="h-[2px] bg-gradient-to-r from-purple-500/80 to-purple-500/20 mt-6 origin-left"
                    >
                    </motion.div>
                  </motion.div>
                  
                  {/* Third pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex items-start gap-2"
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 max-w-[200px] border-green-500/30 shadow-lg shadow-green-500/10">
                      <h4 className="text-green-400 font-medium text-sm">Community Support</h4>
                      <p className="text-xs text-gray-300 mt-1">Connect with peers and get help from experienced hackers</p>
                    </LiquidGlass>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 120 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="h-[2px] bg-gradient-to-r from-green-500/80 to-green-500/20 mt-6 origin-left"
                    >
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              
              {/* Right side pointer annotations */}
              <div className="hidden lg:block absolute right-0 top-1/4 z-20 xl:translate-x-24">
                <div className="relative">
                  {/* First pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex items-start gap-2 mb-20 flex-row-reverse"
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 max-w-[200px] border-red-500/30 shadow-lg shadow-red-500/10">
                      <h4 className="text-red-400 font-medium text-sm">Realistic Scenarios</h4>
                      <p className="text-xs text-gray-300 mt-1">Practice on environments that mirror real-world applications</p>
                    </LiquidGlass>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 100 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                      className="h-[2px] bg-gradient-to-l from-red-500/80 to-red-500/20 mt-6 origin-right"
                    >
                    </motion.div>
                  </motion.div>
                  
                  {/* Second pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="flex items-start gap-2 mb-20 flex-row-reverse"
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 max-w-[200px] border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                      <h4 className="text-yellow-400 font-medium text-sm">Earn Rewards</h4>
                      <p className="text-xs text-gray-300 mt-1">Collect points, badges, and certificates as you complete challenges</p>
                    </LiquidGlass>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                      className="h-[2px] bg-gradient-to-l from-yellow-500/80 to-yellow-500/20 mt-6 origin-right"
                    >
                    </motion.div>
                  </motion.div>
                  
                  {/* Third pointer */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 2.1 }}
                    className="flex items-start gap-2 flex-row-reverse"
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 max-w-[200px] border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                      <h4 className="text-cyan-400 font-medium text-sm">Level Up Skills</h4>
                      <p className="text-xs text-gray-300 mt-1">Progressive difficulty to help you grow from beginner to expert</p>
                    </LiquidGlass>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 120 }}
                      transition={{ duration: 0.6, delay: 2.3 }}
                      className="h-[2px] bg-gradient-to-l from-cyan-500/80 to-cyan-500/20 mt-6 origin-right"
                    >
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              
            <MacbookScroll
              title={
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="text-center"
                    >
                      <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
                        Capture The Flag Challenges
                      </div>
                      <div className="text-lg text-gray-300">
                        Test your skills. Learn new techniques. Earn rewards.
                      </div>
                    </motion.div>
              }
              badge={
                    <LiquidGlass variant="subtle" className="px-4 py-2" rounded="full" morphOnHover={false}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.4)]"></div>
                        <span className="text-xs text-white font-medium">Coming Soon</span>
                    </div>
                    </LiquidGlass>
              }
              src="/images/ctf-image.jpg"
                showGradient={true}
              />
              
              {/* Mobile/tablet version of the benefits */}
              <div className="lg:hidden mt-8 space-y-10">
                {/* First pointer - Learn by Doing */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-blue-500/80 to-blue-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-blue-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 border-blue-500/30 shadow-lg shadow-blue-500/10">
                    <h4 className="text-blue-400 font-medium text-sm">Learn by Doing</h4>
                    <p className="text-xs text-gray-300 mt-1">Hands-on experience with real-world security scenarios</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
                
                {/* Second pointer - Build Portfolio */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-purple-500/80 to-purple-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 1.0 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-purple-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 border-purple-500/30 shadow-lg shadow-purple-500/10">
                    <h4 className="text-purple-400 font-medium text-sm">Build Portfolio</h4>
                    <p className="text-xs text-gray-300 mt-1">Track progress and showcase your achievements to employers</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
                
                {/* Third pointer - Realistic Scenarios */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-red-500/80 to-red-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 1.2 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-red-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 border-red-500/30 shadow-lg shadow-red-500/10">
                    <h4 className="text-red-400 font-medium text-sm">Realistic Scenarios</h4>
                    <p className="text-xs text-gray-300 mt-1">Practice on environments that mirror real-world applications</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>

                {/* Fourth pointer - Earn Rewards */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-yellow-500/80 to-yellow-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 1.4 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-yellow-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                    <h4 className="text-yellow-400 font-medium text-sm">Earn Rewards</h4>
                    <p className="text-xs text-gray-300 mt-1">Collect points, badges, and certificates as you complete challenges</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>

                {/* Fifth pointer - Level Up Skills */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="relative pl-6"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-cyan-500/80 to-cyan-500/20 origin-top"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50px" }}
                      transition={{ duration: 0.3, delay: 1.6 }}
                      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-cyan-500 -ml-[3px]"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    <LiquidGlass variant="subtle" rounded="lg" className=" p-3 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                    <h4 className="text-cyan-400 font-medium text-sm">Level Up Skills</h4>
                    <p className="text-xs text-gray-300 mt-1">Progressive difficulty to help you grow from beginner to expert</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12 md:mt-16 max-w-3xl text-center">
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="https://ctf.guptasajal.com"
                variant="primary"
                size="lg"
                isExternal={true}
                  glassEffect={true}
                  glassVariant="subtle"
                  className="flex items-center gap-3 text-white font-medium"
                >
                  <span className="text-white">Join the waitlist</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Button>
                <Button
                  href="/what-is-hacking"
                  variant="outline"
                  size="lg"
                  glassEffect={true}
                  glassVariant="subtle"
                  className="text-white/80 hover:text-white font-medium transition-colors duration-300"
                >
                  Learn more
              </Button>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <CookieConsent />
    </div>
  );
};

export default HomeClientPage; 