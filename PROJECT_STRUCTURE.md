# G7 Hotels - Complete Project Structure

## Directory Tree

```
g7-hotels/
├── prisma/
│   └── schema.prisma                 # Database schema (to be configured)
├── public/
│   ├── images/
│   │   ├── hero/
│   │   │   └── hero-1.jpg           # Generated hero image
│   │   ├── rooms/
│   │   │   └── luxury-room.jpg      # Generated room image
│   │   ├── dining/
│   │   │   └── fine-dining.jpg      # Generated dining image
│   │   ├── experiences/
│   │   ├── spa/
│   │   │   └── spa-treatment.jpg    # Generated spa image
│   │   └── og-image.jpg             # Open Graph image (to be created)
│   ├── favicon.ico                  # Site favicon (to be created)
│   ├── apple-touch-icon.png         # Apple touch icon (to be created)
│   ├── logo.svg                     # G7 Hotels logo
│   ├── robots.txt                   # SEO robots file
│   └── site.webmanifest             # PWA manifest
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── route.ts             # API routes (to be implemented)
│   │   ├── layout.tsx               # Root layout with fonts and theme provider
│   │   ├── page.tsx                 # Homepage (✓ COMPLETED)
│   │   └── globals.css              # Global styles with G7 brand colors
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Main header with navigation (✓ COMPLETED)
│   │   │   └── Footer.tsx           # Comprehensive footer (✓ COMPLETED)
│   │   ├── booking/
│   │   │   └── BookingWidget.tsx    # Unified booking engine (✓ COMPLETED)
│   │   ├── common/
│   │   │   └── HeroSection.tsx      # Hero and page hero components (✓ COMPLETED)
│   │   ├── rooms/
│   │   │   └── RoomCard.tsx         # Room listing cards (✓ COMPLETED)
│   │   ├── loyalty/
│   │   │   └── LoyaltyBadge.tsx     # Loyalty tier badges (✓ COMPLETED)
│   │   ├── dining/                  # (to be created)
│   │   ├── experiences/             # (to be created)
│   │   └── ui/                      # shadcn/ui components (✓ INSTALLED)
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       └── ...
│   ├── hooks/
│   │   ├── use-toast.ts             # Toast notification hook
│   │   └── use-mobile.ts            # Mobile detection hook
│   ├── lib/
│   │   ├── db.ts                    # Prisma client (configured)
│   │   └── utils.ts                 # Utility functions (✓ COMPLETED)
│   ├── store/                       # Zustand state (to be created)
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions (✓ COMPLETED)
│   └── ...
├── db/
│   └── custom.db                    # SQLite database file
├── tailwind.config.ts               # Tailwind configuration (✓ COMPLETED)
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies and scripts
├── bun.lock                         # Bun lock file
├── Caddyfile                        # Gateway configuration
├── components.json                  # shadcn/ui configuration
├── eslint.config.mjs                # ESLint configuration
└── postcss.config.mjs               # PostCSS configuration
```

## Technology Stack (CONFIRMED)

### Core Framework
- **Next.js 16** with App Router (✓ INSTALLED)
- **React 19** (✓ INSTALLED)
- **TypeScript 5** (✓ INSTALLED)

### Styling & UI
- **Tailwind CSS 4** (✓ INSTALLED)
- **shadcn/ui** - Complete component library (✓ INSTALLED)
- **Framer Motion** - Animations (✓ INSTALLED)
- **next-themes** - Theme support (✓ INSTALLED)

### Fonts
- **Cormorant Garamond** - Serif headings (luxury feel)
- **Inter** - Sans-serif body text

### Database & Backend
- **Prisma ORM** with SQLite client (✓ INSTALLED)
- **NextAuth.js v4** - Authentication (✓ INSTALLED)

### State Management
- **Zustand** - Client state (✓ INSTALLED)
- **TanStack Query** - Server state (✓ INSTALLED)

### Form Handling
- **React Hook Form** (✓ INSTALLED)
- **Zod** - Validation (✓ INSTALLED)

