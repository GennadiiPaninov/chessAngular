/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  safelist: [
    'btn-primary',
    'btn-secondary',
    'btn-default',
    'typography-xxxl',
    'typography-xxl',
    'typography-xl',
    'typography-lg',
    'typography-md',
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
        success:"#2cb67d",
        error:"#e53170",
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


