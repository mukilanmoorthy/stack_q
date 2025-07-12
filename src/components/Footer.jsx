import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Platform: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Status', href: '#' }
    ],
    Community: [
      { name: 'Blog', href: '#' },
      { name: 'Discord', href: '#' },
      { name: 'Events', href: '#' },
      { name: 'Guidelines', href: '#' }
    ],
    Support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="relative bg-gradient-to-t from-background via-muted/5 to-background border-t border-border/30">
      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 btn-3d bg-gradient-primary text-white border-0 rounded-full w-12 h-12 shadow-elevation-high"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center animate-pulse3d">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">StackQ</h3>
                <p className="text-xs text-muted-foreground">Create. Share. Inspire.</p>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Join our vibrant community of creators, writers, and innovators. 
              Share your stories, discover amazing content, and connect with like-minded people.
            </p>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Made with</span>
<p>Mukilan</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="btn-3d hover:bg-primary/10 hover:border-primary/30"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-semibold text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 opacity-30" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <p>© 2024 StackQ. All rights reserved.</p>
            <div className="hidden sm:flex items-center space-x-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>

          <Card className="glass border-border/30">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Mukilan</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-gradient-primary/10 rounded-full blur-3xl animate-float floating-1"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-gradient-secondary/10 rounded-full blur-2xl animate-float floating-2"></div>
      </div>
    </footer>
  );
};

export default Footer;