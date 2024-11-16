import { Box, Grid2, SvgIcon, Typography } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { PhotoCard, InfoCard } from './components';
import { FC, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { YandexMap } from '../../components';
import { PointDetailsWithGarbage } from '../../constatns';

export const MapPage: FC = () => {
	const [selectedPoint, setSelectedPoint] = useState<PointDetailsWithGarbage | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLoadingChange = (loading: boolean) => {
		setIsLoading(loading);
	};

	const handleMarkerClick = (pointDetails: PointDetailsWithGarbage) => {
		setSelectedPoint(pointDetails); // Устанавливаем выбранную точку
	};

	return (
		<Grid2
			container
			spacing={3}
			sx={{ mt: 16, display: 'flex', justifyContent: 'center' }}
		>
			<Grid2
				size={10}
				sx={{
					backgroundColor: 'common.white',
					display: 'flex',
					justifyContent: 'space-around',
					gap: 1,
					alignItems: 'center',
					borderRadius: '10px',
					boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
					py: 2,
				}}
			>
				<Grid2 size={2}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<SvgIcon sx={{ color: 'green' }}>
							<Brightness1Icon />
						</SvgIcon>
						<Typography variant="h6" color="secondary.dark" width="10vw">
							Контейнерная площадка без проблем
						</Typography>
					</Box>
				</Grid2>

				<Grid2 size={2}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<SvgIcon sx={{ color: 'orange' }}>
							<Brightness1Icon />
						</SvgIcon>
						<Typography variant="h6" color="secondary.dark" width="10vw">
							Контейнерная с выявленной проблемой
						</Typography>
					</Box>
				</Grid2>

				<Grid2 size={2}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<SvgIcon sx={{ color: 'red' }}>
							<Brightness1Icon />
						</SvgIcon>
						<Typography variant="h6" color="secondary.dark" width="10vw">
							Не вывезенные контейнерные площадки
						</Typography>
					</Box>
				</Grid2>

				<Grid2 size={2}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<SvgIcon sx={{ color: 'blue' }}>
							<Brightness1Icon />
						</SvgIcon>
						<Typography variant="h6" color="secondary.dark" width="10vw">
							Несанкционированные контейерные площадки
						</Typography>
					</Box>
				</Grid2>
			</Grid2>

			<Grid2 size={6}>
				<YandexMap
					center={[54.1921, 37.6156]}
					zoom={10}
					apiEndpoint="point/all"
					onMarkerClick={handleMarkerClick}
					onLoadingChange={handleLoadingChange}
				/>
			</Grid2>

			<Grid2 size={4}>
				{isLoading ? (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<CircularProgress />
					</Box>
				) : selectedPoint ? (
					<>
						{selectedPoint.photo_1 && <PhotoCard photo_base64={selectedPoint.photo_1} />}
						<InfoCard
							address={selectedPoint.address}
							lat={selectedPoint.lat}
							lon={selectedPoint.lon}
							problems={selectedPoint.problems}
							containers={selectedPoint.containers}
							ts_2={selectedPoint.ts_2}
							isGarbage={selectedPoint.isGarbage}
						/>
					</>
				) : (
					<Box sx={{ textAlign: 'center', marginTop: '20px' }}>
						Выберите точку на карте, чтобы увидеть информацию.
					</Box>
				)}
			</Grid2>
		</Grid2>
	);
};
