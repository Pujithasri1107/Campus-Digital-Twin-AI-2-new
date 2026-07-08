import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Sparkles,
  MessageCircle,
  ClipboardList,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

interface Suggestion {
  label: string;
  icon: LucideIcon;
}

const suggestions: Suggestion[] = [
  { label: 'Report Water Leakage', icon: Zap },
  { label: 'Find CSE Lab', icon: Target },
  { label: 'Hostel Maintenance', icon: ShieldCheck },
  { label: 'Internet Issue', icon: Sparkles },
  { label: 'Electricity Complaint', icon: Zap },
  { label: 'Bus Timing', icon: Clock },
];

interface Message {
  role: 'assistant' | 'user';
  content: string;
  highlight?: string;
}

const conversation: Message[] = [
  {
    role: 'assistant',
    content:
      "Hello! I am your Smart Campus AI Assistant. How can I help you today?",
  },
  {
    role: 'user',
    content: 'There is no electricity in the CSE Block.',
  },
  {
    role: 'assistant',
    content:
      'Your maintenance request has been registered successfully. Priority: High. Estimated Response Time: 20 minutes.',
    highlight: 'High Priority Ticket',
  },
];

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  gradient: string;
  border: string;
  glow: string;
  iconColor: string;
  ring: string;
}

const stats: Stat[] = [
  {
    icon: ClipboardList,
    value: '24',
    label: 'Open Tickets',
    gradient: 'from-blue-600/25 via-blue-500/10 to-transparent',
    border: 'border-blue-500/40',
    glow: '#3b82f6',
    iconColor: 'text-blue-400',
    ring: 'from-blue-500 to-blue-400',
  },
  {
    icon: CheckCircle2,
    value: '18',
    label: 'Resolved Today',
    gradient: 'from-emerald-500/25 via-emerald-400/10 to-transparent',
    border: 'border-emerald-400/40',
    glow: '#10b981',
    iconColor: 'text-emerald-400',
    ring: 'from-emerald-500 to-emerald-400',
  },
  {
    icon: Clock,
    value: '12 min',
    label: 'Average Response Time',
    gradient: 'from-cyan-500/25 via-cyan-400/10 to-transparent',
    border: 'border-cyan-400/40',
    glow: '#22d3ee',
    iconColor: 'text-cyan-400',
    ring: 'from-cyan-500 to-cyan-400',
  },
  {
    icon: Target,
    value: '97.8%',
    label: 'AI Accuracy',
    gradient: 'from-violet-500/20 via-indigo-400/10 to-transparent',
    border: 'border-indigo-400/40',
    glow: '#818cf8',
    iconColor: 'text-indigo-300',
    ring: 'from-indigo-500 to-indigo-400',
  },
];

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1800);
      setMessage('');
    }
  };

  return (
    <section id="assistant" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-secondary text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            AI Powered
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            AI <span className="gradient-text">Maintenance Assistant</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Get instant AI-powered assistance for campus maintenance,
            facilities, classrooms, laboratories, hostels, and campus services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT COLUMN — Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-3xl overflow-hidden neon-border">
              {/* Header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-white/10">
                {/* Circular AI avatar with glowing blue ring */}
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-secondary blur-md"
                  />
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">
                    Smart Campus AI Assistant
                  </h3>
                  <span className="inline-flex items-center gap-1.5 mt-1 text-xs font-medium text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <motion.span
                        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                      />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    AI Online
                  </span>
                </div>
              </div>

              {/* Chat body */}
              <div className="p-6 space-y-4 max-h-[22rem] overflow-y-auto">
                <AnimatePresence>
                  {conversation.map((chat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.25, duration: 0.4 }}
                      className={`flex gap-3 ${chat.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          chat.role === 'user'
                            ? 'bg-secondary/20'
                            : 'bg-gradient-to-br from-primary to-secondary'
                        }`}
                      >
                        {chat.role === 'user' ? (
                          <MessageCircle className="w-4 h-4 text-secondary" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`glass-card rounded-2xl px-4 py-3 max-w-md ${
                          chat.role === 'user' ? 'bg-primary/20' : ''
                        }`}
                      >
                        {chat.highlight && (
                          <span className="inline-flex items-center gap-1 mb-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
                            <Zap className="w-3 h-3" />
                            {chat.highlight}
                          </span>
                        )}
                        <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                          {chat.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="glass-card rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                            className="w-2 h-2 rounded-full bg-secondary"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Suggested chips */}
              <div className="px-6 pb-4">
                <p className="text-xs text-gray-500 mb-2.5 uppercase tracking-wider">
                  Suggested Questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setMessage(s.label);
                        setIsTyping(true);
                        setTimeout(() => setIsTyping(false), 1800);
                      }}
                      className="inline-flex items-center gap-1.5 glass-card rounded-full px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:border-primary/50 transition-colors"
                    >
                      <s.icon className="w-3.5 h-3.5 text-secondary" />
                      {s.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-white/10 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about campus maintenance..."
                    className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="px-4 py-3 rounded-xl btn-primary flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Animated stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 content-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                animate={{ y: [0, -8, 0] }}
                whileHover={{ scale: 1.05, y: -6 }}
                className="relative group"
              >
                {/* Glow halo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.6 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.glow}30, transparent 70%)`,
                  }}
                />

                {/* Card */}
                <div
                  className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 backdrop-blur-xl border ${stat.border} bg-gradient-to-br ${stat.gradient} transition-all duration-500 group-hover:border-white/30 h-full`}
                  style={{ boxShadow: `0 0 30px ${stat.glow}20` }}
                >
                  {/* Sweeping shine */}
                  <motion.div
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{
                      duration: 2 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, transparent 40%, ${stat.glow}20 50%, transparent 60%)`,
                      backgroundSize: '200% 200%',
                    }}
                  />
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-500" />

                  {/* Icon with glowing ring */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        `0 0 0px ${stat.glow}00`,
                        `0 0 18px ${stat.glow}55`,
                        `0 0 0px ${stat.glow}00`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${stat.ring} flex items-center justify-center mb-4`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Value + label */}
                  <div className="relative">
                    <motion.p
                      initial={{ opacity: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
                      {stat.label}
                    </p>
                  </div>

                  {/* Dot pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                      backgroundSize: '8px 8px',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