### Other Key Dependencies
- **date-fns** - Date utilities (✓ INSTALLED)
- **Lucide React** - Icons (✓ INSTALLED)
- **embla-carousel-react** - Carousel (✓ INSTALLED)
- **react-day-picker** - Date picker (✓ INSTALLED)
- **sonner** - Toast notifications (✓ INSTALLED)
- **z-ai-web-dev-sdk** - AI capabilities (✓ INSTALLED)

## G7 Hotels Design System

### Color Palette
```css
--g7-charcoal: #1A1A1A     /* Deep charcoal for primary elements */
--g7-ivory: #F8F6F2        /* Warm ivory for backgrounds */
--g7-gold: #C9A45C         /* Brushed gold for accents */
--g7-gold-light: #D4B97D   /* Lighter gold */
--g7-gold-dark: #A88545    /* Darker gold */
--g7-emerald: #2C4A3E      /* Muted emerald for secondary accents */
```

### Typography
- **Headings**: Cormorant Garamond (serif, luxury feel)
  - H1: 4.5rem (72px) - Mobile, up to 6rem (96px) - Desktop
  - H2: 3rem (48px) - Mobile, up to 5rem (80px) - Desktop
  - H3: 2.25rem (36px) - Mobile, up to 4rem (64px) - Desktop
  - Line heights: 1.05 - 1.3 (tight for luxury feel)

- **Body**: Inter (clean, modern sans-serif)
  - Base: 1rem (16px)
  - Large: 1.125rem (18px)
  - XL: 1.25rem (20px)
  - Line heights: 1.75 (relaxed for readability)

### Spacing System
- Base unit: 0.25rem (4px)
- Extended: 18 (4.5rem), 88 (22rem), 128 (32rem)

### Border Radius
- Sm: 0.25rem (4px)
- Md: 0.5rem (8px)
- Lg: 0.75rem (12px)
- XL: 1rem (16px)

### Animations
- fade-in: 0.6s ease-in-out
- slide-up: 0.8s ease-out
- scale-in: 0.5s ease-out
- Image zoom: 0.7s ease-in-out
- Hover lift: translateY(-4px) with shadow increase

## Completed Features (Phase 1)

### ✅ Core Infrastructure
1. **Project Structure** - Complete directory organization
2. **Design System** - Tailwind config with brand colors and typography
3. **Global Styles** - Luxury-themed CSS with custom utilities
4. **Type Definitions** - Comprehensive TypeScript types for all entities

### ✅ Layout Components
1. **Header** - 
   - Sticky navigation with scroll detection
   - Mega menu for Rooms, Dining, Experiences
   - Mobile-optimized drawer navigation
   - Search functionality
   - Language selector
   - Quick book CTA

2. **Footer** -
   - Newsletter subscription
   - Multi-column navigation
   - Social media links
   - Contact information
   - Legal links
   - Scroll to top button
   - Awards & certifications display

### ✅ Booking Components
1. **BookingWidget** -
   - Unified booking for rooms, dining, experiences
   - Date picker with check-in/check-out
   - Guest and room selector
   - Promo code input
   - Room type filter
   - Compact variant for inline use

### ✅ Common Components
1. **HeroSection** -
   - Full-bleed hero with parallax effect
   - Image/video background support
   - Awards badges
   - Dual CTA buttons
   - Scroll indicator
   - Page hero variant (smaller)

2. **TestimonialCarousel** -
   - Auto-play testimonials
   - Navigation buttons and dots
   - Guest avatars
   - Hotel responses
   - Compact card variant

### ✅ Room Components
1. **RoomCard** -
   - Grid and list variants
   - Image gallery with thumbnails
   - Favorite button
   - Virtual tour button
   - Amenities display
   - Availability status
   - Pricing display
   - Featured room card (compact)

### ✅ Loyalty Components
1. **LoyaltyBadge** -
   - Badge, card, and full variants
   - Tier icons (Silver, Gold, Platinum, Royal)
   - Points display
   - Benefits list
   - Progress indicator

### ✅ Homepage
1. **Hero Section** with booking widget overlay
2. **Why Choose Us** - 4-column feature highlights
3. **Featured Rooms** - 2 luxury suites display
4. **Dining Highlights** - Restaurant previews
5. **Experiences** - Curated activities showcase
6. **Special Offers** - Promotional packages
7. **Loyalty Program** - Rewards preview
8. **Testimonials** - Guest reviews carousel
9. **CTA Section** - Final conversion area

