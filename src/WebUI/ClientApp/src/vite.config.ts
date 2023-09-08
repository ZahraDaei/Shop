import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    envPrefix: 'REACT_APP_',

    plugins: [react(), envCompatible(), tsconfigPaths(), svgrPlugin({ icon: true })],
    build: {
        outDir: "build",
    },
    // add this 👇
    server: {
        port: 3000,
        open: true, // this will open directly to your browser
    },
});
