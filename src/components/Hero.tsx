import { motion } from 'framer-motion';
import { Building2, Cpu, AlertTriangle, Gauge, Sparkles, MapPin, AlertCircle, Wifi, Activity, Zap, Radio } from 'lucide-react';
import StatCard from './ui/StatCard';

const stats = [
  { icon: Building2, value: '45+', label: 'Buildings', color: 'blue' },
  { icon: Cpu, value: '2.5K', label: 'IoT Devices', color: 'cyan' },
  { icon: AlertTriangle, value: '12', label: 'Active Alerts', color: 'amber' },
  { icon: Gauge, value: '94%', label: 'Health Score', color: 'emerald' },
];

// Glowing Particle Component
function GlowingParticle({ delay, size, x, y, duration = 4 }: { delay: number; size: number; x: string; y: string; duration?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [0, -50, -100],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(37, 99, 235, 0.4) 50%, transparent 100%)`,
          boxShadow: `0 0 ${size * 2}px rgba(56, 189, 248, 0.5)`,
        }}
      />
    </motion.div>
  );
}

// Data Node Component
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
            '0 0 20px rgba(56, 189, 248, 0.6)',
            '0 0 5px rgba(56, 189, 248, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, delay }}
        className="w-3 h-3 rounded-full bg-cyan-400 relative"
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

// Holographic Overlay Component
function HolographicOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scan lines */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(56, 189, 248, 0.1) 2px, rgba(56, 189, 248, 0.1) 4px)',
        }}
      />

      {/* Horizontal scan line */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      />

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400/30 rounded-br-lg" />

      {/* Data nodes */}
      <DataNode x="15%" y="20%" delay={0} />
      <DataNode x="30%" y="35%" delay={0.5} />
      <DataNode x="50%" y="25%" delay={1} />
      <DataNode x="70%" y="40%" delay={1.5} />
      <DataNode x="85%" y="30%" delay={2} />
      <DataNode x="25%" y="60%" delay={2.5} />
      <DataNode x="60%" y="70%" delay={3} />
      <DataNode x="80%" y="55%" delay={3.5} />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep Space Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010409] via-[#030a1a] to-[#010409]" />

        {/* Campus background image */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2 }}
          src="https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Smart Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark navy overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#010409]/90 via-[#050d1f]/95 to-[#010409]/90" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#010409_80%)]" />
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary glow - top left */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%)',
          }}
        />

        {/* Secondary glow - bottom right */}
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1.1, 1, 1.1],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 70%)',
          }}
        />

        {/* Center accent glow */}
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Glowing Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <GlowingParticle
            key={i}
            delay={i * 0.3}
            size={Math.random() * 4 + 2}
            x={`${Math.random() * 100}%`}
            y={`${Math.random() * 100}%`}
            duration={Math.random() * 4 + 3}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full"
            style={{
              width: 6 + i * 2,
              height: 6 + i * 2,
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 4) * 15}%`,
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.8), transparent)'
                : 'radial-gradient(circle, rgba(37, 99, 235, 0.8), transparent)',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-32 lg:pb-40">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full mb-4 sm:mb-6 lg:mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(56, 189, 248, 0.1) 50%, rgba(37, 99, 235, 0.15) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 0 20px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Pulse indicator */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative"
              >
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 blur-sm" />
              </motion.div>

              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] sm:text-xs lg:text-sm font-semibold tracking-wider uppercase"
                style={{
                  background: 'linear-gradient(90deg, #22d3ee, #3b82f6, #22d3ee)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI Powered Smart Campus
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight sm:leading-[1.05] mb-3 sm:mb-4 lg:mb-6 tracking-[-0.02em]"
            >
              <span className="text-white">Smart Campus</span>
              <br />
              <span
                className="relative"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Digital Twin
              </span>
              {/* Animated underline - hidden on mobile */}
              <motion.div
                animate={{
                  scaleX: [0, 1, 0],
                  x: ['-50%', '0%', '50%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full hidden sm:block"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)',
                }}
              />
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base lg:text-lg text-gray-300/90 mb-3 sm:mb-4 max-w-md lg:max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Experience the future of smart campus management with AI-powered maintenance,
              interactive digital mapping, real-time monitoring, predictive maintenance,
              and intelligent analytics.
            </motion.p>

            {/* Institution Credit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6 sm:mb-8 lg:mb-10"
            >
              <div className="h-[1px] w-8 sm:w-10 lg:w-16 bg-gradient-to-r from-blue-500/60 to-cyan-400/60" />
              <span className="text-[10px] sm:text-xs lg:text-sm text-gray-400/80 font-medium tracking-wide">
                Developed for Dadi Institute of Engineering And Technology
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {/* Primary Button */}
              <motion.a
                href="#campus"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 sm:px-7 lg:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base overflow-hidden inline-flex items-center justify-center gap-2 sm:gap-2.5"
              >
                {/* Background */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />

                {/* Glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 blur-xl opacity-50"
                />

                {/* Border */}
                <div className="absolute inset-0 rounded-xl border border-white/10" />

                {/* Shimmer effect */}
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                <MapPin className="w-4 h-4 sm:w-4 sm:h-5 relative z-10" />
                <span className="relative z-10 text-white">Explore Campus</span>
              </motion.a>

              {/* Secondary Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 sm:px-7 lg:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base overflow-hidden inline-flex items-center justify-center gap-2 sm:gap-2.5"
              >
                {/* Background */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  }}
                />

                {/* Border */}
                <div
                  className="absolute inset-0 rounded-xl transition-colors duration-300"
                  style={{
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                />

                {/* Hover border glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -inset-px rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.4), rgba(37, 99, 235, 0.4))',
                    filter: 'blur(4px)',
                  }}
                />

                {/* Inner glow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  className="absolute inset-0 rounded-xl bg-cyan-400 transition-opacity duration-300"
                />

                <AlertCircle className="w-4 h-4 sm:w-4 sm:h-5 relative z-10 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
                  Report an Issue
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Holographic Campus Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative order-1 lg:order-2"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Outer glow */}
              <div className="absolute -inset-3 sm:-inset-4 lg:-inset-6 rounded-2xl sm:rounded-3xl blur-2xl opacity-60" style={{
                background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.3) 0%, rgba(56, 189, 248, 0.2) 30%, transparent 70%)',
              }} />

              {/* Main Card */}
              <div
                className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden backdrop-blur-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  boxShadow: '0 0 60px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Inner border glow */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(56, 189, 248, 0.1)',
                  }}
                />

                {/* Holographic Campus Image */}
                <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden">
                  {/* Base campus image */}
                  <img
                    src="https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Digital Twin Campus Visualization"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />

                  {/* Holographic overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(3, 10, 26, 0.3) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(3, 10, 26, 0.5) 100%)',
                    }}
                  />

                  {/* Blue holographic tint */}
                  <motion.div
                    animate={{ opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/20"
                  />

                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px),
                        linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px sm:40px sm:40px',
                    }}
                  />

                  {/* Holographic elements - Hidden on very small screens */}
                  <div className="hidden sm:block">
                    <HolographicOverlay />
                  </div>

                  {/* Status indicators */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-5 lg:left-5 flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-cyan-400/30"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400"
                    />
                    <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-wider">LIVE DATA</span>
                  </motion.div>

                  {/* WiFi indicator */}
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-5 lg:right-5"
                  >
                    <div className="p-1.5 sm:p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-cyan-400/30">
                      <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                    </div>
                  </motion.div>

                  {/* Radar sweep effect - Hidden on mobile */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 hidden sm:block"
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, rgba(56, 189, 248, 0.3) 30deg, transparent 60deg)',
                      }}
                    />
                  </motion.div>

                  {/* Activity indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-5 lg:right-5 flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-cyan-400/30"
                  >
                    <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
                    <span className="text-[10px] sm:text-xs font-mono text-cyan-400">94% HEALTH</span>
                  </motion.div>
                </div>

                {/* Stats Section */}
                <div className="p-3 sm:p-4 lg:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {stats.map((stat, index) => (
                      <StatCard key={stat.label} {...stat} index={index} />
                    ))}
                  </div>
                </div>

                {/* Bottom neon line */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleX: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-0 left-8 right-8 sm:left-10 sm:right-10 h-[2px] rounded-full hidden sm:block"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)',
                  }}
                />
              </div>

              {/* Floating action badges - Hidden on mobile */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 hidden sm:block"
              >
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-emerald-400/30 blur-md -z-10" />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 hidden sm:block"
              >
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-cyan-400/30 blur-md -z-10" />
                </div>
              </motion.div>
            </motion.div>

            {/* Ambient background glow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -inset-8 sm:-inset-12 lg:-inset-16 rounded-2xl sm:rounded-3xl blur-3xl -z-30"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.2) 0%, rgba(56, 189, 248, 0.1) 40%, transparent 70%)',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 sm:gap-3"
        >
          <span className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500/80 font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div
            className="w-5 h-7 sm:w-5 sm:h-8 lg:w-6 lg:h-10 rounded-full flex items-start justify-center p-1 sm:p-1.5"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 sm:h-2 lg:h-2.5 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #22d3ee, #3b82f6)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
