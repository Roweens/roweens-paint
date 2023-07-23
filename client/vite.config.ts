import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        build: {
            outDir: './dist',
        },
        plugins: [react(), tsconfigPaths(), svgr()],
        define: {
            __HTTP_API_URL__: process.env.VITE_IS_DEV
                ? JSON.stringify('http://localhost:3000/api/')
                : JSON.stringify('https://roweens-canvas.onrender.com/api/'),
            __WS_API_URL__: process.env.VITE_IS_DEV
                ? JSON.stringify('ws://localhost:3000/')
                : JSON.stringify('wss://roweens-canvas.onrender.com'),
        },
    };
});
