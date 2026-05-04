import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/ContactForm.jsx';

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Globe Express Logistics</title>
        <meta name="description" content="Get in touch with Globe Express Logistics. Request a quote or contact our Transport Nagar office in Lucknow. Open until 7:00 PM. GSTIN: 09AAOFG2381C1ZE" />
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
              Get in <span className="text-primary">touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Request a quote or reach out to our team for any logistics inquiries
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8" style={{letterSpacing: '-0.02em'}}>
                Request a quote
              </h2>
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8" style={{letterSpacing: '-0.02em'}}>
                Contact information
              </h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Office address</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Office Number S-374, Building Name-Globe Express Logistics, Near By Chaurasia Sweet House, Transport Nagar, Lucknow-226012, Uttar Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="text-muted-foreground">info@globeexpresslogistics.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Business hours</p>
                    <p className="text-muted-foreground">Open until 7:00 PM</p>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm font-medium">GSTIN: 09AAOFG2381C1ZE</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8234567890123!2d80.9876543!3d26.8765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUyJzM1LjYiTiA4MMKwNTknMTUuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Globe Express Logistics location map"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ContactPage;