import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: {
    files: [
      "./src/app/**/*.{ts,tsx}",
      "./src/components/**/*.{ts,tsx}",
      "./src/components/ui/**/*.{ts,tsx}",
    ],
  },
  theme: {},
  plugins: [typography],
};

export default config;
