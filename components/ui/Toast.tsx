import { CheckIcon, CloseIcon } from './Icons';
import { motion } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  // Menentukan warna berdasarkan tipe
  const backgroundColor =
    type === 'success' ? 'bg-[#00000040]' : 'bg-[#E74C3C]';
  const icon = type === 'success' ? <CheckIcon /> : <CloseIcon />;

  return (
    <motion.div
      className={`fixed top-25 md:top-40 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[285px] gap-lg px-3xl py-lg rounded-2xl ${backgroundColor} font-semibold text-md md:text-xl text-white backdrop-blur-[40px] text-center`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {icon}
      {message}
    </motion.div>
  );
};
