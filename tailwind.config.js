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
    'btn-icon',
    'btn-icon-s',
    'notifications-error',
    'notifications-success',
    'notifications-info',
    'modal-content',
    'form-modal-content',
    'modal-backdrop',
    'close-btn'
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
        red: "#ec132c",
        dimGray: "#808080",
        'custom-rgba': 'rgba(0, 0, 0, 0.6)'

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
        mdef: '1.5rem 2rem',
        form: '2rem 4rem 2rem 3rem'
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
        icon: "2rem",
        container: "135rem",
        containerM: "33.5rem"
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


