/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'../../packages/ui/src/components/**/*.{svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				// Singapore design tokens from DESIGN.md
				primary: {
					DEFAULT: '#3C5D4F', // Singapore green
					light: '#5A7A68', // Lighter garden green
					dark: '#2A4138', // Deep rainforest green
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#D4A574', // Warm accent
					light: '#E5C4A0',
					dark: '#B88D5A',
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#E63946', // Attention red (Singapore flag)
					light: '#FF6B6B',
					dark: '#C12937',
					foreground: '#FFFFFF'
				},
				orchid: {
					DEFAULT: '#9B5DE5', // National orchid purple
					light: '#B79CF0',
					dark: '#7D4BB5',
					foreground: '#FFFFFF'
				},
				success: '#4CAF50',
				warning: '#FF9800',
				error: '#F44336',
				neutral: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#EEEEEE',
					300: '#E0E0E0',
					400: '#BDBDBD',
					500: '#9E9E9E',
					600: '#757575',
					700: '#616161',
					800: '#424242',
					900: '#212121'
				}
			},
			fontSize: {
				xs: '14px',
				sm: '16px',
				base: '18px',
				lg: '20px',
				xl: '24px',
				'2xl': '28px',
				'3xl': '36px'
			},
			spacing: {
				xs: '4px',
				sm: '8px',
				md: '16px',
				lg: '24px',
				xl: '32px',
				'2xl': '48px'
			},
			borderRadius: {
				card: '8px',
				button: '6px',
				input: '4px',
				badge: '12px'
			},
			boxShadow: {
				sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
				lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
			}
		}
	},
	plugins: []
};
