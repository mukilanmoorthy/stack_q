import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { auth, provider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match.');
          return;
        }
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* ✨ Small, Bright, Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 15 + 5; // 5px to 20px
          const left = Math.random() * 100;
          const delay = Math.random() * 10;
          const duration = Math.random() * 10 + 10;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                bottom: `-30px`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 70%)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              }}
              initial={{ opacity: 0 }}
              animate={{ y: -window.innerHeight - 100, opacity: [0, 1, 0] }}
              transition={{
                delay,
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      {/* AUTH CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8 bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                ✍️
              </motion.div>
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              StackQ
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin ? 'Welcome back to your writing journey' : 'Start your blogging adventure'}
            </p>
          </div>

          {/* TOGGLE BUTTONS */}
          <div className="relative mb-8">
            <div className="flex bg-muted/50 rounded-xl p-1">
              <motion.button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors relative z-10 ${
                  isLogin ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors relative z-10 ${
                  !isLogin ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Sign Up
              </motion.button>
              <motion.div
                className="absolute top-1 bottom-1 bg-primary rounded-lg"
                animate={{ left: isLogin ? '4px' : '50%', right: isLogin ? '50%' : '4px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10 h-12 bg-background/50 border-border/50 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={e => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium group"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </form>

          {/* SOCIAL LOGIN */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-4 py-2 border border-border/50 rounded-lg bg-background/50 hover:bg-background text-sm font-medium"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoogleAuth}
                className="flex items-center justify-center px-4 py-2 border border-border/50 rounded-lg bg-background/50 hover:bg-background text-sm font-medium"
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Google
              </motion.button>
            </div>
          </div>

          {/* FOOTER TOGGLE */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
