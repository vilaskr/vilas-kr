import React, { useState } from 'react';

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const EMAIL = 'vilaskr762@gmail.com';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/vilas-k-r-a3b193339/?isSelfProfile=true';

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = EMAIL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section className="relative z-[1] w-full h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-4xl text-left relative z-10">
        {/* Bold text VILAS K R in main area towards left */}
        <h1
          style={{ fontFamily: 'var(--font-heading)' }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wide text-white uppercase select-none leading-[0.95] drop-shadow-sm"
        >
          VILAS K R
        </h1>

        {/* Reach me pill buttons */}
        <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4 relative">
          {/* Email Pill Button */}
          <button
            type="button"
            data-magnetic="true"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-normal transition-all duration-200 border border-white bg-white text-black hover:bg-black hover:text-white hover:border-white cursor-pointer select-none group will-change-transform"
            title="Click to copy vilaskr762@gmail.com"
          >
            {/* Mail / Copy SVG icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 transition-colors"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="font-mono">{EMAIL}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-70 ml-0.5">
              {copied ? 'Copied ✓' : 'Copy'}
            </span>
          </button>

          {/* Direct Mailto shortcut button */}
          <a
            href={`mailto:${EMAIL}`}
            data-magnetic="true"
            className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer will-change-transform"
            title="Open email client"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" x2="11" y1="2" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </a>

          {/* LinkedIn Pill Button */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic="true"
            className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-normal transition-all duration-200 border border-white/60 bg-black/40 backdrop-blur-sm text-white hover:bg-white hover:text-black hover:border-white cursor-pointer select-none group will-change-transform"
          >
            {/* LinkedIn SVG icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span>LinkedIn</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>

          {/* Floating copied feedback notification */}
          {copied && (
            <div className="absolute -top-10 left-0 bg-white text-black text-xs px-3 py-1 rounded-full shadow-lg font-medium animate-in fade-in slide-in-from-bottom-2 duration-150 pointer-events-none">
              Email copied to clipboard ✓
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
