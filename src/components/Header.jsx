import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  PenTool,
  BookOpen,
  Home,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

import { auth, provider } from '@/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);

  // Scroll effect
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (!mounted) return null;

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Stories', icon: BookOpen, path: '/blog' },
    { label: 'Life Tracker', icon: User, path: '/life-tracker' },
    { label: 'Write', icon: PenTool, path: '/create' },
  ];

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled ? 'glass backdrop-blur-xl border-b border-border/30 py-2' : 'bg-transparent py-4'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center animate-pulse3d group-hover:animate-rotate3d">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity"></div>
            </div>
          <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-transparent bg-clip-text group-hover:scale-105 transition-transform">
  StackQ
</h1>

            </div>

          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="btn-3d text-foreground hover:text-primary hover:bg-primary/10 font-medium"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stories, authors..."
                className="pl-10 w-full glass border-border/30 focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Theme */}
            <Button
              variant="ghost"
              size="icon"
              className="btn-3d hover:bg-primary/10"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? 
                <Sun className="h-5 w-5 text-primary" /> : 
                <Moon className="h-5 w-5 text-primary" />}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="btn-3d hover:bg-primary/10 relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
            </Button>

            {/* Write Button */}
            <Button 
              className="hidden sm:flex btn-3d bg-gradient-primary hover:shadow-colored text-white border-0 font-semibold"
              onClick={() => navigate('/create')}
            >
              <PenTool className="w-4 h-4 mr-2" />
              Write
            </Button>

            {/* Auth Button (if not signed in) */}
            {!user && (
              <Button
                className="hidden sm:flex btn-3d bg-gradient-primary text-white border-0"
                onClick={handleLogin}
              >
                Sign Up
              </Button>
            )}

            {/* User Avatar Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="btn-3d hover:bg-primary/10">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass border-border/30">
                {user ? (
                  <>
                    <DropdownMenuItem disabled className="text-muted-foreground">
                      {user.displayName || user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem disabled className="text-muted-foreground">
                      Not signed in
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogin} className="text-primary font-medium">
                      Sign In / Sign Up with Google
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden btn-3d"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-500 ease-out
          ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
        `}>
          <nav className="glass rounded-xl border border-border/30 p-4 space-y-2">
            {/* Search */}
            <div className="lg:hidden mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-full glass border-border/30"
                />
              </div>
            </div>

            {/* Nav Items */}
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start btn-3d"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            ))}

            <Button 
              className="w-full btn-3d bg-gradient-primary text-white border-0 mt-4"
              onClick={() => {
                navigate('/create');
                setIsMenuOpen(false);
              }}
            >
              <PenTool className="w-4 h-4 mr-2" />
              Write a Story
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;   