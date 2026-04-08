/**
 * G7 Hotels - Type Definitions
 * Complete type system for luxury hotel management
 */

// ============================================================
// ROOM & SUIT TYPES
// ============================================================

export type RoomType = 
  | 'standard'
  | 'deluxe'
  | 'suite'
  | 'presidential'
  | 'royal';

export type RoomView = 
  | 'city'
  | 'garden'
  | 'ocean'
  | 'mountain'
  | 'pool'
  | 'courtyard';

export type BedType = 
  | 'king'
  | 'queen'
  | 'twin'
  | 'double';

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  view: RoomView;
  description: string;
  shortDescription: string;
  images: string[];
  virtualTourUrl?: string;
  basePrice: number;
  currency: string;
  size: number; // in square feet
  maxOccupancy: number;
  maxAdults: number;
  maxChildren: number;
  beds: {
    type: BedType;
    count: number;
  }[];
  amenities: string[];
  features: {
    smoking: boolean;
    petFriendly: boolean;
    accessible: boolean;
    connectingRooms: boolean;
  };
  availability: {
    total: number;
    available: number;
  };
  rating: number;
  reviewCount: number;
  featured: boolean;
  sortOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// BOOKING TYPES
// ============================================================

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'checked-in'
  | 'checked-out'
  | 'cancelled'
  | 'no-show'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'partial'
  | 'paid'
  | 'refunded'
  | 'failed';

export interface BookingGuest {
  id?: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
}

export interface RoomBooking {
  roomId: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  pricePerNight: number;
  totalPrice: number;
  currency: string;
}

export interface Booking {
  id: string;
  confirmationNumber: string;
  guest: BookingGuest;
  rooms: RoomBooking[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  taxes: number;
  fees: number;
  discount: number;
  totalAmount: number;
  currency: string;
  promoCode?: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
  checkIn: Date;
  checkOut: Date;
}

// ============================================================
// DINING TYPES
// ============================================================

export type CuisineType = 
  | 'indian'
  | 'continental'
  | 'chinese'
  | 'japanese'
  | 'italian'
  | 'french'
  | 'mediterranean'
  | 'thai'
  | 'fusion';

export type DietaryType = 
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free'
  | 'halal'
  | 'kosher';

export type MealType = 
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'brunch'
  | 'high-tea'
  | 'all-day';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  cuisine: CuisineType[];
  mealTypes: MealType[];
  images: string[];
  capacity: number;
  openingHours: {
    [key: string]: { // 'monday', 'tuesday', etc.
      open: string; // '07:00'
      close: string; // '23:00'
      closed?: boolean;
    };
  };
  dressCode: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  features: string[];
  dietaryOptions: DietaryType[];
  chef?: {
    name: string;
    title: string;
    bio: string;
    image: string;
  };
  menu?: {
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
  }[];
  tableBooking: {
    enabled: boolean;
    minGuests: number;
    maxGuests: number;
    depositRequired: boolean;
    depositAmount?: number;
  };
  featured: boolean;
  sortOrder?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  dietary: DietaryType[];
  allergens?: string[];
  image?: string;
  featured: boolean;
  spicy?: 1 | 2 | 3;
  vegetarian: boolean;
  available: boolean;
}

export interface TableBooking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  guest: BookingGuest;
  date: Date;
  time: string;
  guests: number;
  specialRequests?: string;
  status: BookingStatus;
  confirmationNumber: string;
  depositAmount?: number;
  depositPaid: boolean;
  createdAt: Date;
}

// ============================================================
// EXPERIENCES & CONCIERGE TYPES
// ============================================================

export type ExperienceCategory = 
  | 'adventure'
  | 'cultural'
  | 'wellness'
  | 'culinary'
  | 'romantic'
  | 'family'
  | 'business'
  | 'sightseeing';

export type ExperienceDifficulty = 'easy' | 'moderate' | 'challenging';

export interface Experience {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: ExperienceCategory;
  difficulty: ExperienceDifficulty;
  duration: string; // '2 hours', 'Full day', etc.
  images: string[];
  videoUrl?: string;
  price: number;
  currency: string;
  priceIncludes: string[];
  priceExcludes: string[];
  maxGroupSize: number;
  minAge?: number;
  location: string;
  meetingPoint?: string;
  inclusions: string[];
  exclusions: string[];
  whatToBring?: string[];
  cancellationPolicy: string;
  featured: boolean;
  available: boolean;
  rating: number;
  reviewCount: number;
  sortOrder?: number;
}

export interface ExperienceBooking {
  id: string;
  experienceId: string;
  experienceName: string;
  guest: BookingGuest;
  date: Date;
  time?: string;
  participants: number;
  specialRequests?: string;
  status: BookingStatus;
  totalPrice: number;
  currency: string;
  confirmationNumber: string;
  createdAt: Date;
}

// ============================================================
// SPA & WELLNESS TYPES
// ============================================================

export type TreatmentCategory = 
  | 'massage'
  | 'facial'
  | 'body-treatment'
  | 'hydrotherapy'
  | 'ayurveda'
  | 'wellness';

export interface SpaTreatment {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: TreatmentCategory;
  duration: number; // in minutes
  price: number;
  currency: string;
  images: string[];
  benefits: string[];
  contraindications?: string[];
  therapistGender?: 'male' | 'female' | 'any';
  featured: boolean;
  available: boolean;
}

