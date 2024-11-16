import { Button, Container, Grid2, Typography } from '@mui/material';
import { FC } from 'react';
import { CalendarCard } from '../DashboardPage/components';
import dowload from '../../assets/svg/dowload.svg';

export const CalendarPage: FC = () => {
	return (
		<Grid2
			container
			spacing={4}
			sx={{
				justifyItems: 'stretch',
			}}
		>
			<Grid2 size={4}>
				<Typography
					variant="h4"
					color="common.black"
					sx={{
						py: 2,
						backgroundColor: 'common.white',
						borderRadius: '10px',
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
					}}
				>
					Отчет за 19.09.2024 - 12.10.2024
				</Typography>
			</Grid2>

			<Grid2 size={5}>
				<Typography
					variant="h4"
					color="common.black"
					sx={{
						py: 2,
						backgroundColor: 'common.white',
						borderRadius: '10px',
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
					}}
				>
					КП 20314535 на просп. Ленина 12
				</Typography>
			</Grid2>

			<Grid2
				size={3}
				sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'end' }}
			>
				<Button
					sx={{
						backgroundColor: 'common.white',
						borderRadius: '10px',
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
						display: 'flex',
						gap: 2,
					}}
				>
					<img src={dowload} />
					<Typography
						variant="h5"
						sx={{
							textTransform: 'none',
							color: 'common.black',
						}}
					>
						Скачать последний отчет
					</Typography>
				</Button>
			</Grid2>

			<Grid2
				size={4}
				sx={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}
			>
				<CalendarCard />
			</Grid2>
			<Grid2 size={8} sx={{ display: 'flex', gap: 8 }}>
				<Container
					sx={{
						backgroundColor: 'common.black',
						borderRadius: '10px',
					}}
				></Container>
			</Grid2>
		</Grid2>
	);
};
