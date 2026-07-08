import { motion } from 'framer-motion';
import { Box, Bot, Wrench, LineChart, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Box,
    title: 'Digital Twin',
    description: 'Real-time 3D visualization of campus infrastructure with live sensor data integration and spatial analytics.',
    color: '#2563EB',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Intelligent chatbot powered by machine learning for instant maintenance support and query resolution.',
    color: '#38BDF8',
  },
  {
    icon: Wrench,
    title: 'Smart Maintenance',
    description: 'Predictive maintenance system that anticipates equipment failures and schedules proactive repairs.',
    color: '#06B6D4',
  },
  {
    icon: LineChart,
    title: 'Analytics Dashboard',
    description: 'Comprehensive reports and insights with real-time metrics, trends, and performance indicators.',
    color: '#8B5CF6',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full glass-card text-secondary text-xs sm:text-sm font-medium mb-3 sm:mb-4"
          >
            Core Features
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4">
            Intelligent Campus{' '}
            <span className="gradient-text">Management Suite</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl lg:max-w-2xl mx-auto px-4">
            Transform your campus operations with cutting-edge technology that connects,
            monitors, and optimizes every aspect of your infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 cursor-pointer relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 rounded-xl sm:rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}10 0%, transparent 100%)`,
                }}
              />

              <div
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                  border: `1px solid ${feature.color}30`,
                }}
              >
                <feature.icon
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-colors"
                  style={{ color: feature.color }}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 relative">{feature.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 relative">
                {feature.description}
              </p>

              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium relative"
                style={{ color: feature.color }}
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl sm:rounded-b-2xl origin-left"
                style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
