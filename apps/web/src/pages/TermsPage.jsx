import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Globe Express Logistics</title>
        <meta name="description" content="Read the terms and conditions for using Globe Express Logistics services. Understand our policies for transportation, liability, and service agreements." />
      </Helmet>

      <Header />

      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight" style={{letterSpacing: '-0.02em'}}>
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground">Last updated: April 30, 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By engaging Globe Express Logistics for transportation services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">2. Service scope</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Globe Express Logistics provides nationwide road transportation services including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Commercial freight transport</li>
                  <li>Household goods relocation (packers and movers)</li>
                  <li>Camper/RV transport</li>
                  <li>Dedicated transport routes</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. Booking and payment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All bookings must be confirmed in writing or through our official channels. Payment terms will be specified in the service agreement. We accept various payment methods as communicated during booking.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">4. Cancellation policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cancellations made before dispatch incur no fees. If the shipment has been dispatched or has reached the pickup location, cancellation fees will apply as per the service agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. Liability and insurance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we take utmost care in handling your goods, Globe Express Logistics' liability is limited as per standard transportation regulations. We recommend customers obtain appropriate insurance for high-value items.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">6. Prohibited items</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The following items are prohibited from transport:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Hazardous materials without proper licensing</li>
                  <li>Illegal substances or contraband</li>
                  <li>Perishable goods without prior arrangement</li>
                  <li>Items prohibited by law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Customer responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Customers must provide accurate information about goods being transported, ensure proper packaging, and be available at agreed pickup and delivery times.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">8. Delivery timeframes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive for on-time delivery, timeframes are estimates and may be affected by factors beyond our control including weather, traffic, and regulatory requirements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">9. Dispute resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any disputes arising from our services will be resolved through negotiation. If unresolved, disputes will be subject to the jurisdiction of courts in Lucknow, Uttar Pradesh.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">10. Contact information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these terms, contact us at Office Number S-374, Transport Nagar, Lucknow-226012, or email info@globeexpresslogistics.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default TermsPage;