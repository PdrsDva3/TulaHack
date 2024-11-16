import { FC } from 'react';
import { CalendarCard } from './components';
import { Container } from '@mui/material';
import { MonitoringCard } from './components';
import { StatisticCard } from './components';

export const DashboardPage: FC = () => {
	return (
		<Container sx={{ display: 'flex', gap: 8, alignItems:"center"}}>
			<CalendarCard />
			<MonitoringCard />
			<StatisticCard />
		</Container>
	);
};
