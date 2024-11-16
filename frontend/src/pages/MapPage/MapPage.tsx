import { Container, Grid2, Typography } from '@mui/material';
import { PhotoCard } from './components';
import { InfoCard } from './components';
import { FC } from 'react';

export const MapPage: FC = () => {
	return (
		<Grid2 container spacing={4} sx={{ width: '100vw', px: '4.167vw' }}>
			<Grid2 size={8}>
				<Container
					sx={{
						backgroundColor: 'secondary.dark',
						height: '100%',
						borderRadius: '10px',
					}}
				>
					<Typography>photo</Typography>
				</Container>
			</Grid2>
			<Grid2 size={4}>
				<PhotoCard />
				<InfoCard />
			</Grid2>
		</Grid2>
	);
};
