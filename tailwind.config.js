/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '1060': '1060px',
        '225' : '225px',
      },
    },
    colors: {
      color: {
        primary: '#eeeeee',
        accent: '#ffc639',
        secondary: '#393e46',
        dark: '#222831',
        borderdark:'#474c52',
        lightdark:'#2d323a',
        textgrey: '#6b757d',
        link: '#abc4ed',
      }
    },
  },
  plugins: [],
}


