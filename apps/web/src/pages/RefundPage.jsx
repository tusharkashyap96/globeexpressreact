import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function RefundPage() {
  return (
    <>
      <Helmet>
        <title>Refund & Cancellation Policy - Globe Express Logistics</title>
        <meta name="description" content="Understand Globe Express Logistics refund and cancellation policy. Learn about cancellation fees, refund timelines, and our commitment to fair service." />
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
              Refund & Cancellation Policy
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
                <h2 className="text-2xl font-bold mb-4">1. Cancellation policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our cancellation policy is designed to be fair to both customers and our operations:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Before dispatch:</strong> If you cancel before the shipment is dispatched, no cancellation fees will be charged. You will receive a full refund of any advance payment.</li>
                  <li><strong>After dispatch:</strong> If the shipment has been dispatched or our team has reached the pickup location, cancellation fees will apply based on the resources already committed.</li>
                  <li><strong>Partial completion:</strong> If services are partially completed, charges will be calculated proportionally based on work done.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">2. Cancellation fees</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When cancellation fees apply, they are calculated as follows:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Team dispatched but goods not loaded: 25% of total service charge</li>
                  <li>Goods loaded but not transported: 50% of total service charge</li>
                  <li>Transportation in progress: 75% of total service charge</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. Refund process</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Refunds are processed within 7-10 business days of cancellation approval. The refund will be credited to the original payment method used for booking.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">4. Service delays</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If delivery is delayed beyond the agreed timeframe due to our fault, you may be eligible for compensation. Contact our support team immediately to report delays and discuss resolution options.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. Damaged goods</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In case of damaged goods during transport:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Report damage within 24 hours of delivery</li>
                  <li>Provide photographic evidence of damage</li>
                  <li>Claims will be assessed based on our liability terms</li>
                  <li>Compensation will be provided as per assessment</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">6. Force majeure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are not liable for delays or cancellations caused by events beyond our control including natural disasters, strikes, government actions, or other force majeure events. In such cases, we will work with you to reschedule or provide alternative solutions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Rescheduling</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You may reschedule your shipment without penalty if done at least 24 hours before the scheduled pickup time. Rescheduling requests made with less notice may incur additional charges.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">8. Multi-point bookings</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For bookings with multiple pickup or delivery points, cancellation of individual points may be possible. Charges will be adjusted based on the modified route and services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">9. Dispute resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you disagree with cancellation charges or refund amounts, please contact our customer service team. We are committed to fair resolution of all disputes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">10. Contact for cancellations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To cancel a booking or request a refund, contact us immediately at Office Number S-374, Transport Nagar, Lucknow-226012, call +91 98765 43210, or email support@globeexpresslogistics.com
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

export default RefundPage;