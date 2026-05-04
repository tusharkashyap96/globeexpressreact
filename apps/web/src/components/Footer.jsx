import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Truck } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[hsl(var(--charcoal))] text-[hsl(var(--charcoal-foreground))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Globe Express <span className="text-primary">Logistics</span>
              </span>
            </div>
            <p className="text-[hsl(var(--charcoal-foreground))]/80 leading-relaxed">
              Your trusted partner for nationwide road transport solutions since 2015.
            </p>
          </div>

          <div>
            <span className="font-bold text-lg mb-4 block">Contact info</span>
            <div className="space-y-3 text-[hsl(var(--charcoal-foreground))]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  Office Number S-374, Building Name-Globe Express Logistics, Near By Chaurasia Sweet House, Transport Nagar, Lucknow-226012, Uttar Pradesh
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p>info@globeexpresslogistics.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <p>Open until 7:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <span className="font-bold text-lg mb-4 block">Quick links</span>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[hsl(var(--charcoal-foreground))]/80 hover:text-primary transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[hsl(var(--charcoal-foreground))]/80 hover:text-primary transition-colors duration-200">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[hsl(var(--charcoal-foreground))]/80 hover:text-primary transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[hsl(var(--charcoal-foreground))]/80 hover:text-primary transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-[hsl(var(--charcoal-foreground))]/80 hover:text-primary transition-colors duration-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-lg mb-4 block">Legal</span>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/terms" className="text-[hsl(var(--charcoal-foreground))]/80 hover:text-primary transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[hsl(var(--charcoal-foreground))]/80 hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-[hsl(var(--charcoal-foreground))]/80 hover:text-primary transition-colors duration-200">
                  Refund/Cancellation Policy
                </Link>
              </li>
            </ul>
            <p className="text-sm text-[hsl(var(--charcoal-foreground))]/60">
              GSTIN: 09AAOFG2381C1ZE
            </p>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--charcoal-foreground))]/20 mt-12 pt-8 text-center text-[hsl(var(--charcoal-foreground))]/60">
          <p>&copy; 2026 Globe Express Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;