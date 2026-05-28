"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Globe, Info, Bug, MousePointer, CheckCircle, XCircle, ShieldAlert } from "lucide-react";
import LiquidGlass from "@/components/ui/liquid-glass";


type Verdict = "protected" | "vulnerable" | "inconclusive";

type ClickjackingScanResult = {
  url: string;
  status: number;
  xFrameOptions: string | null;
  frameAncestors: string[] | null;
  verdict: Verdict;
  error?: string;
};

const ClickjackingClientWrapper = () => {
  const [url, setUrl] = useState("");
  const [testUrl, setTestUrl] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [testComplete, setTestComplete] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [scanResult, setScanResult] = useState<ClickjackingScanResult | null>(null);
  const [iframeStatus, setIframeStatus] = useState<"loaded" | "error" | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const formatUrl = (input: string) => {
    if (!input.startsWith('http://') && !input.startsWith('https://')) {
      return `https://${input}`;
    }
    return input;
  };

  const testClickjacking = async () => {
    const formattedUrl = formatUrl(url.trim());
    setIsTesting(true);
    setTestComplete(false);
    setVerdict(null);
    setScanResult(null);
    setIframeStatus(null);
    setHistory((prev) => [...prev, `➜ Testing Clickjacking on ${formattedUrl}...`]);
    setTestUrl(formattedUrl);
    setUrl("");

    setHistory((prev) => [...prev, "➜ Checking X-Frame-Options header..."]);

    try {
      const response = await fetch(
        `/api/clickjacking?url=${encodeURIComponent(formattedUrl)}`
      );
      const data = (await response.json()) as ClickjackingScanResult;

      if (!response.ok || data.error) {
        setHistory((prev) => [
          ...prev,
          `❌ ERROR: ${data.error || "Header check failed."}`
        ]);
        setVerdict("inconclusive");
        setIsTesting(false);
        setTestComplete(true);
        return;
      }

      setHistory((prev) => [
        ...prev,
        data.xFrameOptions
          ? `➜ X-Frame-Options: ${data.xFrameOptions}`
          : "➜ X-Frame-Options: not set"
      ]);

      setHistory((prev) => [
        ...prev,
        "➜ Checking Content-Security-Policy frame-ancestors..."
      ]);

      setHistory((prev) => [
        ...prev,
        data.frameAncestors && data.frameAncestors.length > 0
          ? `➜ CSP frame-ancestors: ${data.frameAncestors.join(" ")}`
          : "➜ CSP frame-ancestors: not set"
      ]);

      setHistory((prev) => [...prev, "➜ Testing iframe load capability..."]);

      setScanResult(data);

      if (data.verdict === "protected") {
        setHistory((prev) => [
          ...prev,
          "✅ Result: Target is NOT vulnerable to clickjacking."
        ]);
      } else if (data.verdict === "vulnerable") {
        setHistory((prev) => [
          ...prev,
          "⚠️ Result: Target appears VULNERABLE (no frame protections found)."
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          "⚠️ Result: Inconclusive. Could not verify frame protections."
        ]);
      }

      setVerdict(data.verdict);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        `❌ ERROR: ${error instanceof Error ? error.message : "Request failed."}`
      ]);
      setVerdict("inconclusive");
    } finally {
      setIsTesting(false);
      setTestComplete(true);
    }
  };

  const handleIframeLoad = () => {
    if (iframeStatus) return;
    setIframeStatus("loaded");
    setHistory((prev) => [
      ...prev,
      "➜ Iframe load event fired (browser may still block frame access)."
    ]);
  };

  const handleIframeError = () => {
    if (iframeStatus) return;
    setIframeStatus("error");
    setHistory((prev) => [
      ...prev,
      "➜ Iframe could not be loaded (browser blocked or network error)."
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTesting && url) {
      testClickjacking();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      {/* Clean Dark Background with Subtle Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      
        
      <div className="bg-gradient-to-b from-black to-zinc-900 w-full flex justify-center pb-8 relative z-10">
          <div className="relative z-10 max-w-6xl w-full px-6">
          <div className="text-center mb-16 relative pt-20 flex flex-col justify-center items-center">
              <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="relative mb-6" 
            >
              <LiquidGlass
                variant="prominent"
                intensity="high"
                rounded="full"
                className="w-20 h-20 flex items-center justify-center shadow-lg"
              >
                <Bug className="w-8 h-8 text-red-400" />
              </LiquidGlass>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Clickjacking Tester
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl text-zinc-400 max-w-2xl"
            >
              Test your web applications for Clickjacking vulnerabilities with our interactive tool
            </motion.p>
          </div>
        </div>
                </div>
                
      <div className="relative z-10 max-w-5xl w-full px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - URL Input Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
                  >
                    {/* URL Input Card */}
            <LiquidGlass
              variant="card"
              intensity="medium"
              rounded="xl"
              className="p-6 border-red-500/20"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-300">
                <Globe className="w-5 h-5" />
                Target URL
              </h2>
                      
              <div className="space-y-4">
                <div className="flex items-center bg-zinc-950/50 rounded-lg border border-zinc-800/50 overflow-hidden">
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter website URL to test (e.g., example.com)"
                    className="flex-1 bg-transparent border-none outline-none text-red-400 placeholder-zinc-600 p-3 font-mono text-sm"
                          />
                        </div>
                <p className="text-xs text-zinc-500">Example: facebook.com, twitter.com, etc.</p>
                      </div>
            </LiquidGlass>
                    
                    {/* Clickjacking Info Card */}
            <LiquidGlass
              variant="card"
              intensity="medium"
              rounded="xl"
              className="p-6 border-orange-500/20"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-300">
                <Info className="w-5 h-5" />
                About Clickjacking
              </h2>
                      
              <div className="space-y-3">
                <p className="text-zinc-400 text-sm">
                          Clickjacking (UI redressing) is an attack where users are tricked into clicking on disguised elements. 
                          This tool tests if a website can be loaded in an iframe, which is the first step towards vulnerability.
                        </p>
                        <p className="text-zinc-500 text-xs">
                          Secure websites use X-Frame-Options or Content-Security-Policy headers to prevent being loaded in iframes.
                        </p>
                      </div>
            </LiquidGlass>
                    
                    {/* Test Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
                      onClick={testClickjacking}
                      disabled={isTesting || !url}
                      className={`${
                        isTesting || !url 
                          ? "bg-zinc-700/80 cursor-not-allowed" 
                  : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500"
              } text-white rounded-xl px-6 py-4 transition-all duration-300 ease-in-out w-full flex items-center justify-center gap-2 shadow-lg font-medium backdrop-blur-sm border border-red-500/20`}
                    >
                      {isTesting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                          <span>Testing...</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-5 h-5" />
                          <span>Start Clickjacking Test</span>
                        </>
                      )}
            </motion.button>
                  </motion.div>
                  
                  {/* Right Column - Terminal Console */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
                  >
                    {/* Terminal Card */}
            <LiquidGlass
              variant="card"
              intensity="medium"
              rounded="xl"
              className="p-6 h-full border-purple-500/20"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-300">
                <Terminal className="w-5 h-5" />
                Test Log
              </h2>
                      
                      {/* Terminal Body */}
                      <div 
                        ref={terminalRef}
                className="font-mono text-sm bg-zinc-950/50 rounded-lg p-4 h-[300px] overflow-y-auto border border-zinc-800/50"
                      >
                        {history.length > 0 ? (
                          history.map((log, idx) => {
                            const isSuccess = log.includes("✅");
                            const isError = log.includes("❌") || log.includes("VULNERABLE");
                            const textClass = isSuccess
                              ? "text-green-400"
                              : isError
                                ? "text-red-400"
                                : "text-orange-400";
                            const glowClass = isSuccess
                              ? "drop-shadow-[0_0_2px_rgba(74,222,128,0.35)]"
                              : isError
                                ? "drop-shadow-[0_0_2px_rgba(248,113,113,0.35)]"
                                : "drop-shadow-[0_0_2px_rgba(249,115,22,0.3)]";

                            return (
                              <div key={idx} className={`mb-2 ${textClass} ${glowClass}`}>
                                {log}
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-zinc-500 italic">Test logs will appear here...</div>
                        )}
                        {!isTesting && !testComplete && history.length > 0 && (
                          <div className="flex items-center text-orange-400">
                            <span className="mr-2">➜</span>
                            <span className="flex-1 text-zinc-500">Waiting for command...</span>
                          </div>
                        )}
                      </div>
            </LiquidGlass>
                  </motion.div>
        </div>
      </div>
      
      {/* Results Section with Clean Dark Background */}
      <div className="w-full bg-black min-h-[50vh] relative overflow-hidden">
        {/* Clean Dark Background with Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
          {/* Results Content */}
          {testUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white inline-block">
                  Test Results
                </h2>
                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="flex flex-col gap-6">
                {/* Status Banner */}
                    {verdict !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-full py-4 px-6 rounded-xl flex items-center gap-4 ${
                      verdict === "vulnerable" 
                        ? "bg-red-500/20 border border-red-500/30" 
                        : verdict === "protected"
                          ? "bg-green-500/20 border border-green-500/30"
                          : "bg-yellow-500/20 border border-yellow-500/30"
                    }`}
                  >
                    {verdict === "vulnerable" ? (
                      <>
                        <XCircle className="text-red-400 w-8 h-8 flex-shrink-0" />
                        <div>
                          <h3 className="text-red-300 font-medium text-lg">Vulnerable to Clickjacking</h3>
                          <p className="text-red-200/80 text-sm">This website can be loaded in an iframe and is potentially vulnerable to clickjacking attacks.</p>
                        </div>
                      </>
                    ) : verdict === "protected" ? (
                      <>
                        <CheckCircle className="text-green-400 w-8 h-8 flex-shrink-0" />
                        <div>
                          <h3 className="text-green-300 font-medium text-lg">Protected Against Clickjacking</h3>
                          <p className="text-green-200/80 text-sm">This website has frame protections in place based on response headers.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Info className="text-yellow-400 w-8 h-8 flex-shrink-0" />
                        <div>
                          <h3 className="text-yellow-300 font-medium text-lg">Result Inconclusive</h3>
                          <p className="text-yellow-200/80 text-sm">We could not verify frame protections. The target may be blocking header checks.</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {scanResult && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-zinc-800/40 bg-black/40 p-4">
                      <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">X-Frame-Options</p>
                      <p className="text-sm text-zinc-200 font-mono break-words">
                        {scanResult.xFrameOptions || "Not set"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-zinc-800/40 bg-black/40 p-4">
                      <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">CSP frame-ancestors</p>
                      <p className="text-sm text-zinc-200 font-mono break-words">
                        {scanResult.frameAncestors && scanResult.frameAncestors.length > 0
                          ? scanResult.frameAncestors.join(" ")
                          : "Not set"}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Iframe Test Frame */}
                <LiquidGlass
                  variant="clean"
                  intensity="medium"
                  rounded="xl"
                  className="p-5 border-red-500/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-lg text-white flex items-center gap-2">
                      <MousePointer className="w-5 h-5 text-red-400" />
                      Clickjacking Test Frame
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                      Iframe Loading Test
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-sm">
                    The primary result is based on response headers. The iframe below is a best-effort visual check and
                    may still show "refused to connect" even when protections are enabled.
                  </p>
                  
                  <div className="bg-black/50 border border-red-500/10 rounded-lg overflow-hidden h-[500px]">
                    <iframe
                      src={testUrl}
                      title="Clickjacking Test"
                      className="w-full h-full"
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                    ></iframe>
                  </div>
                </LiquidGlass>
                
                {/* Mitigation Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <LiquidGlass
                    variant="clean"
                    intensity="medium"
                    rounded="xl"
                    className="p-5 border-orange-500/10"
                  >
                    <h3 className="font-medium text-lg text-white flex items-center gap-2 mb-3">
                      <ShieldAlert className="w-5 h-5 text-orange-400" />
                      How to Protect Against Clickjacking
                    </h3>
                    
                    <div className="space-y-3">
                      <p className="text-gray-300 text-sm">
                        If your website is vulnerable, you can implement these protections:
                      </p>
                      
                      <div className="bg-black/30 p-3 rounded-lg border border-orange-500/10">
                        <p className="text-orange-300 text-sm font-medium mb-1">X-Frame-Options Header</p>
                        <p className="text-xs font-mono text-gray-300">X-Frame-Options: DENY</p>
                        <p className="text-xs font-mono text-gray-300 mt-1">X-Frame-Options: SAMEORIGIN</p>
                      </div>
                      
                      <div className="bg-black/30 p-3 rounded-lg border border-orange-500/10">
                        <p className="text-orange-300 text-sm font-medium mb-1">Content Security Policy</p>
                        <p className="text-xs font-mono text-gray-300 break-words">Content-Security-Policy: frame-ancestors 'none'</p>
                        <p className="text-xs font-mono text-gray-300 mt-1 break-words">Content-Security-Policy: frame-ancestors 'self'</p>
                      </div>
                    </div>
                  </LiquidGlass>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center min-h-[30vh] py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-300"
              >
                <MousePointer className="w-16 h-16 mb-4 mx-auto opacity-40" />
                <h3 className="text-xl font-medium mb-2 text-white">No Tests Run Yet</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Enter a URL and click "Start Clickjacking Test" to check if a website is vulnerable to UI redressing attacks.
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClickjackingClientWrapper;