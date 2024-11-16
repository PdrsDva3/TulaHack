import { Container, Box, Typography, Button, Divider } from '@mui/material';
import ArrowIconCard from '../../../../assets/svg/arrow-icon-right.svg?react';
import statistic_icon from '../../../../assets/svg/statistic-icon.svg';

export const StatisticCard = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'common.white',
				borderRadius: '20px',
				height: '28.75vw',
				width: '27.778vw',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Box>
				<Box
					sx={{
						display: 'flex',
						gap: 4,
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant="h2" color="common.black">
						Статистика
					</Typography>
					<Button variant="text">
						<ArrowIconCard />
					</Button>
				</Box>
				<Divider variant="middle" sx={{ width: '20vw', color: 'primary' }} />
			</Box>
			<img src={statistic_icon} />
		</Container>
	);
};
