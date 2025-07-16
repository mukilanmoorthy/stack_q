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
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      navigate('/auth');
      // await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass backdrop-blur-xl border-b border-border/30 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
    <div
  className={`
    flex items-center space-x-2 sm:space-x-3 cursor-pointer group z-50
    sm:absolute sm:top-4 sm:left-4 sm:z-50
    justify-center sm:justify-start
    w-full sm:w-auto
  `}
  onClick={() => navigate('/')}
>
  <div className="relative">
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center animate-pulse3d group-hover:animate-rotate3d">
      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </div>
    <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity"></div>
  </div>
  <h1 className="text-base sm:text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-transparent bg-clip-text group-hover:scale-105 transition-transform ">
    StackQ
  </h1>
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

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="btn-3d hover:bg-primary/10"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </Button>

            {/* Notification */}
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

            {/* User Menu */}
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
              <DropdownMenuContent
                align="end"
                className="w-60 rounded-2xl shadow-xl border border-border/30 backdrop-blur-xl bg-white/5 dark:bg-black/10 animate-dropdown3d transform origin-top-right"
              >
                {user ? (
                  <>
                    <DropdownMenuItem disabled className="text-muted-foreground cursor-not-allowed">
                      {user.displayName || user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/profile')}
                      className="hover:bg-primary/10 font-medium rounded-md transition-all duration-300"
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 font-medium rounded-md transition-all duration-300"
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem disabled className="text-muted-foreground cursor-not-allowed">
                      Not signed in
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogin}
                      className="text-primary font-semibold hover:bg-primary/10 rounded-md transition-all duration-300"
                    >
                      Sign In / Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Toggle */}
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
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="glass rounded-xl border border-border/30 p-4 space-y-2">
            {/* Mobile Search */}
            <div className="mb-4">
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
