import React, { useState } from 'react';

interface InteractiveModalProps {
  activeModal: string | null;
  onClose: () => void;
}

export const InteractiveModal: React.FC<InteractiveModalProps> = ({
  activeModal,
  onClose,
}) => {
  const [pitchSubmitted, setPitchSubmitted] = useState(false);
  const [helloSubmitted, setHelloSubmitted] = useState(false);
  const [roleApplied, setRoleApplied] = useState<string | null>(null);

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0e0e10] border border-white/15 rounded-2xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
        >
          ✕
        </button>

        {activeModal === 'Pitch us an idea' && (
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">
              Mainframe Labs & Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Pitch us an idea
            </h2>
            <p className="text-sm sm:text-base text-white/70 mb-6 leading-relaxed">
              We collaborate with visionary founders, artists, and brands to engineer new digital realities and interfaces.
            </p>
            {pitchSubmitted ? (
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-center">
                <p className="text-base font-medium mb-1">Brief dispatched to A.R.I.A.</p>
                <p className="text-xs text-white/60">Our team will reach out within 24 hours.</p>
                <button
                  onClick={() => setPitchSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-white text-black text-xs rounded-full font-medium hover:bg-white/90"
                >
                  Send another brief
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPitchSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    Your Name / Collective
                  </label>
                  <input
                    required
                    placeholder="e.g. Studio Mono / Elena Rostova"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    What are we building?
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly describe the concept, timeline, or ambitions..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30 resize-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-white text-black py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    Submit Pitch
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 border border-white/20 rounded-full text-sm hover:border-white/50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeModal === 'Come work here' && (
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">
              Careers & Fellowships
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Open Positions
            </h2>
            <p className="text-sm text-white/70 mb-5 leading-relaxed">
              We look for individuals with high agency, refined aesthetic discipline, and deep technical obsession.
            </p>
            <div className="space-y-3 mb-6">
              {[
                { title: 'Senior Creative Technologist', loc: 'Remote / Tokyo / NYC', type: 'Full-time' },
                { title: 'Lead Interface Designer', loc: 'Remote / Berlin', type: 'Full-time' },
                { title: 'Generative Shader & 3D Artist', loc: 'Remote / London', type: 'Contract' },
                { title: 'Systems & Audio Architect', loc: 'Remote / San Francisco', type: 'Full-time' },
              ].map((role) => (
                <div
                  key={role.title}
                  className="p-3.5 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 flex items-center justify-between transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-medium">{role.title}</h3>
                    <p className="text-xs text-white/50">{role.loc} • {role.type}</p>
                  </div>
                  <button
                    onClick={() => setRoleApplied(role.title)}
                    className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium hover:opacity-80 transition-opacity cursor-pointer shrink-0 ml-3"
                  >
                    {roleApplied === role.title ? 'Applied ✓' : 'Apply'}
                  </button>
                </div>
              ))}
            </div>
            {roleApplied && (
              <p className="text-xs text-emerald-400 text-center mb-4">
                Thank you! Application interest for {roleApplied} logged.
              </p>
            )}
            <div className="text-center pt-2">
              <a
                href="mailto:careers@mainframe.co"
                className="text-xs text-white/60 underline hover:text-white"
              >
                Or email portfolios directly to careers@mainframe.co
              </a>
            </div>
          </div>
        )}

        {activeModal === 'Send a brief hello' && (
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">
              Direct Frequency
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Send a brief hello
            </h2>
            <p className="text-sm text-white/70 mb-5">
              Say hi, share a link that inspired you, or start an informal chat.
            </p>
            {helloSubmitted ? (
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-center">
                <p className="text-base font-medium mb-1">Message received.</p>
                <p className="text-xs text-white/60">Glad you took the time to write.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setHelloSubmitted(true);
                }}
                className="space-y-4"
              >
                <input
                  required
                  placeholder="Your email or handle"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Say whatever is on your mind..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30 resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-black py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Send Note
                </button>
              </form>
            )}
          </div>
        )}

        {activeModal === 'See how we operate' && (
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">
              Philosophy & Method
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              How We Operate
            </h2>
            <div className="space-y-4 text-sm text-white/80 leading-relaxed">
              <p>
                <strong className="text-white block font-medium">01. Small Teams, Dense Gravity</strong>
                We reject bureaucratic bloat. Every project is steered by 2 to 4 senior polymaths who write code, sculpt typography, and direct motion simultaneously.
              </p>
              <p>
                <strong className="text-white block font-medium">02. Responsive & Spatial Intelligence</strong>
                Through A.R.I.A and real-time interaction systems, we build software and brand worlds that feel alive to human input.
              </p>
              <p>
                <strong className="text-white block font-medium">03. Unforgiving Standards</strong>
                No template solutions. Every visual frame and micro-interaction is intentionally engineered to withstand the test of discerning taste.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
              <span>Mainframe Standard OS v4.2</span>
              <button
                onClick={onClose}
                className="text-white underline hover:opacity-70 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {(activeModal === 'Labs' || activeModal === 'Studio' || activeModal === 'Openings' || activeModal === 'Shop' || activeModal === 'Get in touch') && (
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">
              Mainframe System
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              {activeModal}
            </h2>
            {activeModal === 'Labs' && (
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Our experimental R&D wing investigating real-time WebGL engines, spatial audio synthesis, and agentic interface controllers.
              </p>
            )}
            {activeModal === 'Studio' && (
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Full-service creative production spanning digital brand identity, interactive product design, and cinematic web experiences.
              </p>
            )}
            {activeModal === 'Openings' && (
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Currently taking selected client commissions for Q3/Q4. Independent artist-in-residence fellowships open year-round.
              </p>
            )}
            {activeModal === 'Shop' && (
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Limited-run hardware artifacts, custom typography specimen books, and archival apparel releases. Drop notifications sent to subscribers.
              </p>
            )}
            {activeModal === 'Get in touch' && (
              <div className="space-y-4">
                <p className="text-sm text-white/80 leading-relaxed">
                  For inquiries, partnerships, or press:
                </p>
                <a
                  href="mailto:hello@mainframe.co"
                  className="inline-block text-lg font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  hello@mainframe.co
                </a>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white text-black text-xs rounded-full font-medium hover:bg-white/90"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
