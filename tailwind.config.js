/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                silly: ['Kablammo'],
                hero: ['Sniglet',],
                chem: ['Creepster'],
                body: ['"Fira Sans"', 'sans-serif'],
                mono: ['"Space Mono"', 'monospace'],
            },
            colors: {
                peach: '#ffe0b2',
                lavender: '#e1bee7',
                sky: '#b3e5fc',
            },
        },
    },
    plugins: [],
}