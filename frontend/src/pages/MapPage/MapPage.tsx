import { Container } from '@mui/material';
import { PhotoCard } from './components';
import { InfoCard } from './components';
import { FC } from 'react';

export const MapPage: FC = () => {
	return (
		<Container sx={{ pt: '4.931vw' }}>
			<PhotoCard />
			<InfoCard />
		</Container>
	);
};
