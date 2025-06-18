/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // ✅ src 폴더 내 파일 포함
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
