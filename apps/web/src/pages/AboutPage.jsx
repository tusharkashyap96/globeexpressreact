import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const values = [
  {
    icon: Target,
    title: 'Customer first',
    description: 'We prioritize customer satisfaction in every shipment, ensuring safe and timely delivery of your goods.'
  },
  {
    icon: Users,
    title: 'Professional team',
    description: 'Our experienced drivers and logistics experts handle your cargo with utmost care and professionalism.'
  },
  {
    icon: Award,
    title: 'Quality service',
    description: 'Systematic processes and proper handling ensure your goods arrive in perfect condition every time.'
  },
  {
    icon: TrendingUp,
    title: 'Continuous growth',
    description: 'We constantly improve our services and expand our reach to serve you better across India.'
  }
];

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - Globe Express Logistics</title>
        <meta name="description" content="Learn about Globe Express Logistics, established in 2015. We are Lucknow's trusted logistics partner serving customers across India with reliable road transport solutions." />
      </Helmet>

      <Header />

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{letterSpacing: '-0.02em'}}>
              About <span className="text-primary">Globe Express Logistics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your trusted logistics partner since 2015, delivering excellence across India
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{letterSpacing: '-0.02em'}}>
                Our story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Established in February 2015, Globe Express Logistics has grown into a top player in Lucknow's logistics sector. Operating from Transport Nagar, we serve as a one-stop destination for local and pan-India customers seeking reliable transportation solutions.
                </p>
                <p>
                  What started as a small operation has evolved into a comprehensive logistics service provider, handling everything from commercial freight to household relocations. Our commitment to safe packaging, systematic service, and customer satisfaction has earned us a stellar 4.7/5 rating based on 136 customer reviews.
                </p>
                <p>
                  Today, we specialize in secure, nationwide ground transportation across India using our dedicated road fleet. Our centrally located office in Transport Nagar, Lucknow, allows us to efficiently serve customers throughout Uttar Pradesh and beyond.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1565891741441-64926e441838"
                alt="Globe Express Logistics warehouse operations"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{letterSpacing: '-0.02em'}}>
              Our mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              To provide safe, reliable, and efficient logistics solutions that exceed customer expectations while maintaining the highest standards of professionalism and care.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{letterSpacing: '-0.02em'}}>
              Our values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutPage;