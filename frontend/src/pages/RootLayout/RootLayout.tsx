import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components';
// import './RootLayout.scss';

export const RootLayout: FC = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
