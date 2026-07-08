import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  BookOpen,
  Cpu,
  Radio,
  Wrench,
  HardHat,
  Coffee,
  Search,
  X,
  Activity,
  Thermometer,
  Zap,
  Droplets,
  Calendar,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Shield,
  MapPin,
} from 'lucide-react';

// Building data
const buildingsData = [
  {
    id: 1,
    icon: Building2,
    name: 'Administration Block',
    status: 'Good' as const,
    healthScore: 96,
    lastInspection: '2026-07-01',
    devices: 234,
    issues: [],
    recommendation: 'All systems operating optimally. Continue regular maintenance schedule.',
    sensors: { temperature: 22, humidity: 45, energy: 85, air: 'Good' },
    maintenanceCost: '$0',
    image: 'https://images.pexels.com/photos/1486320/pexels-photo-1486320.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    icon: BookOpen,
    name: 'Library',
    status: 'Good' as const,
    healthScore: 92,
    lastInspection: '2026-06-28',
    devices: 89,
    issues: [],
    recommendation: 'HVAC efficiency at 92%. Minor optimization recommended for energy savings.',
    sensors: { temperature: 21, humidity: 40, energy: 78, air: 'Good' },
    maintenanceCost: '$0',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    icon: Cpu,
    name: 'CSE Block',
    status: 'Warning' as const,
    healthScore: 78,
    lastInspection: '2026-06-25',
    devices: 312,
    issues: ['Server room cooling efficiency reduced', 'Network latency detected in Lab 3'],
    recommendation: 'Schedule AC maintenance for server room within 7 days. Network switch replacement recommended.',
    sensors: { temperature: 28, humidity: 55, energy: 92, air: 'Moderate' },
    maintenanceCost: '$2,500',
    image: 'https://images.pexels.com/photos/1593068/pexels-photo-1593068.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    icon: Radio,
    name: 'ECE Block',
    status: 'Good' as const,
    healthScore: 89,
    lastInspection: '2026-06-27',
    devices: 178,
    issues: [],
    recommendation: 'Optical fiber upgrade completed. System running efficiently.',
    sensors: { temperature: 23, humidity: 42, energy: 76, air: 'Good' },
    maintenanceCost: '$0',
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    icon: Wrench,
    name: 'Mechanical Block',
    status: 'Critical' as const,
    healthScore: 45,
    lastInspection: '2026-06-15',
    devices: 156,
    issues: ['Heavy machinery vibration detected', 'Hydraulic leak in Workshop B', 'Safety sensor malfunction'],
    recommendation: 'URGENT: Immediate shutdown and inspection required. Estimated 3-5 days for repairs.',
    sensors: { temperature: 32, humidity: 65, energy: 145, air: 'Poor' },
    maintenanceCost: '$12,800',
    image: 'https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    icon: HardHat,
    name: 'Civil Block',
    status: 'Good' as const,
    healthScore: 88,
    lastInspection: '2026-06-30',
    devices: 98,
    issues: [],
    recommendation: 'Structural integrity verified. All safety protocols active.',
    sensors: { temperature: 24, humidity: 48, energy: 65, air: 'Good' },
    maintenanceCost: '$0',
    image: 'https://images.pexels.com/photos/221902/pexels-photo-221902.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 7,
    icon: Coffee,
    name: 'Cafeteria',
    status: 'Warning' as const,
    healthScore: 72,
    lastInspection: '2026-06-22',
    devices: 45,
    issues: ['Refrigeration unit showing degraded performance', 'Fire suppression system inspection due'],
    recommendation: 'Schedule refrigeration maintenance within 14 days. Fire safety inspection required.',
    sensors: { temperature: 26, humidity: 58, energy: 88, air: 'Moderate' },
    maintenanceCost: '$4,200',
    image: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 8,
    icon: Building2,
    name: 'Sports Complex',
    status: 'Good' as const,
    healthScore: 94,
    lastInspection: '2026-07-02',
    devices: 67,
    issues: [],
    recommendation: 'Excellent condition. Gym equipment maintenance scheduled for next week.',
    sensors: { temperature: 22, humidity: 38, energy: 55, air: 'Good' },
    maintenanceCost: '$0',
    image: 'https://images.pexels.com/photos/260424/pexels-photo-260424.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

type Status = 'Good' | 'Warning' | 'Critical';

const statusStyles = {
  Good: {
    bg: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30 hover:border-emerald-400/50',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle,
  },
  Warning: {
    bg: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/30 hover:border-amber-400/50',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    icon: AlertTriangle,
  },
  Critical: {
    bg: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/30 hover:border-red-400/50',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: AlertCircle,
  },
};

interface Building {
  id: number;
  icon: typeof Building2;
  name: string;
  status: Status;
  healthScore: number;
  lastInspection: string;
  devices: number;
  issues: string[];
  recommendation: string;
  sensors: {
    temperature: number;
    humidity: number;
    energy: number;
    air: string;
  };
  maintenanceCost: string;
  image: string;
}

// Building Card Component
function BuildingCard({
  building,
  onClick,
}: {
  building: Building;
  onClick: () => void;
}) {
  const styles = statusStyles[building.status];
  const StatusIcon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 cursor-pointer backdrop-blur-xl border transition-all duration-300 bg-gradient-to-br ${styles.bg} ${styles.border}`}
      style={{
        boxShadow:
          building.status === 'Critical'
            ? '0 0 30px rgba(239, 68, 68, 0.1)'
            : building.status === 'Warning'
            ? '0 0 30px rgba(245, 158, 11, 0.1)'
            : '0 0 30px rgba(16, 185, 129, 0.1)',
      }}
    >
      {/* Animated border glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${
            building.status === 'Critical'
              ? 'rgba(239, 68, 68, 0.3)'
              : building.status === 'Warning'
              ? 'rgba(245, 158, 11, 0.3)'
              : 'rgba(16, 185, 129, 0.3)'
          } 0%, transparent 50%)`,
        }}
      />

      {/* Corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-300" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 ${styles.bg}`}
          >
            <building.icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${styles.text}`} />
          </div>
          <span
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 rounded-full text-[10px] sm:text-xs font-semibold border backdrop-blur-sm ${styles.badge}`}
          >
            {building.status}
          </span>
        </div>

        {/* Building Name */}
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 truncate">{building.name}</h3>

        {/* Health Score */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${building.healthScore}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-full rounded-full ${
                building.status === 'Critical'
                  ? 'bg-gradient-to-r from-red-500 to-red-400'
                  : building.status === 'Warning'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-400'
              }`}
            />
          </div>
          <span className={`text-xs sm:text-sm font-bold ${styles.text}`}>{building.healthScore}%</span>
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{building.devices} devices</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{new Date(building.lastInspection).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Issues indicator */}
        {building.issues.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10"
          >
            <StatusIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${styles.text}`} />
            <span className="text-[10px] sm:text-xs text-gray-400">{building.issues.length} issue(s) detected</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Building Modal Component
function BuildingModal({
  building,
  onClose,
}: {
  building: Building;
  onClose: () => void;
}) {
  const styles = statusStyles[building.status];
  const StatusIcon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          boxShadow: '0 0 60px rgba(37, 99, 235, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>

        {/* Image Header */}
        <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-3xl">
          <img
            src={building.image}
            alt={building.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030810] via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm border ${styles.border}`}
              style={{ background: 'rgba(0,0,0,0.4)' }}
            >
              <building.icon className={`w-7 h-7 ${styles.text}`} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{building.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${styles.badge}`}
              >
                {building.status} Status
              </span>
            </div>
          </div>

          {/* Health Score Circle */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="absolute bottom-4 right-4 w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: `3px solid ${
                building.status === 'Critical'
                  ? '#ef4444'
                  : building.status === 'Warning'
                  ? '#f59e0b'
                  : '#10b981'
              }`,
            }}
          >
            <div className="text-center">
              <div className={`text-2xl font-bold ${styles.text}`}>{building.healthScore}</div>
              <div className="text-[10px] text-gray-400 uppercase">Health</div>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-4 bg-white/5 border border-white/10"
            >
              <Thermometer className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-xl font-bold text-white">{building.sensors.temperature}°C</div>
              <div className="text-xs text-gray-400">Temperature</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl p-4 bg-white/5 border border-white/10"
            >
              <Droplets className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-xl font-bold text-white">{building.sensors.humidity}%</div>
              <div className="text-xs text-gray-400">Humidity</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-4 bg-white/5 border border-white/10"
            >
              <Zap className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xl font-bold text-white">{building.sensors.energy}kWh</div>
              <div className="text-xs text-gray-400">Energy</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-xl p-4 bg-white/5 border border-white/10"
            >
              <Shield className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-xl font-bold text-white">{building.sensors.air}</div>
              <div className="text-xs text-gray-400">Air Quality</div>
            </motion.div>
          </div>

          {/* Issues Section */}
          {building.issues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <AlertCircle className={`w-5 h-5 ${styles.text}`} />
                Current Issues
              </h3>
              <div className="space-y-2">
                {building.issues.map((issue, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + idx * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${styles.border} bg-gradient-to-r ${styles.bg}`}
                  >
                    <StatusIcon className={`w-5 h-5 shrink-0 ${styles.text}`} />
                    <span className="text-sm text-gray-300">{issue}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
          >
            <h3 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              AI RECOMMENDATION
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">{building.recommendation}</p>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-4 pt-4 border-t border-white/10"
          >
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Last Inspection: {new Date(building.lastInspection).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <DollarSign className="w-4 h-4 text-red-400" />
              <span>Est. Cost: {building.maintenanceCost}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Activity className="w-4 h-4" />
              <span>{building.devices} IoT Devices</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CampusMap() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Status | 'All'>('All');
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  // Filtered buildings
  const filteredBuildings = useMemo(() => {
    return buildingsData.filter((building) => {
      const matchesSearch = building.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || building.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const filterButtons: { label: string; value: Status | 'All'; count: number }[] = [
    { label: 'All', value: 'All', count: buildingsData.length },
    {
      label: 'Good',
      value: 'Good',
      count: buildingsData.filter((b) => b.status === 'Good').length,
    },
    {
      label: 'Warning',
      value: 'Warning',
      count: buildingsData.filter((b) => b.status === 'Warning').length,
    },
    {
      label: 'Critical',
      value: 'Critical',
      count: buildingsData.filter((b) => b.status === 'Critical').length,
    },
  ];

  return (
    <section id="campus-map" className="relative py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full blur-[60px] sm:blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 lg:mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(56, 189, 248, 0.1) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
            }}
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-medium text-cyan-400">Live Campus Map</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            Interactive Smart Campus Map
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl lg:max-w-2xl mx-auto px-4">
            Click any building to monitor its live maintenance status and AI recommendations.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10"
        >
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search buildings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 lg:py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {filterButtons.map((btn) => (
              <motion.button
                key={btn.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(btn.value)}
                className={`relative px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  filter === btn.value
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                }`}
              >
                <span className="relative z-10">{btn.label}</span>
                <span
                  className={`ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs ${
                    filter === btn.value ? 'bg-white/20' : 'bg-white/10'
                  }`}
                >
                  {btn.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Building Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredBuildings.map((building) => (
              <BuildingCard
                key={building.id}
                building={building}
                onClick={() => setSelectedBuilding(building)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBuildings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-sm sm:text-base text-gray-400">No buildings found matching your criteria.</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedBuilding && (
          <BuildingModal building={selectedBuilding} onClose={() => setSelectedBuilding(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
