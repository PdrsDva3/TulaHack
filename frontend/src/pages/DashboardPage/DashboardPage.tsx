import { FC } from 'react';
import { CalendarCard } from './components';
import { Container } from '@mui/material';
import { MonitoringCard } from './components';
import { StatisticCard } from './components';


export const DashboardPage: FC = () => {
	return (
		<Container
			sx={{pt:"8.681vw", display:"flex", gap:8}}
		>
			<CalendarCard/>
			<MonitoringCard/>
			<StatisticCard/>

		</Container>

	);
};
