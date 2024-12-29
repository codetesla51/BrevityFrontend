import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  darkMode: 'class', // Enable dark mode using the 'class' strategy

  theme: {
    extend: {
                  colors: {
                bg: "#111111",
                bgsec: "#0a0a0a",
                acc: "#27ea66",
                tx: "#fff",
                dark: "#111111",
                br: "#b6b1ae"
            },
    }
  },

  plugins: []
} satisfies Config;