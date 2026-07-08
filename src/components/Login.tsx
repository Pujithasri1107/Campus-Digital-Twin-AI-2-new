import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
  MapPin,
  Cpu,
  LineChart,
  Wrench,
  Sparkles,
  ArrowLeft,
  Globe,
  BookOpen,
  FileText,
  Heart,
} from 'lucide-react';
import Navbar from './ui/Navbar';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface FeatureCardProps {
  icon: typeof Building2;
  label: string;
  delay: number;
}

function FeatureCard({ icon: Icon, label, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-2 sm:gap-3 group"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center border border-primary/30"
      >
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
      </motion.div>
      <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

function FloatingParticle({ delay, size, duration }: { delay: number; size: number; duration: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [-20, -100, -180],
        x: Math.random() > 0.5 ? [0, 20, 0] : [0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
      className="absolute pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${60 + Math.random() * 30}%`,
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(37, 99, 235, 0.3) 50%, transparent 100%)`,
          boxShadow: `0 0 ${size * 2}px rgba(56, 189, 248, 0.4)`,
        }}
      />
    </motion.div>
  );
}

function DataNode({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute"
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 5px rgba(56, 189, 248, 0.3)',
            '0 0 15px rgba(56, 189, 248, 0.6)',
            '0 0 5px rgba(56, 189, 248, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, delay }}
        className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative"
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
          className="absolute inset-0 rounded-full bg-cyan-400"
        />
      </motion.div>
    </motion.div>
  );
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'Email address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Login successful! (Frontend demo only)');
      }, 1500);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    if (errors.email) {
      setErrors({ ...errors, email: validateEmail(email) });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    if (errors.password) {
      setErrors({ ...errors, password: validatePassword(password) });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050B1A] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B1A] text-white overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010409] via-[#030a1a] to-[#010409]" />

        {/* Hero-style background image */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ duration: 2 }}
          src="https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Smart Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#010409]/95 via-[#050d1f]/90 to-[#010409]/95" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#010409_80%)]" />

        {/* Primary glow */}
        <motion.div
          animate={{
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)',
          }}
        />

        {/* Secondary glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 70%)',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.4}
            size={Math.random() * 4 + 2}
            duration={Math.random() * 4 + 5}
          />
        ))}

        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              x: [0, Math.sin(i) * 15, 0],
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full"
            style={{
              width: 5 + i * 2,
              height: 5 + i * 2,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.6), transparent)'
                : 'radial-gradient(circle, rgba(37, 99, 235, 0.6), transparent)',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="w-full max-w-5xl lg:max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center">
            {/* Left Column - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm mx-auto sm:max-w-md lg:mx-0"
            >
              {/* Back to Home Link */}
              <motion.a
                href="#home"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors mb-4 sm:mb-6 lg:mb-8 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </motion.a>

              {/* Login Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 xl:p-10 backdrop-blur-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  boxShadow: '0 0 60px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Inner glow */}
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(56, 189, 248, 0.08)',
                  }}
                />

                {/* Header */}
                <div className="relative z-10 text-center mb-5 sm:mb-6 lg:mb-8">
                  {/* Logo Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-5 lg:mb-6"
                  >
                    {/* Outer glow */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-secondary blur-xl"
                    />
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center border border-white/10">
                      <Building2 className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3"
                  >
                    Welcome Back
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-gray-400 text-xs sm:text-sm lg:text-base"
                  >
                    Sign in to access the Smart Campus Digital Twin platform.
                  </motion.p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-5">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 font-medium">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 group-focus-within:text-secondary">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-secondary" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        className={`w-full bg-white/5 rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 lg:py-3.5 text-sm text-white placeholder:text-gray-500 border transition-all duration-300 focus:outline-none ${
                          errors.email
                            ? 'border-red-500/50 focus:border-red-400'
                            : 'border-white/10 focus:border-secondary/60 focus:bg-white/8'
                        }`}
                        placeholder="you@example.com"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          id="email-error"
                          className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-400 flex items-center gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-red-400" />
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 font-medium">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-secondary transition-colors" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        className={`w-full bg-white/5 rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 lg:py-3.5 text-sm text-white placeholder:text-gray-500 border transition-all duration-300 focus:outline-none ${
                          errors.password
                            ? 'border-red-500/50 focus:border-red-400'
                            : 'border-white/10 focus:border-secondary/60 focus:bg-white/8'
                        }`}
                        placeholder="Enter your password"
                        aria-describedby={errors.password ? 'password-error' : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          id="password-error"
                          className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-400 flex items-center gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-red-400" />
                          {errors.password}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border transition-all duration-300 ${
                          formData.rememberMe
                            ? 'bg-primary border-primary'
                            : 'border-white/20 group-hover:border-white/40'
                        }`}>
                          <AnimatePresence>
                            {formData.rememberMe && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center justify-center h-full"
                              >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                        Remember Me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-secondary hover:text-white transition-colors font-medium"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative overflow-hidden rounded-lg sm:rounded-xl py-3 sm:py-3.5 lg:py-4 font-semibold text-white text-sm sm:text-base group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 blur-xl opacity-50"
                    />
                    <div className="absolute inset-0 border border-white/10 rounded-lg sm:rounded-xl" />
                    <motion.div
                      animate={isSubmitting ? {} : { x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                          Login
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Divider */}
                  <div className="relative flex items-center gap-3 sm:gap-4 my-4 sm:my-5 lg:my-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">OR</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 sm:gap-2.5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 sm:gap-2.5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </motion.button>
                  </div>

                  {/* Register Link */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-xs sm:text-sm text-gray-400 pt-1.5 sm:pt-2"
                  >
                    Don't have an account?{' '}
                    <a
                      href="#"
                      className="text-secondary hover:text-white font-semibold transition-colors"
                    >
                      Register Now
                    </a>
                  </motion.p>
                </form>

                {/* Footer inside card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-5 sm:mt-6 lg:mt-8 pt-4 sm:pt-5 lg:pt-6 border-t border-white/10"
                >
                  <a href="#" className="text-[10px] sm:text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                    <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Privacy Policy
                  </a>
                  <span className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block" />
                  <a href="#" className="text-[10px] sm:text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                    <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Terms of Service
                  </a>
                  <span className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block" />
                  <a href="#" className="text-[10px] sm:text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                    <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Help Center
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Illustration (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main Illustration Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative rounded-3xl overflow-hidden backdrop-blur-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.04) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.15)',
                    boxShadow: '0 0 60px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255,255,255,0.03)',
                  }}
                >
                  {/* Campus illustration */}
                  <div className="relative aspect-square max-w-lg mx-auto overflow-hidden">
                    {/* Background layers */}
                    <motion.img
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.25 }}
                      transition={{ duration: 2 }}
                      src="https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Smart Campus"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Blue holographic tint */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/20" />

                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                          linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px),
                          linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px',
                      }}
                    />

                    {/* Data nodes */}
                    <DataNode x="20%" y="25%" delay={0} />
                    <DataNode x="40%" y="35%" delay={0.5} />
                    <DataNode x="60%" y="20%" delay={1} />
                    <DataNode x="80%" y="40%" delay={1.5} />
                    <DataNode x="30%" y="60%" delay={2} />
                    <DataNode x="50%" y="75%" delay={2.5} />
                    <DataNode x="70%" y="65%" delay={3} />
                    <DataNode x="25%" y="80%" delay={3.5} />
                    <DataNode x="75%" y="85%" delay={4} />

                    {/* Holographic elements */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400/30 rounded-br-lg" />

                    {/* Central floating icon */}
                    <motion.div
                      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary to-secondary blur-xl"
                        />
                        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Building2 className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Radar sweep */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(56, 189, 248, 0.2) 30deg, transparent 60deg)',
                        }}
                      />
                    </motion.div>

                    {/* Orbiting icons */}
                    {[Sparkles, Cpu, Globe, MapPin].map((Icon, i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateX(${100 + i * 20}px) rotate(-${i * 90}deg)`,
                        }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                          className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center border border-white/20"
                          style={{
                            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
                          }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </motion.div>
                      </motion.div>
                    ))}

                    {/* Status badges */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-400/30"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-emerald-400"
                      />
                      <span className="text-xs font-mono text-cyan-400">AI ACTIVE</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-400/30"
                    >
                      <span className="text-xs font-mono text-cyan-400">2.5K SENSORS</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-400/30"
                    >
                      <span className="text-xs font-mono text-cyan-400">94% HEALTH</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-400/30"
                    >
                      <Sparkles className="w-3 h-3 text-secondary" />
                      <span className="text-xs font-mono text-cyan-400">LIVE</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4"
                >
                  <FeatureCard icon={Sparkles} label="AI Powered Monitoring" delay={0.6} />
                  <FeatureCard icon={Wrench} label="Real-time Maintenance" delay={0.7} />
                  <FeatureCard icon={MapPin} label="Interactive Campus Map" delay={0.8} />
                  <FeatureCard icon={LineChart} label="Smart Analytics" delay={0.9} />
                  <FeatureCard icon={Cpu} label="Predictive Maintenance" delay={1.0} />
                  <FeatureCard icon={Shield} label="Secure Login" delay={1.1} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
