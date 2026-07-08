import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  RotateCcw,
  CheckCircle2,
  Navigation,
  User,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  lines: string[];
  color: string;
  bg: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    label: 'Address',
    lines: [
      'Dadi Institute of Engineering and Technology',
      'Anakapalle, Andhra Pradesh – 531002',
      'India',
    ],
    color: 'text-primary',
    bg: 'bg-primary/20',
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: ['+91 891 000 0000'],
    color: 'text-secondary',
    bg: 'bg-secondary/20',
  },
  {
    icon: Mail,
    label: 'Email',
    lines: ['info@diet.edu.in'],
    color: 'text-accent',
    bg: 'bg-accent/20',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    lines: ['Monday – Saturday', '9:00 AM – 5:00 PM'],
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
  },
];

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

interface FieldDef {
  name: keyof typeof emptyForm;
  label: string;
  type: string;
  placeholder: string;
  icon: LucideIcon;
  full?: boolean;
  textarea?: boolean;
}

const fields: FieldDef[] = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: User },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', icon: Mail },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', icon: Phone },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?', icon: MessageSquare, full: true },
  { name: 'message', label: 'Message', type: 'text', placeholder: 'Your message...', icon: MessageSquare, full: true, textarea: true },
];

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Dadi+Institute+of+Engineering+and+Technology+Anakapalle+Andhra+Pradesh';

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData(emptyForm);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleReset = () => {
    setFormData(emptyForm);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-secondary/8 rounded-full blur-3xl" />
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 glass-card rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 neon-border flex items-center gap-2 sm:gap-3 max-w-[90vw] sm:max-w-none"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </motion.div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">Message sent successfully!</p>
              <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">Our team will get back to you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Get in Touch
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl lg:max-w-2xl mx-auto px-4">
            Have questions or need assistance? Reach out to our Smart Campus team.
          </p>
        </motion.div>

        {/* Contact info cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-primary/30 to-secondary/30" />
              <div className="relative glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 sm:p-6 h-full">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl ${info.bg} flex items-center justify-center mb-2 sm:mb-3 lg:mb-4`}>
                  <info.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${info.color}`} />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm lg:text-base mb-1 sm:mb-2">{info.label}</h3>
                <div className="space-y-0.5">
                  {info.lines.map((line) => (
                    <p key={line} className="text-[10px] sm:text-xs lg:text-sm text-gray-400 leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form + Location */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 neon-border"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                {fields.slice(0, 3).map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                ))}
              </div>
              {fields.slice(3).map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}

              <div className="flex flex-col sm:flex-row gap-3 pt-1 sm:pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 sm:py-3.5 rounded-lg sm:rounded-xl btn-primary text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send Message
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 sm:flex-none sm:px-6 lg:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl btn-outline text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  Reset
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Campus location card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-white text-sm sm:text-base">Campus Location</h3>
            </div>

            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 h-32 sm:h-36 lg:h-44 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '12px 12px sm:16px sm:16px',
                }}
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex flex-col items-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-2 sm:-inset-3 rounded-full bg-secondary/40 blur-md"
                  />
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-0.5 sm:space-y-1 mb-4 sm:mb-5">
              <p className="text-xs sm:text-sm font-medium text-white">Dadi Institute of Engineering and Technology</p>
              <p className="text-xs sm:text-sm text-gray-400">Anakapalle</p>
              <p className="text-xs sm:text-sm text-gray-400">Andhra Pradesh, India</p>
            </div>

            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-auto w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl btn-primary text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
              View on Google Maps
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  field: FieldDef;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function FormField({ field, value, onChange }: FormFieldProps) {
  return (
    <div className={field.full ? '' : ''}>
      <label className="block text-sm text-gray-400 mb-2">{field.label}</label>
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 group-focus-within:text-secondary">
          <field.icon className="w-4 h-4 text-gray-500 group-focus-within:text-secondary" />
        </div>
        {field.textarea ? (
          <textarea
            name={field.name}
            value={value}
            onChange={onChange}
            rows={4}
            required
            className="w-full bg-white/5 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-gray-500 border border-white/10 focus:border-secondary/60 focus:outline-none focus:bg-white/8 transition-all duration-300 resize-none focus:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={onChange}
            required
            className="w-full bg-white/5 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-gray-500 border border-white/10 focus:border-secondary/60 focus:outline-none focus:bg-white/8 transition-all duration-300 focus:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
            placeholder={field.placeholder}
          />
        )}
      </div>
    </div>
  );
}
