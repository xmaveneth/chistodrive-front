import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
// import path from "path";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            // "@": path.resolve(__dirname, "./src"),
            '@': resolve(__dirname, './src'),
        },
    },
});
