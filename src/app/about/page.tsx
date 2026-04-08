'use client';

import { motion } from 'framer-motion';
import { Award, MapPin, Star, Users, Leaf, Heart, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const values = [
  {
    icon: Star,
    title: 'Excellence',
    description: 'We strive for perfection in every detail, from the linens on your bed to the fine dining experiences we create.'
  },
  {
    icon: Heart,
    title: 'Hospitality',
    description: 'Our guests become family. Every interaction is guided by warmth, respect, and a genuine desire to exceed expectations.'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We conduct business with honesty, transparency, and an unwavering commitment to ethical practices.'
  },
  {
    icon: Users,
    title: 'Innovation',
    description: 'While honoring our rich heritage, we continuously evolve to meet the changing needs of modern travelers.'
  }
];

const leadership = [
  {
    name: 'Rajesh Kumar',
    position: 'Managing Director & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    bio: 'With over 25 years in luxury hospitality, Rajesh leads G7 Hotels with a vision of redefining Indian luxury hospitality.'
  },
  {
    name: 'Priya Sharma',
    position: 'Director of Operations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    bio: 'Priya ensures operational excellence across all G7 properties, maintaining the highest standards of service delivery.'
  },
  {
    name: 'Vikram Mehta',
    position: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    bio: 'Chef Vikram brings decades of culinary expertise, crafting memorable dining experiences that celebrate Indian and global cuisines.'
  },
  {
    name: 'Ananya Singh',
    position: 'Director of Sustainability',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
    bio: 'Ananya champions environmental initiatives, ensuring G7 Hotels leads the industry in sustainable luxury hospitality.'
  }
];

const awards = [
  { name: 'World\'s Best Hotel', organization: 'Travel + Leisure', year: 2023 },
  { name: 'Luxury Hotel of the Year', organization: 'Luxury Travel Awards', year: 2023 },
  { name: 'Best Fine Dining', organization: 'Michelin Guide', year: 2023 },
  { name: 'Sustainable Hotel Award', organization: 'Green Hotelier', year: 2022 },
  { name: 'Excellence in Service', organization: 'World Travel Awards', year: 2022 },
  { name: 'Best Spa Resort', organization: 'Forbes Travel Guide', year: 2021 }
];

const sustainability = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Practices',
    description: 'Zero-waste initiatives, renewable energy, and water conservation programs across all properties.'
  },
  {
    icon: Users,
    title: 'Community Engagement',
    description: 'Supporting local communities through employment, education programs, and cultural preservation.'
  },
  {
    icon: Shield,
    title: 'Ethical Sourcing',
    description: 'Partnering with local artisans and farmers to bring you authentic, responsibly-sourced experiences.'
  }
];

