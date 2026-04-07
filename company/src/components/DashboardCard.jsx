/**
 * Dashboard Stats Card Component - Premium Animated
 * Displays a single statistic with Lucide icons
 */

import { motion } from 'framer-motion';
import { Bus, BarChart3, CheckCircle, Clock, FileText } from 'lucide-react';
import '../styles/DashboardCard.css';

const DashboardCard = ({ title, value, icon, color = 'blue' }) => {
  const getIconComponent = (icon) => {
    switch(icon) {
      case 'bus':
      case '🚌':
        return <Bus size={32} strokeWidth={2} />;
      case 'road':
      case '🛣️':
        return <BarChart3 size={32} strokeWidth={2} />;
      case 'check':
      case '✅':
        return <CheckCircle size={32} strokeWidth={2} />;
      case 'clock':
      case '⏳':
        return <Clock size={32} strokeWidth={2} />;
      case 'file':
      case '📄':
        return <FileText size={32} strokeWidth={2} />;
      default:
        return <span>{icon}</span>;
    }
  };

  return (
    <motion.div
      className={`dashboard-card ${color}`}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(29, 155, 240, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="card-icon"
        whileHover={{ scale: 1.15, rotate: 8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {getIconComponent(icon)}
      </motion.div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
