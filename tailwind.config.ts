// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        card: "var(--bg-card)",
        elevated: "var(--bg-elevated)",
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          tertiary: "var(--accent-tertiary)",
          glow: "var(--accent-glow)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: {
          subtle: "var(--border-subtle)",
        },
        glass: "var(--glass)",
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'var(--font-oxanium)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'var(--font-nunito)', 'sans-serif'],
        accent: ['var(--font-bebas-neue)', 'sans-serif'],
        jp: ['var(--font-noto-sans-jp)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': "var(--gradient-hero)",
      },
      animation: {
        'aurora-pulse': 'aurora 15s ease-in-out infinite alternate',
      },
      keyframes: {
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Added for the legal pages
  ],
};

export default config;
