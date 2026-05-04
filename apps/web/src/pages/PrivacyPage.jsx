import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Globe Express Logistics</title>
        <meta name="description" content="Learn how Globe Express Logistics collects, uses, and protects your personal information. Read our privacy policy for complete details." />
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
              Privacy Policy
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
                <h2 className="text-2xl font-bold mb-4">1. Information we collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information necessary to provide our logistics services:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Personal information: name, contact details, address</li>
                  <li>Shipment details: pickup and delivery locations, goods description</li>
                  <li>Payment information: billing details and transaction records</li>
                  <li>Communication records: emails, phone calls, and messages</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">2. How we use your information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your information is used to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Process and fulfill transportation requests</li>
                  <li>Communicate about shipment status and updates</li>
                  <li>Process payments and maintain financial records</li>
                  <li>Improve our services and customer experience</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. Information sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell your personal information. We may share information with service providers (drivers, warehouse staff) necessary to fulfill your shipment, and with authorities when required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">4. Data security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. Data retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your information for as long as necessary to provide services and comply with legal obligations. Shipment records are typically maintained for 7 years as per regulatory requirements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">6. Your rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access your personal information</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Cookies and tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may use cookies to improve user experience and analyze site usage. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">8. Third-party links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">9. Changes to this policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy periodically. Changes will be posted on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">10. Contact us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For privacy-related questions or to exercise your rights, contact us at Office Number S-374, Transport Nagar, Lucknow-226012, or email privacy@globeexpresslogistics.com
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

export default PrivacyPage;