export interface SpaBooking {
  id: string;
  treatmentId: string;
  treatmentName: string;
  guest: BookingGuest;
  date: Date;
  time: string;
  therapistPreference?: 'male' | 'female' | 'any';
  specialRequests?: string;
  status: BookingStatus;
  totalPrice: number;
  currency: string;
  confirmationNumber: string;
  createdAt: Date;
}

// ============================================================
// EVENTS & WEDDINGS TYPES
// ============================================================

export type EventType = 
  | 'wedding'
  | 'corporate'
  | 'social'
  | 'conference'
  | 'exhibition'
  | 'private-dining';

export interface Venue {
  id: string;
  name: string;
  description: string;
  type: EventType[];
  capacity: {
    theater: number;
    classroom: number;
    banquet: number;
    cocktail: number;
  };
  size: number; // in square feet
  images: string[];
  floorPlan?: string;
  features: string[];
  equipment: string[];
  location: string;
  naturalLight: boolean;
  outdoorAccess: boolean;
  featured: boolean;
}

export interface Event {
  id: string;
  name: string;
  type: EventType;
  venueId: string;
  venueName: string;
  date: Date;
  startTime: string;
  endTime: string;
  expectedGuests: number;
  description: string;
  requirements: string[];
  catering: {
    required: boolean;
    type?: 'buffet' | 'plated' | 'cocktail' | 'tea-coffee';
    dietary?: DietaryType[];
  };
  accommodation: {
    required: boolean;
    roomsNeeded?: number;
  };
  status: BookingStatus;
  estimatedBudget?: number;
  currency: string;
  contact: BookingGuest;
  createdAt: Date;
}

// ============================================================
// OFFERS & LOYALTY TYPES
// ============================================================

export type OfferType = 
  | 'room-discount'
  | 'dining'
  | 'spa'
  | 'experience'
  | 'package'
  | 'stay-pay'
  | 'early-bird'
  | 'last-minute';

export interface Offer {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  type: OfferType;
  images: string[];
  startDate: Date;
  endDate: Date;
  discount: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  minStay?: number;
  maxDiscount?: number;
  applicableTo: string[]; // room IDs, restaurant IDs, etc.
  terms: string[];
  promoCode?: string;
  featured: boolean;
  active: boolean;
  sortOrder?: number;
}

export type LoyaltyTier = 'silver' | 'gold' | 'platinum' | 'royal';

export interface LoyaltyMember {
  id: string;
  membershipNumber: string;
  userId: string;
  tier: LoyaltyTier;
  points: number;
  pointsEarned: number;
  pointsRedeemed: number;
  memberSince: Date;
  tierExpiry?: Date;
  benefits: string[];
  nextTier?: {
    name: LoyaltyTier;
    pointsRequired: number;
    progress: number;
  };
  preferences: {
    roomType?: RoomType;
    floorPreference?: string;
    newspaper?: string;
    pillowType?: string;
    dietaryRestrictions?: DietaryType[];
  };
}

export interface PointsTransaction {
  id: string;
  memberId: string;
  type: 'earned' | 'redeemed' | 'expired';
  points: number;
  description: string;
  bookingId?: string;
  balance: number;
  createdAt: Date;
  expiresAt?: Date;
}

// ============================================================
// USER & AUTH TYPES
// ============================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'guest' | 'member' | 'admin' | 'staff';
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfile extends User {
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      sms: boolean;
      marketing: boolean;
    };
  };
  loyaltyMember?: LoyaltyMember;
}

// ============================================================
// CONTENT & CMS TYPES
// ============================================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  featuredImage: string;
  gallery?: string[];
  publishedAt: Date;
  updatedAt: Date;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  status: 'draft' | 'published' | 'archived';
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  tags: string[];
  alt: string;
  order: number;
}

export interface Testimonial {
  id: string;
  guestName: string;
  guestLocation?: string;
  roomType?: string;
  rating: number;
  title?: string;
  content: string;
  stayDate: Date;
  verified: boolean;
  response?: {
    content: string;
    author: string;
    date: Date;
  };
  featured: boolean;
}

export interface Award {
  id: string;
  name: string;
  organization: string;
  year: number;
  category: string;
  image?: string;
  url?: string;
  featured: boolean;
}

// ============================================================
// LOCATION & CONTACT TYPES
// ============================================================

export interface Location {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'spa' | 'experience';
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  directionsUrl?: string;
  hours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  features: string[];
  images: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  interest?: string;
  preferredContact?: 'email' | 'phone';
  consent: boolean;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface SearchFilters {
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
  rooms?: number;
  roomType?: RoomType[];
  view?: RoomView[];
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  accessible?: boolean;
  petFriendly?: boolean;
  sortBy?: 'price' | 'rating' | 'name' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface AvailabilityResponse {
  available: boolean;
  rooms: Room[];
  pricing: {
    basePrice: number;
    taxes: number;
    fees: number;
    total: number;
    currency: string;
  };
  message?: string;
}

// ============================================================
// FORM TYPES
// ============================================================

export interface BookingFormData {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  rooms: number;
  roomType?: RoomType;
  promoCode?: string;
}

export interface GuestFormData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardName?: string;
}

export interface TableBookingFormData {
  restaurantId: string;
  date: Date;
  time: string;
  guests: number;
  specialRequests?: string;
  guest: BookingGuest;
}

// ============================================================
// UI COMPONENT TYPES
// ============================================================

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  description?: string;
  image?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}
