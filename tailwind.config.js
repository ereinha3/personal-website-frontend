/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'marquee': 'marquee 15s linear infinite',
        'float-1': 'float-1 3s ease-in-out infinite',
        'float-2': 'float-2 4s ease-in-out infinite',
        'float-3': 'float-3 5s ease-in-out infinite',
        'draw1': 'draw1 5s linear infinite',
        'draw2': 'draw2 5s linear infinite',
        'draw3': 'draw3 5s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(110vw)' },
          '100%': { transform: 'translateX(-20vw)' }
        },
        'float-1': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'draw1': {
          'to': { strokeDashoffset: '0' }
        },
        'draw2': {
          'to': { strokeDashoffset: '0' }
        },
        'draw3': {
          'to': { strokeDashoffset: '0' }
        }
      },
      fontFamily: {
        'display': ['Clash Display', 'sans-serif'],
        'body': ['Satoshi', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: {
          cyan: '#22d3ee',
          purple: '#a78bfa',
        }
      },
      borderRadius: {
        '5%': '5%',
      },
      boxShadow: {
        'custom': '0 10px 20px rgba(0,0,0,0.2)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.3)',
        'glow-purple': '0 0 30px rgba(167, 139, 250, 0.3)',
      },
      textShadow: {
        'sm': '-2px 4px 4px rgba(0, 0, 0, 0.5)',
        'md': '-3px 8px 6px rgba(0, 0, 0, 0.5)',
        'lg': '-4px 12px 8px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'radial-gray': 'radial-gradient(circle at center, rgb(156 163 175) 0%, rgb(209 213 219) 50%, rgb(243 244 246) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}
