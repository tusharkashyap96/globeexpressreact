import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function ServiceCard({ title, description, image, index }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      
      <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{letterSpacing: '-0.02em'}}>
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        <button className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200">
          Learn more
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

export default ServiceCard;