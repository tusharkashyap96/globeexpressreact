import React from 'react';

const highlights = [
  'Safe packaging',
  'Reasonably priced',
  'Carefully handled',
  'Easily accessible',
  'Proper instructions',
  'Good customer service',
  'Centrally located',
  'Systematic service',
  'Quick assistance'
];

function ReviewHighlights() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{letterSpacing: '-0.02em'}}>
          What our customers say
        </h2>
        <p className="text-center text-muted-foreground mb-12 mx-auto">
          Trusted by thousands across India for reliable logistics solutions
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="px-5 py-2.5 bg-primary/10 text-primary rounded-full font-medium text-sm md:text-base transition-all duration-200 hover:bg-primary/20 hover:scale-105"
            >
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewHighlights;