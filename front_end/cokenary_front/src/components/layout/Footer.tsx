
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/40 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex flex-col items-start">
              <div className="flex items-center space-x-1.5">
                <span className="font-display text-xl font-medium">Cokenary</span>
                <span className="text-primary/80 font-display text-xl font-light"></span>
              </div>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm">
            Cokenary professionals with exceptional opportunities and delicious recipes.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Menu</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/recipes" className="text-sm text-foreground hover:text-primary transition-colors">Recipes</Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-sm text-foreground hover:text-primary transition-colors">Restaurants</Link>
              </li>
              <li>
                <Link to="/employees" className="text-sm text-foreground hover:text-primary transition-colors">Employees</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm text-foreground hover:text-primary transition-colors">Jobs</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Account</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/login" className="text-sm text-foreground hover:text-primary transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-foreground hover:text-primary transition-colors">Register</Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-foreground hover:text-primary transition-colors">Profile</Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-foreground hover:text-primary transition-colors">Settings</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Contact</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:contact@culinaryconnective.com" className="text-sm text-foreground hover:text-primary transition-colors flex items-center">
                  <Mail size={14} className="mr-2.5" />
                  contact@culinaryconnective.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="text-sm text-foreground hover:text-primary transition-colors flex items-center">
                  <Phone size={14} className="mr-2.5" />
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground hover:text-primary transition-colors flex items-start">
                  <MapPin size={14} className="mr-2.5 mt-0.5" />
                  <span>123 Gourmet Avenue<br />Cuisine City, CA 12345</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Culinary Connective. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
