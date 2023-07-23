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
                : JSON.stringify('http://production-url.com'),
            __WS_API_URL__: process.env.VITE_IS_DEV
                ? JSON.stringify('ws://localhost:3000/')
                : JSON.stringify('ws://production-url.com'),
        },
    };
});
