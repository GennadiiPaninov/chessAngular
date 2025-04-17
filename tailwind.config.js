/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  safelist: [
    'btn-primary',
    'btn-secondary',
    'btn-default',
    'btn-success',
    'btn-icon'
  ],
  theme: {
    extend: {
      colors: {
        background: "#fffffe",
        primary: "#272343",
        secondary: "#e3f6f5",
        tertiary: "#bae8e8",
        tertiaryXl:"#a1e0e0",
        stroke:"#2d334a",
        strokeXl:"#1d2538",
        success:"#28a745",
        successA:"#1e7e34",
        successH:"#218838",
        error:"#e53170",
        red: "#ec132c"
      },
      fontSize: {
        xxxl: ['7.5rem', { lineHeight: '130%' }],
        xxxlM: '4.5rem',
        xxl: ['6.5rem', { lineHeight: '130%' }],
        xxlM: '2.5rem',
        xl: ['3rem', { lineHeight: '130%' }],
        xlM: '2rem',
        lg: ['2.4rem', { lineHeight: '130%' }],
        lgM: '1.8rem',
        md: ['2rem', { lineHeight: '130%' }],
        mdM: '1.5rem',
      },
      padding: {
        def: '2rem 3rem',
        mdef: '1.5rem 2rem'
      },
      margin:{
        center: '0 auto'
      },
      screens:{
        mob: {max: "500px"}
      },

      borderRadius: {
        deck: "2rem",
        mob: "1.8rem"
      },
      width: {
        icon: "2rem"
      },
      height:{
        icon:"2rem"
      },
      gap: {
        button: "1rem"
      }
    },
  },
  plugins: [],
};


