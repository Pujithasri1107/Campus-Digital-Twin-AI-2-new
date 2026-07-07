import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  index: number;
  color?: string;
}

const colorStyles: Record<string, { gradient: string; border: string; shadow: string; iconColor: string; glowColor: string }> = {
  blue: {
    gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
    border: 'border-blue-500/40',
    shadow: '0 0 30px rgba(59, 130, 246, 0.2)',
    iconColor: 'text-blue-400',
    glowColor: '#3b82f6',
  },
  cyan: {
    gradient: 'from-cyan-500/20 via-cyan-400/10 to-transparent',
    border: 'border-cyan-400/40',
    shadow: '0 0 30px rgba(34, 211, 238, 0.2)',
    iconColor: 'text-cyan-400',
    glowColor: '#22d3ee',
  },
  amber: {
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    border: 'border-amber-400/40',
    shadow: '0 0 30px rgba(251, 191, 36, 0.2)',
    iconColor: 'text-amber-400',
    glowColor: '#fbbf24',
  },
  emerald: {
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    border: 'border-emerald-400/40',
    shadow: '0 0 30px rgba(16, 185, 129, 0.2)',
    iconColor: 'text-emerald-400',
    glowColor: '#10b981',
  },
};

export default function StatCard({ icon: Icon, value, label, index, color = 'blue' }: StatCardProps) {
  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3 }
      }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative group"
    >
      {/* Glow effect behind card */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at center, ${styles.glowColor}30, transparent 70%)` }}
      />

      {/* Card container */}
      <div
        className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 backdrop-blur-xl border ${styles.border} bg-gradient-to-br ${styles.gradient} transition-all duration-500 group-hover:border-white/30`}
        style={{ boxShadow: styles.shadow }}
      >
        {/* Animated border glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2 + index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-xl sm:rounded-2xl"
          style={{
            background: `linear-gradient(135deg, transparent 40%, ${styles.glowColor}20 50%, transparent 60%)`,
            backgroundSize: '200% 200%',
          }}
        />

        {/* Corner shine effect */}
        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-500" />

        {/* Content */}
        <div className="relative flex items-center gap-3">
          {/* Icon container */}
          <motion.div
            animate={{
              boxShadow: [
                `0 0 0px ${styles.glowColor}00`,
                `0 0 15px ${styles.glowColor}40`,
                `0 0 0px ${styles.glowColor}00`,
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all duration-300"
          >
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${styles.iconColor}`} />
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              {value}
            </motion.p>
            <p className="text-xs sm:text-sm text-gray-400 font-medium truncate">{label}</p>
          </div>
        </div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '8px 8px',
          }}
        />
      </div>
    </motion.div>
  );
}
