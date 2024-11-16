import { Container, Grid2 } from '@mui/material';
import { PhotoCard } from './components';
import { InfoCard } from './components';
import { FC } from 'react';
// import type { YMapLocationRequest } from '@yandex/ymaps3-types';
// import { YMap, YMapDefaultSchemeLayer } from '../../utils';
//
// const LOCATION: YMapLocationRequest = {
// 	center: [37.588144, 55.733842],
// 	zoom: 9,
// };
//
// const map = new YMap(document.getElementById('monitoring-map'), {
// 	location: LOCATION,
// });
//
// map.addChild(new YMapDefaultSchemeLayer());

export const MapPage: FC = () => {
	return (
		<Grid2 container spacing={4} sx={{ width: '100vw', px: '4.167vw' }}>
			<Grid2 size={8}>
				<Container
					id="monitoring-map"
					sx={{
						backgroundColor: 'secondary.dark',
						height: '100%',
						borderRadius: '10px',
					}}
				></Container>
			</Grid2>
			<Grid2 size={4}>
				<PhotoCard />
				<InfoCard />
			</Grid2>
		</Grid2>
	);
};
