import { motion } from 'framer-motion';
import { Building2, Cpu, AlertTriangle, Gauge, Box, Sparkles, MapPin, AlertCircle } from 'lucide-react';
import StatCard from './ui/StatCard';

const stats = [
  { icon: Building2, value: '45+', label: 'Buildings' },
  { icon: Cpu, value: '2.5K', label: 'IoT Devices' },
  { icon: AlertTriangle, value: '12', label: 'Active Alerts' },
  { icon: Gauge, value: '94%', label: 'Health Score' },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Dark blue gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#050B1A] to-[#0a1628]" />

        {/* High-quality campus background image */}
        <img
          src="https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Smart University Campus"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        {/* Dark blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1A]/90 via-[#051530]/80 to-[#050B1A]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051530] via-transparent to-[#051530]" />
      </div>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-secondary/25 to-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent/15 to-primary/20 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute w-2 h-2 rounded-full bg-secondary/50"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* AI Powered Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 border border-primary/30"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400"
              />
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary tracking-wide">AI POWERED SMART CAMPUS</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Smart Campus</span>
              <br />
              <span className="gradient-text">Digital Twin</span>
            </motion.h1>

            {/* Subtitle/Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-gray-300 mb-4 max-w-xl leading-relaxed"
            >
              Experience the future of smart campus management with AI-powered maintenance,
              interactive digital mapping, real-time monitoring, predictive maintenance,
              and intelligent analytics.
            </motion.p>

            {/* Institution Credit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2 mb-8 text-gray-400"
            >
              <div className="w-8 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full" />
              <span className="text-sm font-medium">Developed for Dadi Institute of Engineering And Technology</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#campus"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full text-white font-semibold flex items-center gap-3 overflow-hidden"
              >
                {/* Glowing effect behind button */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10 bg-gradient-to-r from-primary to-secondary" />

                <MapPin className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Explore Campus</span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full text-white font-semibold flex items-center gap-3 overflow-hidden"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/50 group-hover:border-secondary transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm bg-primary/20" />
                <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-lg bg-gradient-to-r from-primary to-secondary" />

                <AlertCircle className="w-5 h-5 relative z-10 text-secondary group-hover:text-white transition-colors" />
                <span className="relative z-10">Report an Issue</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Floating animation for main card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="glass-card rounded-3xl p-6 sm:p-8 neon-border hologram-border">
                  {/* Rotating circles with 3D box */}
                  <div className="relative aspect-square flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-4 sm:inset-8 rounded-full border border-secondary/25"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-8 sm:inset-16 rounded-full border border-accent/20"
                    />

                    {/* Center 3D Box */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotateY: [0, 10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/25 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg shadow-primary/20"
                    >
                      <Box className="w-14 h-14 sm:w-16 sm:h-16 text-secondary" />
                    </motion.div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <StatCard {...stat} index={index} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Glowing aura behind card */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/30 rounded-3xl blur-2xl -z-10"
              />

              {/* Additional glow effect */}
              <motion.div
                animate={{
                  scale: [1.05, 1.15, 1.05],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -inset-8 sm:-inset-12 bg-gradient-to-br from-primary/20 to-secondary/15 rounded-3xl blur-3xl -z-20"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-gradient-to-b from-secondary to-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
