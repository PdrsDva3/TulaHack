import { FC } from 'react';
import './styles/App.scss';
import { AppRoutes } from './routes/AppRoutes.tsx';

// import ReactLogo from './assets/svg/react.svg?react'; // svgr plugin usage
// import viteLogo from '/vite.svg';

export const App: FC = () => <AppRoutes />;
