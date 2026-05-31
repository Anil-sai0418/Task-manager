// LoginPanel.jsx — Drop this as a sibling file to Login.jsx
// Usage: Import and place <LoginPanel /> inside the <motion.section> after the <form>

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Animated grid orb canvas
function CyberCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const DOTS = 60;
    const dots = Array.from({ length: DOTS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    let frame;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56,189,248,0.7)';
        ctx.fill();
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });

      frame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Floating stat badge
function StatBadge({ label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col items-center px-4 py-3 rounded-xl border border-cyan-400/20 bg-cyan-950/40 backdrop-blur-sm"
    >
      <span className="text-2xl font-bold text-cyan-300 tracking-tight">{value}</span>
      <span className="text-[10px] text-cyan-500/70 tracking-widest uppercase mt-0.5">{label}</span>
    </motion.div>
  );
}

// Pulsing ring decoration
function PulsingRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cyan-400/10"
          style={{ width: 180 + i * 80, height: 180 + i * 80 }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{
            duration: 3.5 + i * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}

// Glowing orb center
function GlowOrb() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
    >
      {/* Outer ring with dashes */}
      <svg width="180" height="180" className="absolute" viewBox="0 0 180 180">
        <circle
          cx="90" cy="90" r="80"
          fill="none"
          stroke="rgba(34,211,238,0.2)"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <circle
          cx="90" cy="90" r="64"
          fill="none"
          stroke="rgba(34,211,238,0.12)"
          strokeWidth="0.5"
          strokeDasharray="3 9"
        />
      </svg>

      {/* Core orb */}
      <motion.div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(34,211,238,0.25) 0%, rgba(8,47,73,0.9) 70%)',
          boxShadow: '0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(34,211,238,0.1)',
          border: '1px solid rgba(34,211,238,0.35)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Shield icon */}
        <motion.svg
          width="40" height="40" viewBox="0 0 24 24" fill="none"
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          <path
            d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"
            stroke="rgba(34,211,238,0.9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="rgba(34,211,238,0.08)"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="rgba(56,189,248,1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

// Scrolling activity log
const ACTIVITY = [
  { icon: '✦', text: 'Secure session established', time: '0s ago' },
  { icon: '◈', text: 'End-to-end encryption active', time: '2s ago' },
  { icon: '⬡', text: '2FA verification ready', time: '5s ago' },
  { icon: '◉', text: 'Identity protocols loaded', time: '8s ago' },
];

function ActivityLog() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="w-full mt-6 space-y-2"
    >
      {ACTIVITY.map((item, i) => (
        <motion.div
          key={i}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.1 + i * 0.12, duration: 0.4 }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-950/30 border border-cyan-400/10"
        >
          <span className="text-cyan-400 text-xs">{item.icon}</span>
          <span className="text-gray-300 text-[11px] flex-1 tracking-wide">{item.text}</span>
          <span className="text-cyan-600 text-[10px]">{item.time}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function LoginPanel() {
  return (
    <div className="hidden md:flex w-1/2 relative flex-col items-center justify-center p-10 overflow-hidden">

      {/* Animated neural net background */}
      <CyberCanvas />

      {/* Subtle diagonal gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(8,47,73,0.5) 0%, transparent 60%, rgba(8,47,73,0.3) 100%)',
        }}
      />

      {/* Pulsing rings */}
      <PulsingRings />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs">

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] tracking-[0.35em] text-cyan-500/70 uppercase mb-8"
        >
          Secure Access Portal
        </motion.p>

        {/* Glowing orb */}
        <GlowOrb />

        {/* Stats row */}
        <motion.div
          className="flex gap-3 mt-8 w-full justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <StatBadge label="Uptime" value="99.9%" delay={0.75} />
          <StatBadge label="Encrypted" value="256-bit" delay={0.85} />
          <StatBadge label="Users" value="10k+" delay={0.95} />
        </motion.div>

        {/* Activity log */}
        <ActivityLog />

        {/* Bottom brand line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-[10px] text-cyan-700/50 tracking-widest uppercase mt-6"
        >
          Protected by Zero-Trust Architecture
        </motion.p>
      </div>
    </div>
  );
}
