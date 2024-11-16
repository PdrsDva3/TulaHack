import { Box, Container, Grid2, Typography } from '@mui/material';
import { PhotoCard } from './components';
import { InfoCard } from './components';
import { FC } from 'react';
import Ellipse from '../../assets/svg/Ellipse.svg?react';
import { YandexMap }from '../../components';

export const MapPage: FC = () => {
	return (
		<Grid2
			container
			spacing={3}
			sx={{ mt: 16
				, display: 'flex', justifyContent: 'center' }}
		>
			<Container
				sx={{
					backgroundColor: 'common.white',
					display: 'flex',
					justifyContent: 'space-around',
					gap: 10,
					borderRadius: '10px',
					boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
					py: 1,
				}}
			>
				<Grid2 size={2}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Ellipse />
						<Typography variant="h6" color="secondary.dark" width="10vw">
							Контейнерная площадка без проблем
						</Typography>
					</Box>
				</Grid2>

				<Grid2 size={2}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Ellipse />
						<Typography variant="h6" color="secondary.dark" width="10vw">
							Контейнерная с выявленной проблемой
						</Typography>
					</Box>
				</Grid2>

				<Grid2 size={2}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Ellipse />
						<Typography variant="h6" color="secondary.dark" width="10vw">
							Не вывезенные контейнерные площадки
						</Typography>
					</Box>
				</Grid2>

				<Grid2 size={2}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Ellipse />
						<Typography variant="h6" color="secondary.dark" width="10vw">
							Несанкционированные контейерные площадки
						</Typography>
					</Box>
				</Grid2>
			</Container>
			<Grid2 size={6}>
				<Box
					sx={{
						overflow:"hidden",
						// backgroundColor: 'secondary.dark',
						height: '42vw',
					}}
				>
					<YandexMap center={[54.1921, 37.6156]} zoom={10}></YandexMap>
				</Box>
			</Grid2>
			<Grid2 size={4}>
				<PhotoCard />
				<InfoCard />
			</Grid2>
		</Grid2>
	);
};