### ✅ Images Generated
- Hero image: Luxury hotel exterior at sunset
- Room image: Luxury hotel room with city view
- Dining image: Elegant fine dining restaurant
- Spa image: Luxury spa treatment room

## Pending Features (Phase 2+)

### 📋 Pages to Create
1. **Rooms & Suites** (/rooms)
   - Room listing with filters
   - Room detail pages
   - Virtual tour integration
   - Availability calendar

2. **Dining** (/dining)
   - Restaurant listings
   - Menu displays
   - Table booking
   - Chef profiles

3. **Experiences** (/experiences)
   - Experience listings
   - Detail pages
   - Booking functionality

4. **Spa & Wellness** (/spa)
   - Treatment menus
   - Booking system
   - Therapist profiles

5. **Events & Weddings** (/events)
   - Venue showcase
   - Event planning
   - Inquiry forms

6. **Offers** (/offers)
   - Promotional listings
   - Promo code application

7. **Loyalty** (/loyalty)
   - Member dashboard
   - Points redemption
   - Tier progress

8. **About** (/about)
   - Heritage story
   - Philosophy
   - Team profiles

9. **Gallery** (/gallery)
   - Photo galleries
   - Video content

10. **Journal** (/journal)
    - Blog posts
    - Culinary features
    - Destination guides

11. **Contact** (/contact)
    - Contact form
    - Location map
    - Inquiry handling

12. **Legal Pages**
    - Privacy Policy
    - Terms of Service
    - Cookie Policy
    - Accessibility Statement

### 📋 Backend & API
1. **Database Schema** (Prisma)
   - Rooms table
   - Bookings table
   - Users table
   - Loyalty table
   - Restaurants table
   - Experiences table
   - Reviews table

2. **API Routes**
   - /api/availability
   - /api/bookings
   - /api/pricing
   - /api/loyalty
   - /api/newsletter
   - /api/contact

3. **Authentication**
   - NextAuth.js configuration
   - OAuth providers (Google, Facebook)
   - Email/password authentication

4. **Payment Integration**
   - Stripe setup
   - Razorpay support
   - Webhook handlers

### 📋 Additional Components
1. **Cookie Consent Banner**
2. **Live Chat Widget**
3. **WhatsApp Integration**
4. **Newsletter Subscription**
5. **Search Results Component**
6. **Filter Panel**
7. **Map Component**
8. **Calendar Component** (for room availability)
9. **Review Form**
10. **Comparison Tool**

## Development Commands

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run linting
bun run lint

# Database operations
bun run db:push      # Push schema to database
bun run db:generate  # Generate Prisma Client
bun run db:migrate   # Run migrations
bun run db:reset     # Reset database
```

## Environment Variables

```env
# Database
DATABASE_URL="file:./db/custom.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Payment (Stripe)
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Payment (Razorpay)
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."

# Email
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASS="your-password"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# CMS (if using Sanity/Strapi)
SANITY_PROJECT_ID="..."
SANITY_DATASET="production"
```

## Performance Targets
- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

## Accessibility (WCAG 2.1 AA)
- Semantic HTML structure ✓
- ARIA labels ✓
- Keyboard navigation ✓
- Focus states ✓
- Screen reader support ✓
- Color contrast ratios ✓
- Reduced motion support ✓
- Alt text for images ✓

## SEO Features
- Meta tags ✓
- Open Graph tags ✓
- Twitter Card tags ✓
- Structured data (to be added)
- Sitemap (to be generated)
- Robots.txt ✓
- Canonical tags (to be added)

## Mobile Responsiveness
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly targets (min 44px) ✓
- Mobile-optimized navigation ✓
- Responsive images (to be optimized)
- Lazy loading (to be implemented)

## Security Features (to be implemented)
- CSP headers
- CSRF protection
- Rate limiting
- Input sanitization
- Secure cookies
- HTTPS enforcement
- SQL injection prevention (Prisma handles this)

---

**Status**: Phase 1 Complete (Core Structure + Homepage)
**Next Phase**: Rooms & Suites page with API integration
