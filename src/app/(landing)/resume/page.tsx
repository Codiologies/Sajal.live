"use client";

import React, { lazy, Suspense, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCertificate, FaExternalLinkAlt, FaGithub, FaDownload } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import { GoProject } from "react-icons/go";
import { MdFeaturedPlayList } from "react-icons/md";
import { Shield, Smartphone, Server, Laptop, Wifi, Users, BookOpen, Target, Code, Database, Cpu, Globe, Lock, BrainCircuit, Network, HardDrive, Award, Calendar, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import dynamic from 'next/dynamic';

import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section';
import { TimelineItem } from '@/components/ui/timeline-item';
import { SkillProgress } from '@/components/ui/skill-progress';
import { ProjectCard } from '@/components/ui/project-card';
import { Card } from '@/components/ui/card';
import { EducationCard } from '@/components/ui/education-card';
import { Meteors } from '@/components/ui/meteors';
import AnimatedPhone from '@/components/ui/animated-phone';
import LiquidGlass from '@/components/ui/liquid-glass';

import lpuLogo from '../../../../education/lpu.png';
import teresaLogo from '../../../../education/teresa.png';
import bugcrowdLogo from '../../../../education/bugcrowd.png';
import hackeroneLogo from '../../../../education/hackerone.png';
import wijungleLogo from '../../../../education/wijungle.png';


// Simple loading component for suspense fallbacks
const LoadingPlaceholder = () => (
  <div className="w-full h-40 animate-pulse bg-zinc-800/50 rounded-lg"></div>
);

// Memoize static data
const experiences = [
  { 
    year: "Nov 2025 - Present", 
    title: "Penetration Tester (Red Team)", 
    company: "WiJungle", 
    logo: wijungleLogo,
    description: "Conducting comprehensive penetration testing and security assessments on web applications, networks, and infrastructure. Identifying vulnerabilities, exploiting security weaknesses, and providing detailed remediation recommendations to clients.",
    skills: ["Web App Testing", "Network Penetration Testing", "Vulnerability Analysis", "OWASP Top 10"]
  },
  { 
    year: "Jun 2025 - Present", 
    title: "Bug Bounty Hunter", 
    company: "Bugcrowd", 
    logo: bugcrowdLogo,
    description: "Actively participating in bug bounty programs, discovering and reporting security vulnerabilities in web applications and systems. Collaborating with organizations to identify and fix security issues responsibly.",
    skills: ["Vulnerability Discovery", "Security Research", "Web App Security", "Responsible Disclosure"]
  },
  { 
    year: "Jun 2025 - Present", 
    title: "Bug Bounty Hunter", 
    company: "HackerOne", 
    logo: hackeroneLogo,
    description: "Hunting for security vulnerabilities across diverse applications and platforms. Specialized in identifying critical security flaws in web applications, APIs, and infrastructure. Providing clear documentation for bug remediation.",
    skills: ["Security Testing", "Vulnerability Assessment", "API Security", "Bug Analysis"]
  }
] as const;

const Resume = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const education = [
    {
      institution: "Lovely Professional University",
      logo: lpuLogo,
      degree: "Bachelor of Technology",
      field: "Computer Science",
      period: "2022 - 2026",
      location: "Jalandhar, Punjab",
      gpa: "7.2/10.0",
      courses: ["Data Structures", "Algorithms", "Database Management", "Web Development"],
    },
    {
      institution: "St Teresa Sr. Sec  School",
      logo: teresaLogo,
      degree: "High School",
      field: "Science & Mathematics",
      period: "2020 - 2022",
      location: "Jaipur, Rajasthan",
      gpa: "8.2/10.0",
      courses: ["Physics", "Chemistry", "Mathematics"]
    }
  ];

  const skills = [
    { name: "Web Application Security Testing", value: 95, icon: Globe },
    { name: "Red Team Operations", value: 85, icon: Target },
    { name: "Network Security Testing", value: 80, icon: Network },
    { name: "Mobile Application Security Testing", value: 75, icon: Smartphone },
    { name: "API Security Testing", value: 90, icon: Code },
    { name: "Cloud Security Assessment", value: 70, icon: Database }
  ];

  const certifications = [
    { 
      name: "OSCP", 
      description: "Offensive Security Certified Professional", 
      year: "Coming Soon",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-500/10 to-red-600/5"
    },
    { 
      name: "eWPT", 
      description: "eLearnSecurity Web Application Penetration Tester", 
      year: "2025",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-500/10 to-blue-600/5"
    },
    { 
      name: "eJPT", 
      description: "eLearnSecurity Junior Penetration Tester", 
      year: "2025",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-500/10 to-green-600/5"
    }
  ];

  const projects = [
    {
      title: "RASP (Runtime Application Self-Protection)",
      description: "Created a runtime application self-protection tool to monitor and block suspicious activities in web applications.",
      technologies: ["Python", "Shell", "Docker", "API Integration", "Java"],
      github: "https://github.com/codiologies/",
      demo: "https://github.com/codiologies/",
      category: "Security Tool"
    },
    {
      title: "EPS (End Point Security)",
      description: "Developed the signatures to classify and control applications across various categories for enhanced endpoint security.",
      technologies: ["JSON", "Python", "Python Lib"],
      github: "https://github.com/codiologies/Personal-Portfolio",
      demo: "https://github.com/codiologies/",
      category: "Security Tool"
    },
  ];

  // Use useMemo for computed values
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  const staggerContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
        duration: 0.4
      }
    }
  }), []);

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -5
    }
  };

  // Added expertise areas
  const expertiseAreas = [
    {
      title: "Web Application Security",
      icon: Globe,
      description: "Specialized in identifying and exploiting web vulnerabilities including injection flaws, XSS, CSRF, and business logic issues.",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Mobile Application Security",
      icon: Smartphone,
      description: "Expert in Android and iOS security assessment, identifying issues in session management, data storage, and application logic.",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Network Penetration Testing",
      icon: Network,
      description: "Skilled in identifying network vulnerabilities, open ports, and insecure configurations that could lead to unauthorized access.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Red Team Operations",
      icon: Target,
      description: "Experienced in conducting comprehensive adversary simulations to test security controls and response capabilities.",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      title: "Cloud Security",
      icon: Database,
      description: "Proficient in assessing AWS, Azure, and GCP environments for misconfigurations and security vulnerabilities.",
      color: "from-indigo-500/20 to-blue-500/20"
    },
    {
      title: "API Security",
      icon: Code,
      description: "Specialized in testing REST and GraphQL APIs for authentication, authorization, and business logic flaws.",
      color: "from-teal-500/20 to-cyan-500/20"
    }
  ];

  // Added current focus areas
  const focusAreas = [
    {
      title: "Zero Trust Architecture",
      description: "Researching and implementing zero trust security models that verify every user and device before granting access to applications and data.",
      progress: 85,
      icon: Shield
    },
    {
      title: "AI/ML Security",
      description: "Exploring vulnerabilities in machine learning models and developing strategies to secure AI systems against adversarial attacks.",
      progress: 70,
      icon: BrainCircuit
    },
    {
      title: "Supply Chain Security",
      description: "Investigating methods to secure the software supply chain and protect against dependency-based vulnerabilities.",
      progress: 75,
      icon: Lock
    }
  ];

  const stats = [
    { icon: Award, label: "Years Experience", value: "2+" },
    { icon: Target, label: "Vulnerabilities Found", value: "50+" },
    { icon: Users, label: "Companies Served", value: "1+" },
    { icon: Globe, label: "Countries Worked", value: "1" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Clean Dark Background with Subtle Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>



      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
              <motion.div 
            className="text-center mb-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
              <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-tight"
              variants={fadeInUp}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Resume
              </span>
              </motion.h1>
              
              <motion.div
              className="relative max-w-4xl mx-auto mb-12"
              variants={fadeInUp}
            >
              <LiquidGlass variant="card" intensity="medium" rounded="2xl" className="p-8">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  2+ years of hands-on ethical hacking and penetration testing expertise
                </p>
                
                {/* Animated subtitle badges */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-4 mt-6"
                  variants={staggerContainer}
                >
                  {['Security Consultant', 'Red Teamer', 'Bug Bounty Hunter'].map((badge, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <LiquidGlass variant="button" intensity="medium" rounded="full" className="px-4 py-2">
                        <span className="text-sm font-medium text-blue-300">{badge}</span>
                      </LiquidGlass>
                    </motion.div>
                  ))}
                </motion.div>
              </LiquidGlass>
            </motion.div>
              
            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                                      <LiquidGlass variant="subtle" intensity="medium" rounded="xl" className="p-6 text-center" morphOnHover={true}>
                      <div className="h-12 w-12 rounded-lg bg-zinc-800/70 flex items-center justify-center mb-5 mx-auto relative">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5"></div>
                        <stat.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-zinc-500">{stat.label}</div>
                    </LiquidGlass>
                </motion.div>
              ))}
            </motion.div>

            {/* Download Resume Button */}
            <motion.div className="mt-12" variants={fadeInUp}>
                <Link 
                  href="/assets/resume/sajal_gupta.pdf" 
                download
                className="group relative inline-block"
                >
                <LiquidGlass variant="button" intensity="high" rounded="lg" className="px-8 py-4">
                  <div className="flex items-center gap-3 text-white font-medium group-hover:text-zinc-200 transition-colors">
                    <FaDownload className="w-5 h-5" />
                    <span>Download PDF Resume</span>
                  </div>
                </LiquidGlass>
              </Link>
              </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section - Optimized for faster loading */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  duration: 0.3
                }
              }
            }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-20 text-center"
              variants={fadeInUp}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Professional Experience
              </span>
            </motion.h2>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <LiquidGlass variant="clean" intensity="medium" rounded="xl" className="p-6 md:p-8 group-hover:scale-[1.01] transition-transform duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="md:w-44 flex-shrink-0">
                        <div className="text-sm font-medium text-zinc-300 mb-2">{exp.year}</div>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-md bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center overflow-hidden">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              className="object-contain"
                              width={32}
                              height={32}
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                            <div className="text-zinc-200 font-medium">{exp.company}</div>
                          </div>
                        </div>
                        <p className="text-zinc-300 leading-relaxed mb-4 text-sm">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex}
                              className="px-3 py-1 text-xs font-medium bg-zinc-900/50 border border-zinc-700/30 rounded-full text-zinc-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Education
            </motion.h2>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <LiquidGlass variant="clean" intensity="medium" rounded="xl" className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="md:w-44 flex-shrink-0">
                        <div className="text-sm font-medium text-zinc-300 mb-2">{edu.period}</div>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-md bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center overflow-hidden">
                            <Image
                              src={edu.logo}
                              alt={`${edu.institution} logo`}
                              className="object-contain"
                              width={32}
                              height={32}
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                            <div className="text-zinc-200 font-medium">{edu.institution}</div>
                          </div>
                        </div>
                        <div className="text-sm text-zinc-400 mb-4">{edu.field} • GPA: {edu.gpa}</div>
                        <p className="text-zinc-300 text-sm mb-4">{edu.location}</p>
                        
                        {edu.courses && edu.courses.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-zinc-200 mb-2">Key Courses:</p>
                            <div className="flex flex-wrap gap-2">
                              {edu.courses.map((course: string, courseIndex: number) => (
                                <span 
                                  key={courseIndex}
                                  className="px-3 py-1 text-xs font-medium bg-zinc-900/50 border border-zinc-700/30 rounded-full text-zinc-200"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Core Skills
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <SkillProgress 
                    name={skill.name} 
                    value={skill.value} 
                    icon={skill.icon}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Areas - Compact */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Expertise Areas
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
          >
                  <motion.div variants={cardHover}>
                    <LiquidGlass variant="clean" intensity="medium" rounded="xl" className="p-6 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <area.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-white">{area.title}</h3>
                      <p className="text-zinc-300 leading-relaxed text-sm">{area.description}</p>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications - Compact Vision OS style */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Certifications
            </motion.h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="group"
                >
                  <LiquidGlass variant="card" intensity="medium" rounded="xl" className="p-4 text-center w-56 h-44 flex flex-col justify-center relative overflow-hidden">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
                    
                    {/* Vision OS style circular icon */}
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <FaCertificate className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                      <p className="text-zinc-300 text-xs mb-2 leading-tight px-1">{cert.description}</p>
                      <div className="inline-block px-2 py-1 bg-white/10 rounded-full">
                        <span className="text-zinc-300 text-xs font-medium">{cert.year}</span>
                      </div>
                    </div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects - Compact */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Featured Projects
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
              <motion.div
                key={index}
                  variants={fadeInUp}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div variants={cardHover}>
                    <LiquidGlass variant="clean" intensity="medium" rounded="xl" className="p-6 h-full">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium bg-zinc-900/50 border border-zinc-700/30 rounded-full text-zinc-200">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-zinc-300 leading-relaxed mb-4 text-sm">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 text-xs font-medium bg-blue-500/15 border border-blue-500/30 rounded-full text-blue-200"
                >
                            {tech}
                          </span>
            ))}
          </div>
                      <div className="flex gap-4">
                        <Link 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
                          <FaGithub className="w-4 h-4" />
                          <span className="text-sm">Code</span>
                        </Link>
                        <Link 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Demo</span>
                        </Link>
                      </div>
                    </LiquidGlass>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA - Compact */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <LiquidGlass variant="clean" intensity="high" rounded="2xl" className="p-6 md:p-8 text-center">
              <h3 className="text-xl font-bold mb-6 text-white">Ready to Work Together?</h3>
              <p className="text-zinc-400 mb-6 max-w-2xl mx-auto text-sm">
                I'm always interested in discussing new opportunities, consulting projects, or collaborations in cybersecurity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
                  className="group relative"
                >
                  <LiquidGlass variant="button" intensity="high" rounded="lg" className="px-6 py-3">
                    <span className="text-white font-medium group-hover:text-zinc-200 transition-colors">
                      Get In Touch
                    </span>
                  </LiquidGlass>
                </Link>
                <Link 
                  href="/assets/resume/sajal_gupta.pdf" 
                  download
                  className="group relative"
                >
                  <LiquidGlass variant="card" intensity="medium" rounded="lg" className="px-6 py-3 border border-zinc-800/50">
                    <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors">
                      <FaDownload className="w-4 h-4" />
                      <span>Download Resume</span>
                    </div>
                  </LiquidGlass>
            </Link>
              </div>
            </LiquidGlass>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resume;
