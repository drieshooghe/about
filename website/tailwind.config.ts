import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        green: {
          100: '#BAC1B6',
          200: '#979F93',
          300: '#6E7A66',
          400: '#55604E',
          500: '#434D3C',
          600: '#313B2B',
          700: '#1E251B',
          800: '#0A0C09',
          900: '#0C0F0B',
        }
      }
    },
  },
  plugins: [],
};
export default config;
