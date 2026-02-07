"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Check, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';
import Button from '@/components/ui/button';


const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showPlane, setShowPlane] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setShowPlane(true);
    
    try {
      // Simulate sending delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
      const body = encodeURIComponent(`Hello,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`);
      
      // Open default email client
      window.location.href = `mailto:sajal.gupta2812@gmail.com?subject=${subject}&body=${body}`;
      
      setIsSent(true);
      setShowPlane(false);
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setShowPlane(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="w-full flex justify-center pt-16 pb-12">
          <div className="max-w-6xl w-full px-4 sm:px-6">
            <div className="text-center mb-8 flex flex-col justify-center items-center">
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="relative mb-8" 
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50"
                />
                <div className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 backdrop-blur-sm rounded-full border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <Mail className="w-10 h-10 text-purple-400" />
                </div>
              </motion.div>
              
              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              >
                Get in Touch
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
              >
                Have a question, project idea, or want to collaborate? I'd love to hear from you. Let's create something amazing together.
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="flex-1 flex justify-center px-4 sm:px-6 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-2xl"
          >
            <AnimatePresence mode="wait">
              {showPlane && (
                <motion.div
                  initial={{ x: "-50%", y: 0 }}
                  animate={{ x: "200%", y: "-200%" }}
                  exit={{ x: "200%", y: "-200%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="fixed top-1/2 left-1/2 z-50"
                >
                  <motion.div animate={{ rotate: 20 }}>
                    <Send className="h-16 w-16 text-purple-400 drop-shadow-lg" />
                  </motion.div>
                </motion.div>
              )}

              {!isSent && !showPlane ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl" />
                  
                  <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/40">
                    {/* Gradient top border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
                    
                    {/* Header */}
                    <div className="px-6 sm:px-8 py-6 border-b border-zinc-700/30 bg-gradient-to-r from-zinc-900/50 to-zinc-800/30">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                            <Mail className="w-5 h-5 text-purple-400" />
                          </div>
                          Send me a Message
                        </h2>
                        <div className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Secure
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 bg-red-900/20 border border-red-800/40 rounded-lg flex items-start gap-3"
                        >
                          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-red-400 text-sm">{error}</p>
                        </motion.div>
                      )}
                      
                      <div className="space-y-5">
                        {/* Name Field */}
                        <motion.div 
                          className="space-y-2"
                          onHoverStart={() => setFocusedField('name')}
                          onHoverEnd={() => setFocusedField(null)}
                        >
                          <label className="block text-sm font-semibold text-zinc-300">Your Name</label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-focus-within:from-purple-600/10 group-focus-within:to-blue-600/10 rounded-lg transition-all duration-300" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="relative w-full bg-zinc-800/40 border border-zinc-700/50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-zinc-500"
                              placeholder="John Doe"
                            />
                          </div>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div 
                          className="space-y-2"
                          onHoverStart={() => setFocusedField('email')}
                          onHoverEnd={() => setFocusedField(null)}
                        >
                          <label className="block text-sm font-semibold text-zinc-300">Your Email</label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-focus-within:from-purple-600/10 group-focus-within:to-blue-600/10 rounded-lg transition-all duration-300" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="relative w-full bg-zinc-800/40 border border-zinc-700/50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-zinc-500"
                              placeholder="john@example.com"
                            />
                          </div>
                        </motion.div>

                        {/* Subject Field */}
                        <motion.div 
                          className="space-y-2"
                          onHoverStart={() => setFocusedField('subject')}
                          onHoverEnd={() => setFocusedField(null)}
                        >
                          <label className="block text-sm font-semibold text-zinc-300">Subject</label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-focus-within:from-purple-600/10 group-focus-within:to-blue-600/10 rounded-lg transition-all duration-300" />
                            <input
                              type="text"
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="relative w-full bg-zinc-800/40 border border-zinc-700/50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-zinc-500"
                              placeholder="What's this about?"
                            />
                          </div>
                        </motion.div>

                        {/* Message Field */}
                        <motion.div 
                          className="space-y-2"
                          onHoverStart={() => setFocusedField('message')}
                          onHoverEnd={() => setFocusedField(null)}
                        >
                          <label className="block text-sm font-semibold text-zinc-300">Message</label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-focus-within:from-purple-600/10 group-focus-within:to-blue-600/10 rounded-lg transition-all duration-300" />
                            <textarea
                              required
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              rows={6}
                              className="relative w-full bg-zinc-800/40 border border-zinc-700/50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-zinc-500 resize-none"
                              placeholder="Tell me about your project, idea, or question..."
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* Submit Button */}
                      <div className="mt-8">
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isSending}
                          className="group w-full px-6 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 hover:from-purple-500 hover:to-blue-500"
                        >
                          {isSending ? (
                            <>
                              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                <Send className="w-5 h-5" />
                              </motion.div>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </motion.button>
                      </div>
                      
                      <p className="mt-4 text-center text-xs text-zinc-500">
                        Your information is secure and will never be shared with third parties.
                      </p>
                    </form>
                  </div>
                </motion.div>
              ) : isSent ? (
                <motion.div
                  initial={{ scale: 0, y: -50, opacity: 0 }}
                  animate={{ 
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-2xl" />
                  <div className="relative bg-zinc-900/80 backdrop-blur-xl p-8 sm:p-12 rounded-2xl shadow-2xl border border-zinc-700/40 flex flex-col items-center justify-center text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.3, 
                        type: "spring",
                        stiffness: 260,
                        damping: 20 
                      }}
                      className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/30 shadow-lg shadow-green-500/20"
                    >
                      <Check className="h-12 w-12 text-green-400" />
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-3xl font-bold text-white mb-3"
                    >
                      Message Sent! 🎉
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-zinc-400 mb-8 max-w-md"
                    >
                      Thank you for reaching out! I'll get back to you as soon as possible. Looking forward to connecting with you!
                    </motion.p>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsSent(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20"
                    >
                      Send Another Message
                    </motion.button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;
