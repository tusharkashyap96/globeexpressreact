import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import JobCard from '@/components/JobCard.jsx';

const jobs = [
  {
    position: 'Commercial truck driver',
    location: 'Lucknow, UP',
    type: 'Full-time',
    description: 'Experienced commercial truck driver needed for long-haul routes across India. Valid commercial driving license required. Competitive salary and benefits package.'
  },
  {
    position: 'Delivery driver',
    location: 'Lucknow, UP',
    type: 'Full-time',
    description: 'Local delivery driver for within-city and regional routes. Good knowledge of Lucknow and surrounding areas preferred. Clean driving record essential.'
  },
  {
    position: 'Warehouse supervisor',
    location: 'Transport Nagar, Lucknow',
    type: 'Full-time',
    description: 'Supervise warehouse operations including loading, unloading, and inventory management. Prior logistics experience required. Leadership skills essential.'
  },
  {
    position: 'Logistics coordinator',
    location: 'Transport Nagar, Lucknow',
    type: 'Full-time',
    description: 'Coordinate shipments, manage schedules, and communicate with drivers and customers. Strong organizational and communication skills required.'
  }
];

function CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers - Globe Express Logistics</title>
        <meta name="description" content="Join the Globe Express Logistics team. We are hiring drivers, warehouse staff, and logistics coordinators in Lucknow. Apply now for exciting career opportunities." />
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
              Join our <span className="text-primary">team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Build your career with one of Lucknow's leading logistics companies
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{letterSpacing: '-0.02em'}}>
              Why work with us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2 tabular-nums">11+</div>
                <p className="text-muted-foreground">Years in business</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2 tabular-nums">47+</div>
                <p className="text-muted-foreground">Team members</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">4.7/5</div>
                <p className="text-muted-foreground">Customer rating</p>
              </motion.div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{letterSpacing: '-0.02em'}}>
              Open positions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <JobCard {...job} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{letterSpacing: '-0.02em'}}>
              Don't see the right position?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <p className="text-muted-foreground">
              Email your resume to: <a href="mailto:careers@globeexpresslogistics.com" className="text-primary font-medium hover:underline">careers@globeexpresslogistics.com</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CareersPage;