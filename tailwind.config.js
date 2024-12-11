/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fileEditorHeaderBg: "hsl(var(--fileEditorHeaderBg))",
        documentSidebarBg: "hsl(var(--documentSidebarBg))",
        documentHeaderBg: "hsl(var(--documentHeaderBg))",
        documentBodyBg: "hsl(var(--documentBodyBg))",
        "txt-clr-1": "hsl(var(--txt-clr-1))",
        "txt-clr-2": "hsl(var(--txt-clr-2))",
        "txt-clr-3": "hsl(var(--txt-clr-3))",
        "vivid-orange": "hsl(var(--vivid-orange), <alpha-value>)",
        hamburgerMenuBg: "hsl(var(--hamburgerMenuBg))",
        blockquoteBg: "hsl(var(--blockquoteBg))",
      },
    },
  },
  plugins: [],
};
