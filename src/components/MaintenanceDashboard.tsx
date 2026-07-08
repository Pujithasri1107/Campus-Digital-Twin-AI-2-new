import { motion } from 'framer-motion';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Wifi,
  Droplets,
  HardHat,
  Video,
  Plug,
  CalendarClock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SummaryCard {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
  gradient: string;
  border: string;
}

const summaryCards: SummaryCard[] = [
  {
    icon: ClipboardList,
    value: '156',
    label: 'Total Issues',
    color: '#2563EB',
    gradient: 'from-blue-600/25 via-blue-500/10 to-transparent',
    border: 'border-blue-500/40',
  },
  {
    icon: Clock,
    value: '18',
    label: 'Pending Issues',
    color: '#F59E0B',
    gradient: 'from-yellow-500/25 via-amber-500/10 to-transparent',
    border: 'border-yellow-500/40',
  },
  {
    icon: CheckCircle2,
    value: '42',
    label: 'Completed Today',
    color: '#10B981',
    gradient: 'from-emerald-500/25 via-green-500/10 to-transparent',
    border: 'border-emerald-500/40',
  },
  {
    icon: AlertTriangle,
    value: '3',
    label: 'Critical Alerts',
    color: '#EF4444',
    gradient: 'from-red-500/25 via-rose-500/10 to-transparent',
    border: 'border-red-500/40',
  },
];

type Priority = 'High' | 'Medium' | 'Low' | 'Critical';
type Status = 'In Progress' | 'Pending' | 'Completed' | 'Critical';

interface MaintenanceRequest {
  id: string;
  location: string;
  issue: string;
  priority: Priority;
  status: Status;
}

const requests: MaintenanceRequest[] = [
  { id: 'MT-101', location: 'CSE Block', issue: 'No Electricity', priority: 'High', status: 'In Progress' },
  { id: 'MT-102', location: 'Library', issue: 'AC Not Working', priority: 'Medium', status: 'Pending' },
  { id: 'MT-103', location: 'Mechanical Lab', issue: 'Water Leakage', priority: 'High', status: 'Completed' },
  { id: 'MT-104', location: 'Hostel Block A', issue: 'Wi-Fi Issue', priority: 'Low', status: 'Pending' },
  { id: 'MT-105', location: 'Main Gate', issue: 'CCTV Camera Offline', priority: 'Critical', status: 'In Progress' },
];

const priorityStyles: Record<Priority, string> = {
  High: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Low: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  Critical: 'bg-red-500/15 text-red-300 border-red-500/30',
};

const statusStyles: Record<Status, string> = {
  Completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Pending: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
  'In Progress': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  Critical: 'bg-red-500/15 text-red-300 border-red-500/30',
};

const progressBars = [
  { label: 'Electrical Repairs', percent: 82, color: '#2563EB' },
  { label: 'Network Issues', percent: 68, color: '#38BDF8' },
  { label: 'Civil Works', percent: 55, color: '#06B6D4' },
  { label: 'Plumbing', percent: 91, color: '#10B981' },
];

const scheduleItems = [
  { time: '08:30 AM', task: 'Electrical inspection', location: 'CSE Block', icon: Plug },
  { time: '10:00 AM', task: 'Network maintenance', location: 'Computer Lab', icon: Wifi },
  { time: '01:30 PM', task: 'Water pipeline repair', location: 'Hostel Block', icon: Droplets },
  { time: '03:00 PM', task: 'CCTV inspection', location: 'Main Gate', icon: Video },
  { time: '05:00 PM', task: 'Generator inspection', location: 'Power Room', icon: Zap },
];

export default function MaintenanceDashboard() {
  return (
    <section id="maintenance" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full glass-card text-secondary text-xs sm:text-sm font-medium mb-3 sm:mb-4"
          >
            <HardHat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            DIET Anakapalli · Live Operations
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4">
            Campus Maintenance <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl lg:max-w-2xl mx-auto px-4">
            Monitor and manage maintenance requests across the campus in real
            time.
          </p>
        </motion.div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10">
          {summaryCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative group"
            >
              {/* Gradient glow */}
              <div
                className="absolute -inset-0.5 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${card.color}40, transparent 70%)`,
                }}
              />
              <div
                className={`relative glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 xl:p-6 bg-gradient-to-br ${card.gradient} border ${card.border} transition-all duration-500 group-hover:border-white/30`}
                style={{ boxShadow: `0 0 30px ${card.color}15` }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 lg:mb-4">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-lg sm:rounded-xl flex items-center justify-center border border-white/10"
                    style={{ background: `${card.color}25` }}
                  >
                    <card.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" style={{ color: card.color }} />
                  </div>
                  <motion.p
                    initial={{ opacity: 0.8 }}
                    whileHover={{ scale: 1.08 }}
                    className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight"
                  >
                    {card.value}
                  </motion.p>
                </div>
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400 font-medium">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Maintenance Requests table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">Recent Maintenance Requests</h3>
              <p className="text-[10px] sm:text-xs text-gray-400">Latest tickets logged across campus</p>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider">
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Ticket ID</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium hidden lg:table-cell">Location</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Issue</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Priority</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, i) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ backgroundColor: 'rgba(37,99,235,0.08)' }}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-3 sm:py-4 px-2 sm:px-4 font-mono text-xs sm:text-sm text-white">{req.id}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300 hidden lg:table-cell">{req.location}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300 max-w-[150px] sm:max-w-none truncate">{req.issue}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border ${priorityStyles[req.priority]}`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border ${statusStyles[req.status]}`}>
                        {req.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden space-y-2 sm:space-y-3">
            {requests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4"
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="font-mono text-xs sm:text-sm text-white">{req.id}</span>
                  <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border ${statusStyles[req.status]}`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-1.5">{req.issue}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs text-gray-400">{req.location}</span>
                  <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border ${priorityStyles[req.priority]}`}>
                    {req.priority}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress bars + Schedule */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Animated progress bars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Maintenance Progress</h3>
                <p className="text-[10px] sm:text-xs text-gray-400">Category-wise completion</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              {progressBars.map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                    <span className="text-gray-300 text-[10px] sm:text-xs lg:text-sm">{bar.label}</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-white font-medium text-[10px] sm:text-xs lg:text-sm"
                    >
                      {bar.percent}%
                    </motion.span>
                  </div>
                  <div className="h-2 sm:h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full relative"
                      style={{
                        background: `linear-gradient(90deg, ${bar.color}, ${bar.color}cc)`,
                        boxShadow: `0 0 12px ${bar.color}80`,
                      }}
                    >
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: 1 + i * 0.15,
                        }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Today's Maintenance Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Today's Maintenance Schedule</h3>
                <p className="text-[10px] sm:text-xs text-gray-400">Planned tasks for today</p>
              </div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[14px] sm:left-[16px] lg:left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent" />

              <div className="space-y-3 sm:space-y-4">
                {scheduleItems.map((item, i) => (
                  <motion.div
                    key={item.time}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="relative flex items-start gap-2 sm:gap-3 lg:gap-4 group"
                  >
                    {/* Node */}
                    <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                      <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-secondary" />
                    </div>
                    <div className="flex-1 pt-0.5 sm:pt-1">
                      <div className="flex flex-wrap items-baseline gap-x-1 sm:gap-x-2">
                        <span className="text-xs sm:text-sm font-medium text-white">{item.time}</span>
                        <span className="text-[10px] sm:text-xs text-gray-400">· {item.location}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 mt-0.5">{item.task}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
