import React from 'react';
import { Star, Building2, ShieldCheck } from 'lucide-react';

function TrustBanner() {
  return (
    <div className="bg-muted py-6 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-medium">4.7/5 Stars</span>
            <span className="text-muted-foreground">based on 136 Ratings</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="font-medium">Established in Feb 2015</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="font-medium text-primary">GST Verified</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span className="font-medium" style={{color: 'hsl(45, 100%, 40%)'}}>Trust Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustBanner;