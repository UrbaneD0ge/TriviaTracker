import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: [
				'favicon-16x16.png',
				'favicon-32x32.png',
				'apple-touch-icon.png',
				'android-chrome-192x192.png',
				'android-chrome-512x512.png'
			],
			manifest: {
				name: 'Trivia Tracker',
				short_name: 'Trivia Tracker',
				description: 'A tool to track trivia scores and stats.',
				theme_color: '#2a5aca',
				background_color: '#2f2f2f',
				display: 'standalone',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	]
});
