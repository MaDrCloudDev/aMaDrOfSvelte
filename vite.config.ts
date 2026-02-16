import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: process.env.NODE_ENV === 'development',
				type: 'module',
				navigateFallback: '/'
			},
			filename: 'service-worker.js',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
			},
			manifest: false
		})
	]
});
