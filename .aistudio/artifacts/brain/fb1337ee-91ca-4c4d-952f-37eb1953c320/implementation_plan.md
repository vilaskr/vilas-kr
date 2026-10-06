# Minimal Hero Screen Transformation for Vilas K R

Transform the landing page into an ultra-clean, minimalist personal hero canvas featuring bold left-aligned display typography for **VILAS K R**, paired with refined contact pill buttons for Email and LinkedIn, while preserving the cinematic mouse-scrubbed background video and custom interactive cursor follower.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during clarification and will govern the transformation:

- **Confirmed Decision 1 (Top Navigation)**: Remove the top navbar entirely for an uncluttered, cinematic presentation.
- **Confirmed Decision 2 (Contact Controls)**: Present contact options as two dedicated pill buttons directly below the bold name—one for direct email interaction (`vilaskr762@gmail.com` with quick copy and mailto action) and one for LinkedIn (`https://www.linkedin.com/in/vilas-k-r-a3b193339/?isSelfProfile=true`).
- **Confirmed Decision 3 (Typography & Messaging)**: Remove all prior agency copy (blurred A.R.I.A label, typewriter paragraphs, and agency action tags). Introduce prominent, bold display typography reading **VILAS K R** positioned in the left main area.
- **Confirmed Decision 4 (Motion & Video Integration)**: Keep the interactive mouse-scrubbed background video engine and the custom circular cursor follower that expands when hovering over interactive pills.

---

## 1. Overview & Core Concept

- **What It Does**: Presents a bold, atmospheric personal landing experience. The user lands directly on a full-screen cinematic video canvas controlled by mouse movement, centered around a strong typographic signature and direct connection channels.
- **Target Audience**: Collaborators, recruiters, clients, and visitors seeking direct contact with Vilas K R.
- **Key Value**: Instant personal brand impact with zero visual noise, smooth tactile interaction, and high aesthetic discipline.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Initial Entry**: The screen loads the full-screen atmospheric video and reveals the bold text **VILAS K R** aligned to the left, followed by the contact pills.
2. **Interactive Scrubbing**: Moving the cursor horizontally scrubs through the background video smoothly in real time.
3. **Cursor Dynamics**: The custom circular follower tracks mouse motion, expanding and frosted-glass blurring when hovering over the Email and LinkedIn pill buttons.
4. **Direct Outreach**:
   - **Email Pill**: Displays `vilaskr762@gmail.com` with an email/copy icon. Clicking copies the email address to clipboard with instant tactile feedback ("Copied ✓") and provides an option to open the default mail client.
   - **LinkedIn Pill**: Displays `LinkedIn ↗` with external link styling, opening Vilas's profile in a new tab securely (`target="_blank" rel="noopener noreferrer"`).

### Visual Identity & Theme
- **Aesthetic Direction**: Minimalist editorial & cinematic luxury portfolio.
- **Typography & Scale**:
  - Main display text: `VILAS K R` in bold, uppercase display typography (`text-5xl sm:text-7xl md:text-8xl tracking-tight font-extrabold text-white`).
  - Contact pills: Monospace or clean sans pill labels with subtle border and fill contrast (`bg-white/10 hover:bg-white text-white hover:text-black border border-white/20`).
- **Composition & Layout**:
  - Full-screen height (`h-screen`), content positioned on the left side (`max-w-2xl text-left flex flex-col justify-center px-6 sm:px-12 md:px-16`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Removal of Previous Navbar & Modals**
  - *Chosen Approach*: Fully remove the top navbar and agency modal overlays from the main screen view.
  - *Why*: User explicitly requested removing all excess text and top navbar for a clean aesthetic.
  - *Alternatives Considered*: Keeping a minimal menu—rejected per user selection.

- **Decision 2: Dual Action Pills (Email + LinkedIn)**
  - *Chosen Approach*: Two sleek pill buttons side-by-side with hover inversion effects and micro-interactions.
  - *Why*: Offers clear, immediate affordance for both asynchronous contact (email) and social verification (LinkedIn).

---

## 4. Technical Architecture & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                           App                               │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 CursorFollower                      │   │
│   │      (Fine pointer check, lerp loop, hover scale)   │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                BackgroundVideo                      │   │
│   │   (Fixed full-screen, horizontal mouse-scrub logic) │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                  HeroSection                        │   │
│   │                                                     │   │
│   │   Left-Aligned Main Area:                           │   │
│   │   • Heading: "VILAS K R" (Bold display typography)  │   │
│   │   • Actions Container:                              │   │
│   │       ├── Email Pill (copy to clipboard + mailto)   │   │
│   │       └── LinkedIn Pill (opens profile link)        │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component State & Handler Mapping
- **`HeroSection.tsx`**:
  - Houses the bold name and contact pills.
  - State: `copiedEmail` (boolean flag for 2-second copied badge indicator).
  - Handlers:
    - `handleCopyEmail`: Uses `navigator.clipboard.writeText('vilaskr762@gmail.com')` with fallback to text range copy; sets visual confirmation.
    - `handleLinkedInClick`: Opens `https://www.linkedin.com/in/vilas-k-r-a3b193339/?isSelfProfile=true`.
- **`App.tsx`**:
  - Cleaned up to render `CursorFollower`, `BackgroundVideo`, and `HeroSection` (omitting `Navbar` and agency modals).
