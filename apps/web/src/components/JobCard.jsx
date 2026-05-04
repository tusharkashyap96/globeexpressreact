import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

function JobCard({ position, location, type, description }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{position}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {type}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>
      
      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]">
        Apply now
      </Button>
    </div>
  );
}

export default JobCard;