import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';

const services = [
  {
    title: 'Commercial freight transport',
    description: 'Reliable transportation solutions for businesses of all sizes. We handle commercial cargo with professional care, ensuring your goods reach their destination safely and on time. Our fleet is equipped to handle various types of commercial freight across India.',
    image: 'https://images.unsplash.com/photo-1565891741441-64926e441838'
  },
  {
    title: 'Household goods relocation',
    description: 'Complete packers and movers services for both within-city and all-India relocations. Our experienced team carefully packs, loads, and transports your household items with utmost care. We understand the value of your belongings and treat them as our own.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf'
  },
  {
    title: 'Camper/RV transport',
    description: 'Specialized transportation services for campers and recreational vehicles. Our trained drivers and custom equipment ensure your RV is transported safely across long distances. We handle the logistics so you can focus on your next adventure.',
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644'
  },
  {
    title: 'Dedicated transport routes',
    description: 'Regular scheduled services on dedicated routes including Lucknow to Delhi and all major cities across India. Benefit from our established network and reliable schedules for consistent, timely deliveries on your most important routes.',
    image: 'https://images.unsplash.com/photo-1602397619989-5c91486230c1'
  }
];

function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services - Globe Express Logistics</title>
        <meta name="description" content="Comprehensive logistics services including commercial freight, household relocation, RV transport, and dedicated routes. Serving all of India from our Lucknow base." />
      </Helmet>

      <Header />

      <section className="relative py-20 bg-muted overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1565891741441-64926e441838"
            alt="Logistics background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{letterSpacing: '-0.02em'}}>
              Our <span className="text-primary">services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive logistics solutions tailored to your transportation needs
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{letterSpacing: '-0.02em'}}>
            Need a custom solution?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
            Contact us to discuss your specific logistics requirements
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ServicesPage;