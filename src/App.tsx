/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { HeroSection } from './components/HeroSection';
import { CursorFollower } from './components/CursorFollower';

export default function App() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white select-none overflow-hidden">
      {/* Custom Stylized Circular Cursor Follower */}
      <CursorFollower />

      {/* Background Video (Horizontal Mouse-Scrub Controlled) */}
      <BackgroundVideo />

      {/* Hero Section (Bold VILAS K R + Contact Pills) */}
      <HeroSection />
    </main>
  );
}
