import { Container, Grid2, Typography } from '@mui/material';
import { PhotoCard } from './components';
import { InfoCard } from './components';
import { FC } from 'react';

export const MapPage: FC = () => {
	return (
		<Grid2
			container
			spacing={4}
			sx={{ my: 9, display: 'flex', justifyContent: 'center' }}
		>
			<Grid2 size={6}>
				<Container
					sx={{
						backgroundColor: 'secondary.dark',
						height: '42vw',
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
