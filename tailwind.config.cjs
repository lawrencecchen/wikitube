const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts,md}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans]
			},
			cursor: {
				'ew-resize': 'ew-resize'
			},
			colors: {
				emerald: colors.emerald,
				orange: colors.orange,
				sky: colors.sky
			},
			typography: (theme) => ({
				notion: {
					css: {
						h1: {
							fontWeight: 600,
							fontSize: '1.875em',
							lineHeight: 1.3,
							marginTop: '2em'
						},
						h2: {
							fontWeight: 600,
							fontSize: '1.5em',
							lineHeight: 1.3,
							marginTop: '1.4em'
						},
						h3: {
							fontWeight: 600,
							fontSize: '1.25em',
							lineHeight: 1.3
						},
						'ol > li > *:first-child': {
							marginTop: 0,
							marginBottom: 0
						},
						'ul > li > *:first-child': {
							marginTop: 0,
							marginBottom: 0
						}
					}
				},
				medium: {
					css: {
						h1: {
							letterSpacing: '-0.011em',
							lineHeight: theme('spacing.14'),
							fontSize: '46px',
							color: theme('colors.gray.800'),
							fontWeight: 700
						},
						p: {
							letterSpacing: '-0.063px',
							lineHeight: theme('spacing.8'),
							fontSize: '21px',
							marginTop: '42px',
							color: 'rgb(41, 41, 41)',
							fontWeight: 400
						}
					}
				}
			})
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio')
	]
};
