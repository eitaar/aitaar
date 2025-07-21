export default {
  mode: "jit",
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
      },
      animation: {
        showPage: 'showPage 1.125s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'gradient-slow': 'gradient-slow 8s ease infinite',
        'float': 'float 12s ease-in-out infinite',
        'float-reverse': 'float-reverse 15s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'typing-bounce': 'typing-bounce 1.4s ease-in-out infinite both',
      },
      keyframes: {
        showPage: {
          '0%': { opacity: '0' },
          '55%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gradient-slow': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(120deg)' },
          '66%': { transform: 'translateY(10px) rotate(240deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(15px) rotate(-90deg)' },
          '66%': { transform: 'translateY(-25px) rotate(-180deg)' },
        },
        'fade-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'typing-bounce': {
          '0%, 80%, 100%': {
            transform: 'scale(0.8)',
            opacity: '0.6',
          },
          '40%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
    },
  },
};
