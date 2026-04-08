'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const galleryCategories = [
  { id: 'all', label: 'All Images', count: 36 },
  { id: 'rooms', label: 'Rooms & Suites', count: 12 },
  { id: 'dining', label: 'Dining', count: 8 },
  { id: 'spa', label: 'Spa & Wellness', count: 6 },
  { id: 'events', label: 'Events', count: 6 },
  { id: 'exterior', label: 'Exterior & Gardens', count: 4 }
];

const galleryImages = [
  // Rooms
  { id: 1, category: 'rooms', src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop', alt: 'Deluxe Suite Interior', title: 'Deluxe Suite', description: 'Spacious elegance with city views' },
  { id: 2, category: 'rooms', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop', alt: 'Presidential Suite', title: 'Presidential Suite', description: 'The epitome of luxury living' },
  { id: 3, category: 'rooms', src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop', alt: 'Royal Suite Bedroom', title: 'Royal Suite Bedroom', description: 'Restful nights in ultimate comfort' },
  { id: 4, category: 'rooms', src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop', alt: 'Bathroom Detail', title: 'Marble Bathroom', description: 'Spa-inspired luxury amenities' },
  { id: 5, category: 'rooms', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop', alt: 'Living Area', title: 'Suite Living Area', description: 'Relaxation and entertainment' },
  { id: 6, category: 'rooms', src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop', alt: 'Standard Room', title: 'Standard Room', description: 'Comfort and convenience' },
  { id: 7, category: 'rooms', src: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800&h=600&fit=crop', alt: 'Garden View Room', title: 'Garden View Room', description: 'Peaceful garden vistas' },
  { id: 8, category: 'rooms', src: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&h=600&fit=crop', alt: 'Executive Suite', title: 'Executive Suite', description: 'Business traveler\'s paradise' },
  { id: 9, category: 'rooms', src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop', alt: 'Pool View Room', title: 'Pool View Room', description: 'Serene poolside views' },
  { id: 10, category: 'rooms', src: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop', alt: 'Balcony View', title: 'Private Balcony', description: 'Your personal outdoor sanctuary' },
  { id: 11, category: 'rooms', src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop', alt: 'Room Detail', title: 'Luxury Linens', description: 'Premium bedding for perfect sleep' },
  { id: 12, category: 'rooms', src: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop', alt: 'Suite Lounge', title: 'Private Lounge', description: 'Exclusive space for relaxation' },
  
  // Dining
  { id: 13, category: 'dining', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', alt: 'Fine Dining', title: 'Fine Dining Restaurant', description: 'Exquisite culinary journey' },
  { id: 14, category: 'dining', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop', alt: 'Bar', title: 'Signature Bar', description: 'Artisan cocktails and spirits' },
  { id: 15, category: 'dining', src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop', alt: 'Breakfast', title: 'Breakfast Buffet', description: 'Start your day right' },
  { id: 16, category: 'dining', src: 'https://images.unsplash.com/photo-1560421713-111c9c4f3c65?w=800&h=600&fit=crop', alt: 'Dish Presentation', title: 'Chef\'s Special', description: 'Culinary artistry on a plate' },
  { id: 17, category: 'dining', src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop', alt: 'Outdoor Dining', title: 'Garden Restaurant', description: 'Al fresco dining experience' },
  { id: 18, category: 'dining', src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop', alt: 'Tea Time', title: 'High Tea', description: 'Traditional afternoon tea' },
  { id: 19, category: 'dining', src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop', alt: 'Cocktail', title: 'Craft Cocktails', description: 'Mixology at its finest' },
  { id: 20, category: 'dining', src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop', alt: 'Private Dining', title: 'Private Dining Room', description: 'Exclusive culinary experiences' },
  
  // Spa
  { id: 21, category: 'spa', src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop', alt: 'Spa Pool', title: 'Thermal Pool', description: 'Relax in healing waters' },
  { id: 22, category: 'spa', src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=600&fit=crop', alt: 'Spa Treatment', title: 'Massage Therapy', description: 'Rejuvenate body and mind' },
  { id: 23, category: 'spa', src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop', alt: 'Spa Interior', title: 'Spa Lounge', description: 'Tranquil relaxation space' },
  { id: 24, category: 'spa', src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop', alt: 'Yoga', title: 'Yoga Studio', description: 'Find your inner peace' },
  { id: 25, category: 'spa', src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop', alt: 'Sauna', title: 'Steam Room', description: 'Detox and rejuvenate' },
  { id: 26, category: 'spa', src: 'https://images.unsplash.com/photo-1596178060810-7d58e2efa669?w=800&h=600&fit=crop', alt: 'Facial', title: 'Facial Treatment', description: 'Glow from within' },
  
  // Events
  { id: 27, category: 'events', src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop', alt: 'Wedding', title: 'Wedding Reception', description: 'Your dream celebration' },
  { id: 28, category: 'events', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop', alt: 'Conference', title: 'Conference Hall', description: 'Corporate excellence' },
  { id: 29, category: 'events', src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop', alt: 'Garden Event', title: 'Garden Party', description: 'Outdoor celebrations' },
  { id: 30, category: 'events', src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop', alt: 'Ballroom', title: 'Grand Ballroom', description: 'Spectacular events' },
  { id: 31, category: 'events', src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop', alt: 'Meeting', title: 'Board Meeting', description: 'Executive gatherings' },
  { id: 32, category: 'events', src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop', alt: 'Celebration', title: 'Gala Dinner', description: 'Memorable occasions' },
  
  // Exterior & Gardens
  { id: 33, category: 'exterior', src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop', alt: 'Hotel Exterior', title: 'Grand Entrance', description: 'Welcome to luxury' },
  { id: 34, category: 'exterior', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', alt: 'Gardens', title: 'Lush Gardens', description: 'Natural beauty' },
  { id: 35, category: 'exterior', src: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop', alt: 'Rooftop', title: 'Rooftop View', description: 'Stunning panoramas' },
  { id: 36, category: 'exterior', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop', alt: 'Pool Area', title: 'Infinity Pool', description: 'Relaxation paradise' }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const previousIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop"
            alt="G7 Hotels Gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Filter className="w-16 h-16 mx-auto mb-4 text-[#C9A45C]" />
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Gallery</h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              A Visual Journey Through G7 Hotels
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-0 z-10 bg-[#F8F6F2] border-b border-[#1A1A1A]/10 py-4 px-4 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="bg-white border border-[#1A1A1A]/10 overflow-x-auto w-full justify-start">
              {galleryCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex-shrink-0 data-[state=active]:bg-[#C9A45C] data-[state=active]:text-[#1A1A1A]"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 bg-[#1A1A1A]/10 text-[#1A1A1A]">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={fadeInUp}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-lg mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#1A1A1A]/60">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              <div className="relative aspect-video bg-black">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="font-serif text-2xl mb-2">{selectedImage.title}</h3>
                <p className="opacity-90">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#F8F6F2] mb-6">
              Experience It in Person
            </h2>
            <p className="text-xl text-[#F8F6F2]/70 mb-8">
              Images can only capture so much. Visit us to experience the true luxury of G7 Hotels.
            </p>
            <Button
              size="lg"
              className="bg-[#C9A45C] text-[#1A1A1A] hover:bg-[#F8F6F2] text-lg px-8"
            >
              Book Your Stay
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
