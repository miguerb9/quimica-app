/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        ink: '#0f0f0f',
        paper: '#faf9f7',
        'paper-dark': '#f0ede8',
        accent: '#2563eb',
        'accent-light': '#dbeafe',
        muted: '#6b7280',
        border: '#e5e1d8',
        success: '#16a34a',
        danger: '#dc2626',
        warning: '#d97706',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
}
