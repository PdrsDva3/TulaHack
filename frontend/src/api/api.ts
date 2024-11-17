import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://82.97.249.28:8000/',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});
