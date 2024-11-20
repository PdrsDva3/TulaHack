import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://garbagegogoriki.ru/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'PreflightDisallowedRedirect': '*',
	},
});
