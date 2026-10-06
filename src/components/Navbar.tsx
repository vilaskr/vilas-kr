import React, { useState } from 'react';

interface NavbarProps {
  onSelectNav?: (item: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectNav }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['Labs', 'Studio', 'Openings', 'Shop'];

  const handleLinkClick = (item: string) => {
    setMobileMenuOpen(false);
    if (onSelectNav) {
      onSelectNav(item);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex row justify-between items-center">
        {/* Logo (left) */}
        <div className="flex row gap-3 items-center select-none">
          <span
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-[21px] sm:text-[26px] tracking-tight text-white cursor-pointer"
            onClick={() => handleLinkClick('Home')}
          >
            Mainframe®
          </span>
          <span className="text-[25px] sm:text-[30px] text-white select-none tracking-[-0.02em] leading-none">
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <div className="hidden md:flex row text-[23px] text-white items-center">
          {navItems.map((item, index) => (
            <React.Fragment key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item);
                }}
                className="hover:opacity-60 transition-opacity cursor-pointer"
              >
                {item}
              </a>
              {index < navItems.length - 1 && (
                <span className="select-none">,&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('Get in touch');
            }}
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] cursor-pointer p-1.5 focus:outline-none z-20"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 z-[9] md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(item);
            }}
            className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer"
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('Get in touch');
          }}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer pt-2"
        >
          Get in touch
        </a>
      </div>
    </>
  );
};
