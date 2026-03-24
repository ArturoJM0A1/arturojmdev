export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rotate3d: {
          '0%': {
            transform: 'perspective(800px) rotateY(0deg)',
          },
          '100%': {
            transform: 'perspective(800px) rotateY(360deg)',
          },
        },
      },
      animation: {
        'rotate-3d': 'rotate3d 1.2s ease-in-out',
      },
    },
  },
  plugins: [],
}