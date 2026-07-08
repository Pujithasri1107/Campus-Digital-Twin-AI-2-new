import { motion } from 'framer-motion';
import {
  Building2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Campus Map', href: '#campus' },
  { name: 'AI Assistant', href: '#assistant' },
  { name: 'Maintenance', href: '#maintenance' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Contact', href: '#contact' },
];

const technologies = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'];

const socialLinks: { icon: LucideIcon; href: string; label: string }[] = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:info@diet.edu.in', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
                <Building2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">Campus Digital Twin</h3>
                <p className="text-[10px] sm:text-xs text-gray-400">AI Assistant</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3 sm:mb-4 lg:mb-5 hidden sm:block">
              AI-powered Smart Campus Monitoring and Maintenance Platform.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg glass-card flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-3 sm:mb-4 lg:mb-5 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-2.5 lg:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-secondary transition-colors flex items-center gap-1.5 sm:gap-2 group"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary transition-all duration-300 group-hover:w-2 sm:group-hover:w-3" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-3 sm:mb-4 lg:mb-5 text-sm sm:text-base">Technologies Used</h4>
            <ul className="space-y-2 sm:space-y-2.5 lg:space-y-3">
              {technologies.map((tech) => (
                <li key={tech}>
                  <span className="text-xs sm:text-sm text-gray-400 flex items-center gap-1.5 sm:gap-2">
                    <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary shrink-0" />
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2 lg:col-span-1"
          >
            <h4 className="text-white font-semibold mb-3 sm:mb-4 lg:mb-5 text-sm sm:text-base">Contact Info</h4>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Dadi Institute of Engineering and Technology<br />
                  Anakapalle, Andhra Pradesh – 531002
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-primary shrink-0" />
                <span className="text-xs sm:text-sm text-gray-400">+91 891 000 0000</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-primary shrink-0" />
                <a href="mailto:info@diet.edu.in" className="text-xs sm:text-sm text-gray-400 hover:text-secondary transition-colors">
                  info@diet.edu.in
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 sm:mb-8" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-3 sm:gap-4 text-center"
        >
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            &copy; 2026 Campus Digital Twin AI Assistant.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Developed for Dadi Institute of Engineering and Technology.
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <span>Powered by</span>
            <span className="text-secondary font-medium">AI Smart Campus</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
