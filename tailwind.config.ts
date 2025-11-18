import type { Config } from 'tailwindcss'
// import {nextui} from "@nextui-org/react";
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '320px',
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-green-gray': 'linear-gradient(180deg, #5EF577 0%, #3636361a 100%)',
        'gradient-red-gray': 'linear-gradient(0deg, #FF0070 0%, #3636361a 100%)',
        'gradient-green-blue': 'linear-gradient(180deg, #10FF61 0%, #69B7FF 100%)',
        'gradient-dark-purple-purple': 'linear-gradient(180deg, #6E2FF3 0%, #A92FF3 100%)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
      },
      fontSize: {
        '4.5xl': '2.5rem',
      },
      scale: {
        flip: '-1',
      },
      width: {
        75: '18.75rem',
      },
      colors: {
        "primary": "#634EE2",
        "secondary": "#8F80EB",
        "dark": "#101010",
        "gray": "#1A1A1C",
        "light-gray": "#282A2D",
        "white": "#FFFFFF",
        "lime-green": "#94e24e",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'text-shadow': (value: any) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
    // nextui()
  ],
}
export default config
