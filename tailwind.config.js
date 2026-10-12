/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sentinel: {
          950: 'rgb(var(--sentinel-950) / <alpha-value>)',
          900: 'rgb(var(--sentinel-900) / <alpha-value>)',
          850: 'rgb(var(--sentinel-850) / <alpha-value>)',
          800: 'rgb(var(--sentinel-800) / <alpha-value>)',
          700: 'rgb(var(--sentinel-700) / <alpha-value>)',
          600: 'rgb(var(--sentinel-600) / <alpha-value>)',
          500: '#4D628E',
          400: '#7E95C4',
          300: '#B0C2E2',
          200: '#D6E2F5',
          100: '#EDF3FC',
          50: '#F7FAFD',
        },
        electric: {
          500: '#3B82F6',
          400: '#60A5FA',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        cyber: {
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans Devanagari"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Noto Sans Devanagari"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(56, 189, 248, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
