import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            backgroundColor: '#F6E9D9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '1.5rem',
          }}>

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#043222' }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.70rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#043222' }}>
              DEVNest
            </span>
          </motion.div>

          {/* Progress line */}
          <div style={{ width: '80px', height: '1px', backgroundColor: 'rgba(4,50,34,0.12)', overflow: 'hidden', borderRadius: '1px' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.0, ease: [0.16,1,0.3,1], delay: 0.1 }}
              style={{ height: '100%', backgroundColor: '#043222' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
