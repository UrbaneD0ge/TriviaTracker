<script>
	import favicon from '$lib/assets/favicon.ico';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import favicon16 from '$lib/assets/favicon-16x16.png';
	import favicon32 from '$lib/assets/favicon-32x32.png';
	import icon192 from '$lib/assets/android-chrome-192x192.png';
	import icon512 from '$lib/assets/android-chrome-512x512.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
	<link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
	<link rel="icon" type="image/png" sizes="192x192" href={icon192} />
	<link rel="icon" type="image/png" sizes="512x512" href={icon512} />
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="theme-color" content="#2a5aca" />
	<title>Trivia Tracker</title>
</svelte:head>

{@render children()}
