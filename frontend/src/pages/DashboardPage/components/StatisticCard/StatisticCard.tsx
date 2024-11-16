import { Container, Box, Typography, Button, Divider } from '@mui/material';
import ArrowIconCard from '../../../../assets/svg/arrow-icon-right.svg?react';
import statistic_icon from '../../../../assets/svg/statistic-icon.svg';
import { useNavigate } from 'react-router-dom';

export const StatisticCard = () => {
	const navigate = useNavigate();

	return (
		<Container
			sx={{
				m: 0,
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'common.white',
				borderRadius: '20px',
				minHeight: '35vw',
				width: '27.778vw',
				minWidth: '320px',
				alignItems: 'center',
				justifyContent: 'space-between',
				py: 2,
				gap: 2,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: 1,
					gap: 2,
					justifyContent: 'space-between',
					alignItems: 'center',
					cursor: 'pointer',
				}}
				onClick={() => navigate('/statistics')}
			>
				<Box
					sx={{
						display: 'flex',
						width: 1,
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
				<Divider variant="middle" sx={{ width: 1, color: 'primary' }} />
			</Box>
			<img src={statistic_icon} style={{ alignSelf: 'end' }} />
		</Container>
	);
};