const milestones = [
  { year: '2005', title: 'Foundation', description: 'G7 Hotels was established with a vision to redefine Indian luxury hospitality.' },
  { year: '2010', title: 'First Property', description: 'Opened our flagship property in Mumbai, setting new standards in luxury.' },
  { year: '2015', title: 'Expansion', description: 'Expanded to 5 major Indian cities, establishing our presence nationwide.' },
  { year: '2018', title: 'International Recognition', description: 'Received our first World\'s Best Hotel award from Travel + Leisure.' },
  { year: '2020', title: 'Sustainability Commitment', description: 'Launched comprehensive green initiatives across all properties.' },
  { year: '2024', title: 'Global Excellence', description: 'Recognized as one of the world\'s top luxury hotel chains.' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&h=1080&fit=crop"
            alt="G7 Hotels Luxury Lobby"
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
            <h1 className="text-5xl md:text-7xl font-serif mb-6">About G7 Hotels</h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              Where Indian Hospitality Meets Timeless Luxury
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-[#C9A45C] mb-6" />
              <p className="text-lg text-[#1A1A1A]/80 mb-4 leading-relaxed">
                Founded in 2005, G7 Hotels was born from a simple yet ambitious vision: to create India's most
                prestigious luxury hospitality brand that seamlessly blends traditional Indian warmth with world-class
                standards of excellence.
              </p>
              <p className="text-lg text-[#1A1A1A]/80 mb-4 leading-relaxed">
                What began as a single property in Mumbai has grown into a collection of iconic hotels across India's
                most coveted destinations. Each G7 property tells a unique story, celebrating the rich cultural
                heritage of its location while offering unparalleled comfort and sophistication.
              </p>
              <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
                Our commitment to excellence extends beyond exceptional service. We are dedicated to sustainable
                practices, community engagement, and preserving the traditions that make India extraordinary.
              </p>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=1000&fit=crop"
                alt="G7 Hotels Heritage"
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#F8F6F2] mb-4">Our Values</h2>
            <p className="text-xl text-[#F8F6F2]/70">The principles that guide everything we do</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full bg-[#2C4A3E] border-[#C9A45C]/30 hover:border-[#C9A45C] transition-colors">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#C9A45C]/20 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="w-8 h-8 text-[#C9A45C]" />
                    </div>
                    <h3 className="text-xl font-serif text-[#F8F6F2] mb-3">{value.title}</h3>
                    <p className="text-[#F8F6F2]/70">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Our Journey</h2>
            <p className="text-xl text-[#1A1A1A]/70">Key moments that shaped our legacy</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#C9A45C]/30 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative md:grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className={`md:text-right ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto md:mr-0'}`}>
                    <div className="inline-block bg-[#C9A45C] text-[#F8F6F2] px-4 py-2 rounded text-2xl font-serif mb-3">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-serif text-[#1A1A1A] mb-2">{milestone.title}</h3>
                    <p className="text-[#1A1A1A]/70">{milestone.description}</p>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="w-4 h-4 bg-[#C9A45C] rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-[#F8F6F2]" />
                  </div>

                  <div className={index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}>
                    <div className="h-32 bg-[#2C4A3E]/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-12 h-12 text-[#2C4A3E]/30" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4 bg-[#2C4A3E]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Award className="w-16 h-16 text-[#C9A45C] mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-serif text-[#F8F6F2] mb-4">Awards & Recognition</h2>
            <p className="text-xl text-[#F8F6F2]/70">Celebrating excellence in hospitality</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {awards.map((award, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="bg-[#1A1A1A] border-[#C9A45C]/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#C9A45C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-[#C9A45C]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif text-[#F8F6F2] mb-1">{award.name}</h3>
                        <p className="text-[#C9A45C] mb-1">{award.organization}</p>
                        <p className="text-[#F8F6F2]/60 text-sm">{award.year}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Our Leadership</h2>
            <p className="text-xl text-[#1A1A1A]/70">Meet the visionaries behind G7 Hotels</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif text-[#1A1A1A] mb-1">{leader.name}</h3>
                    <p className="text-[#C9A45C] font-medium mb-3">{leader.position}</p>
                    <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">{leader.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 px-4 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Leaf className="w-16 h-16 text-[#C9A45C] mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-serif text-[#F8F6F2] mb-4">Our Commitment to Sustainability</h2>
            <p className="text-xl text-[#F8F6F2]/70">Luxury that cares for our planet</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {sustainability.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-20 h-20 bg-[#C9A45C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-[#C9A45C]" />
                </div>
                <h3 className="text-2xl font-serif text-[#F8F6F2] mb-3">{item.title}</h3>
                <p className="text-[#F8F6F2]/70">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2C4A3E] rounded-lg p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl font-serif text-[#F8F6F2] mb-4">Green Initiatives Impact</h3>
            <div className="grid md:grid-cols-4 gap-6 text-[#F8F6F2]/80">
              <div>
                <div className="text-4xl font-bold text-[#C9A45C] mb-2">40%</div>
                <p className="text-sm">Energy from renewable sources</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#C9A45C] mb-2">60%</div>
                <p className="text-sm">Water consumption reduced</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#C9A45C] mb-2">Zero</div>
                <p className="text-sm">Single-use plastics</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#C9A45C] mb-2">100%</div>
                <p className="text-sm">Locally sourced produce</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#C9A45C]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              Experience the G7 Difference
            </h2>
            <p className="text-xl text-[#1A1A1A]/80 mb-8">
              Join us and discover why discerning travelers choose G7 Hotels for their most memorable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#1A1A1A] text-[#F8F6F2] hover:bg-[#2C4A3E] text-lg px-8"
              >
                Explore Our Hotels
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F8F6F2] text-lg px-8"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
