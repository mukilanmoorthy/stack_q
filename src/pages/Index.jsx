import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Heart, 
  Users, 
  TrendingUp,
  Code2,
  Palette,
  Rocket,
  Sun,
  Moon,
  Layout
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroBackground from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-primary/10 to-secondary/20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-20 animate-float floating-1 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-secondary rounded-full opacity-30 animate-float floating-2 blur-lg"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-warm rounded-full opacity-15 animate-float floating-3 blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-accent-bright/20 rounded-full animate-pulse3d blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Hero Content */}
          <div className="animate-slide-down">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-primary text-white border-0 shadow-glow">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome to StackQ
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Create. Share. </span>
              <br />
              <span className="text-foreground">Inspire Together</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our vibrant community of creators, writers, and innovators. 
              Share your stories, discover amazing content, and connect with like-minded people.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="animate-slide-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="hero"
              className="btn-3d bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-primary/80 transition-colors"
              onClick={() => navigate('/create')}
            >
              Start Writing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
  size="lg"
  className="btn-3d bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-primary/80 transition-colors"
  onClick={() => navigate('/blog')}
>
  Explore Stories
  <Rocket className="ml-2 w-5 h-5" />
</Button>

          </div>

          
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-scale">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          

         

          
        </div>
      </div>
    </section>
  );
};


const Index = () => {
  const [designVariant, setDesignVariant] = useState(1);

  const DesignSelector = () => (
    <div className="fixed bottom-6 left-6 z-50">
      <Card className="glass border-border/30">
        
      </Card>
    </div>
  );

  return (
    <div className={`min-h-screen design-variant-${designVariant}`}>
      <Header />
      <DesignSelector />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Feature Section */}
      <FeatureSection />
      
      {/* Blog Preview Section */}
      <section className="py-20 bg-gradient-to-t from-background to-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-scale">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up delay-300">
            {/* Sample Blog Cards */}
            

            

          
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-bounce-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of creators who are already sharing their stories on StackQ
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="btn-3d bg-white text-primary hover:bg-white/90 hover:scale-105 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Get Started Today
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;