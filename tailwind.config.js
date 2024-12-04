/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-primary': '#1E1E2E',
        'game-secondary': '#2A2A3E',
        'game-accent': '#3B3B53',
        'game-highlight': '#7E6EE8',
        'game-text': '#E2E2F5',
        'game-gold': '#FFD700',
        'game-silver': '#C0C0C0',
      },
      fontFamily: {
        'game': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'swing': 'swing 2s ease-in-out infinite',
        'ping-fast': 'ping 0.5s cubic-bezier(0, 0, 0.2, 1)',
        'click-rotate': 'click-rotate 0.2s ease-in-out',
        'slide-in': 'slide-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        'click-rotate': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(0.95) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'game': '0 0 10px rgba(126, 110, 232, 0.5)',
        'game-hover': '0 0 15px rgba(126, 110, 232, 0.8)',
      }
    },
  },
  plugins: [],
} 