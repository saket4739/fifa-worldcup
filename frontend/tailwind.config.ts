import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fifa: {
          navy: "#041E42",
          secondary: "#062B61",
          gold: "#D4AF37",
          muted: "#94A3B8",
          text: "#FFFFFF",
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(6, 43, 97, 0.45) 0%, rgba(4, 30, 66, 0.85) 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(4,30,66,0) 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;