import { Map, YMaps } from '@pbe/react-yandex-maps';
import { Box } from '@mui/material';

export const MyMap = () => (
	<Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", height: '100%', overflow:'hidden', borderRadius:"20px"  }}>
		<YMaps>
			<Map style={{height:"100%", width:"100%"}} defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
		</YMaps>
	</Box>
);
