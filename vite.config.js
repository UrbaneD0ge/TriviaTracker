import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Trivia Tracker',
				short_name: 'Trivia Tracker',
				description: 'Track Trivia Tracker rounds and scores.',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				orientation: 'any',
				background_color: '#2f2f2f',
				theme_color: '#2a5aca',
				icons: [
					{
						src: '/icon512_maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					},
					{
						src: '/icon512_rounded.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			devOptions: {
				enabled: true
			},
		})
	]
});
