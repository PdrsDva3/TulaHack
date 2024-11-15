// import { createContext, useState, useMemo } from 'react'; // switch to dark variation
import { createTheme } from '@mui/material/styles';

// could be design tokens

declare module '@mui/material/styles' {
	interface Palette {
		blueGray: Palette['primary'];
	}

	interface PaletteOptions {
		blueGray?: PaletteOptions['primary'];
	}
}

declare module '@mui/material/styles' {
	interface Palette {
		greenAccent: Palette['primary'];
	}

	interface PaletteOptions {
		greenAccent?: PaletteOptions['primary'];
	}
}

export let theme = createTheme({});

theme = createTheme({
	palette: {
		primary: {
			main: '#E21A1A',
		},

		secondary: {
			main: '#e6e6e6',
			dark: '#8e8989',
			light: '#d9d9d9',
		},

		blueGray: theme.palette.augmentColor({
			color: {
				main: '#687a8c',
			},
			name: 'blueGray',
		}),

		greenAccent: theme.palette.augmentColor({
			color: {
				main: '#01b456',
			},
			name: 'greenAccent',
		}),

		common: {
			white: '#ffffff',
			black: '#000000',
		},
	},

	typography: {
		fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
		fontSize: 16,

		h1: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 42,
		},
		h2: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 40,
		},
		h3: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 30,
		},
		h4: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 24,
		},
		h5: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 20,
		},
		h6: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 14,
		},
	},

	spacing: 10,
});
