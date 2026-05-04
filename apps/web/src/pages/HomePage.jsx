import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TrustBanner from '@/components/TrustBanner.jsx';
import ReviewHighlights from '@/components/ReviewHighlights.jsx';
import TestimonialSlider from '@/components/TestimonialSlider.jsx';
import FAQAccordion from '@/components/FAQAccordion.jsx';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Globe Express Logistics - Nationwide Road Transport Solutions</title>
        <meta name="description" content="Trusted logistics partner since 2015. Safe, reliable nationwide road transport for commercial freight and household goods across India. GST verified with 4.7/5 rating." />
      </Helmet>

      <Header />

      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1602397619989-5c91486230c1"
            alt="Logistics trucks on highway"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight" style={{letterSpacing: '-0.02em'}}>
              Nationwide road transport
              <span className="block text-primary mt-2">you can trust</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Safe, reliable logistics solutions for commercial freight and household goods across India since 2015
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 transition-all duration-200 active:scale-[0.98]">
                <Link to="/contact">
                  Get a quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]">
                <Link to="/services">
                  Our services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustBanner />

      <ReviewHighlights />

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-8 shadow-lg"
            >
              <div className="text-5xl font-bold text-primary mb-2 tabular-nums">2,847</div>
              <p className="text-muted-foreground">Successful deliveries</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-lg"
            >
              <div className="text-5xl font-bold text-primary mb-2 tabular-nums">11+</div>
              <p className="text-muted-foreground">Years of experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-lg"
            >
              <div className="text-5xl font-bold text-primary mb-2 tabular-nums">97.3%</div>
              <p className="text-muted-foreground">On-time delivery rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialSlider />

      <FAQAccordion />

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{letterSpacing: '-0.02em'}}>
            Ready to ship with confidence?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
            Get a free quote today and experience hassle-free logistics
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 transition-all duration-200 active:scale-[0.98]">
            <Link to="/contact">
              Request a quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;