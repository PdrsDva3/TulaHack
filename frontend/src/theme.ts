// import { createContext, useState, useMemo } from 'react'; // switch to dark variation
import { createTheme } from '@mui/material/styles';

// could be design tokens

declare module '@mui/material/styles' {
	interface Palette {
		blueGray: Palette['primary'];
	}

	interface PaletteOptions {
		redAccent?: PaletteOptions['primary'];
		orangeAccent?: PaletteOptions['primary'];
		greenAccent?: PaletteOptions['primary'];
		blueAccent?: PaletteOptions['primary'];
	}
}

export let theme = createTheme({});

theme = createTheme({
	palette: {
		primary: {
			main: '#F45011',
		},

		secondary: {
			main: '#C9F1F6',
			dark: '#989898',
			light: '#F1FBFD',
		},

		redAccent: theme.palette.augmentColor({
			color: {
				main: '#FF0303',
			},
			name: 'redAccent',
		}),

		orangeAccent: theme.palette.augmentColor({
			color: {
				main: '#F47544',
			},
			name: 'orangeAccent',
		}),

		greenAccent: theme.palette.augmentColor({
			color: {
				main: '#33A200',
			},
			name: 'greenAccent',
		}),

		blueAccent: theme.palette.augmentColor({
			color: {
				main: '#1976D2',
			},
			name: 'blueAccent',
		}),

		common: {
			white: '#ffffff',
			black: '#353535',
		},
	},

	typography: {
		fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
		fontSize: 10,

		h1: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 35,
		},
		h2: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 22,
		},
		h3: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 20,
		},
		h4: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 16,
		},
		h5: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 14,
		},
		h6: {
			fontFamily: '"RRG", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 12,
		},
	},

	spacing: 5,
});
