import { Container, Typography, Box, Button } from '@mui/material';
import arrow_left from '../../../../assets/svg/arrow-left.svg';
import arrow_right from '../../../../assets/svg/arrow-right.svg';
import photo from '../../../../assets/svg/photo.png';

export const PhotoCard = () => {
	return (
		<Container
			sx={{
				width: '28.472vw',
				backgroundColor: 'common.white',
				borderRadius: '20px',
				gap: 2,
				display: 'flex',
				flexDirection: 'column',
				py: 2,
				boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)'
			}}
		>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
			>
				<Typography variant="h2">Последние фото</Typography>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button variant="text" sx={{ display: 'flex', justifyContent: 'right' }}>
						<img src={arrow_left} />
					</Button>

					<Button
						variant="text"
						sx={{ display: 'flex', justifyContent: 'left', width: '1vw' }}
					>
						<img src={arrow_right} />
					</Button>
				</Box>
			</Box>
			<img src={photo} />
		</Container>
	);
};
