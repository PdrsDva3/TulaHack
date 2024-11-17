import { DatePicker } from '@mui/x-date-pickers';
import { FC, useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Chip, Container } from '@mui/material';
import { StatisticCard } from './components';
import axios from 'axios';
import { calculateLightDay } from '../../utils';
import { StatisticDescription, StatisticPalette } from '../../constatns';

export const StatisticPage: FC = () => {
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs('2024-11-16'));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs('2024-11-17'));

	const [trashStatsToday, setTrashStatsToday] = useState([0, 0, 0]);
	const [garbageStatsToday, setGarbageStatsToday] = useState([0, 0]);
	const [problemStatsToday, setProblemStatsToday] = useState([0, 0]);

	const [trashStats, setTrashStats] = useState([0, 0, 0]);
	const [garbageStats, setGarbageStats] = useState([0, 0]);
	const [problemStats, setProblemStats] = useState([0, 0]);

	const fetchTodayStats = async () => {
		const { startOfDay, endOfDay } = calculateLightDay();
		const payload = {
			ts_1: startOfDay.format('YYYY-MM-DD HH:mm:ss'),
			ts_2: endOfDay.format('YYYY-MM-DD HH:mm:ss'),
		};

		try {
			const trashResponse = await axios.post(
				'http://82.97.249.28:8000/statisticcontainer',
				payload,
			);
			// const garbageResponse = await axios.post('http://82.97.249.28:8000/statisticgarbage', payload);
			const problemResponse = await axios.post(
				'http://82.97.249.28:8000/statisticsolve',
				payload,
			);

			const { see, bad, no_see } = trashResponse.data;
			// const { handled, not_handled } = garbageResponse.data;
			const { error, solve } = problemResponse.data;

			setTrashStatsToday([see, bad, no_see]);
			// setGarbageStatsToday([handled, not_handled]);
			setProblemStatsToday([error, solve]);
		} catch (error) {
			console.error('Ошибка при загрузке статистики для светового дня:', error);
		}
	};

	useEffect(() => {
		// Fetch stats for the current light day on component mount
		fetchTodayStats();
	}, []);

	useEffect(() => {
		if (!fromDate || !toDate) return;

		const payload = {
			ts_1: fromDate.format('YYYY-MM-DD HH:mm:ss'),
			ts_2: toDate.format('YYYY-MM-DD HH:mm:ss'),
		};

		// Fetch stats for the selected period
		fetchTrashStats(payload);
		// fetchGarbageStats(payload);
		fetchProblemStats(payload);
	}, [fromDate, toDate]);

	const fetchTrashStats = async (payload: { ts_1: string; ts_2: string }) => {
		try {
			const response = await axios.post(
				'http://82.97.249.28:8000/statisticcontainer',
				payload,
			);
			const { see, bad, no_see } = response.data;
			setTrashStats([see, bad, no_see]);
		} catch (error) {
			console.error('Ошибка при загрузке статистики для контейнеров:', error);
		}
	};

	const fetchGarbageStats = async (payload: { ts_1: string; ts_2: string }) => {
		try {
			const response = await axios.post(
				'http://82.97.249.28:8000/statisticgarbage',
				payload,
			);
			const { handled, not_handled } = response.data;
			setGarbageStats([handled, not_handled]);
		} catch (error) {
			console.error('Ошибка при загрузке статистики для свалок:', error);
		}
	};

	const fetchProblemStats = async (payload: { ts_1: string; ts_2: string }) => {
		try {
			const response = await axios.post(
				'http://82.97.249.28:8000/statisticsolve',
				payload,
			);
			const { error, solve } = response.data;
			setProblemStats([error, solve]);
		} catch (error) {
			console.error('Ошибка при загрузке статистики для проблем:', error);
		}
	};

	return (
		<Box sx={{ display: 'flex', gap: 6, pt: 12 }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Chip
					label="Статистика за световой день"
					sx={{
						backgroundColor: 'common.white',
						borderRadius: '10px',
						py: 1,
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
					}}
					component="h1"
				/>
				<StatisticCard
					title="Контейнерные площадки:"
					series={[
						{
							data: trashStatsToday.map((value, id) => ({ id, value })),
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={StatisticPalette.trash}
					desc={StatisticDescription.trash}
					data={trashStatsToday.map((value, id) => ({ id, value }))}
				/>
				<StatisticCard
					title="Несанкционированные свалки:"
					series={[
						{
							data: garbageStatsToday.map((value, id) => ({ id, value })),
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={StatisticPalette.garbage}
					desc={StatisticDescription.garbage}
					data={garbageStatsToday.map((value, id) => ({ id, value }))}
				/>
				<StatisticCard
					title="Выявленные проблемы:"
					series={[
						{
							data: problemStatsToday.map((value, id) => ({ id, value })),
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={StatisticPalette.problem}
					desc={StatisticDescription.problem}
					data={problemStatsToday.map((value, id) => ({ id, value }))}
				/>
			</Box>
			<Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Chip
					label="Статистика за выбранный период:"
					sx={{
						backgroundColor: 'common.white',
						borderRadius: '10px',
						py: 1,
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
					}}
					component="h1"
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer
						components={['DatePicker', 'DatePicker']}
						sx={{ backgroundColor: 'common.white', p: 2, borderRadius: '10px' }}
					>
						<DatePicker
							label="Выберите дату от"
							value={fromDate}
							onChange={(newValue) => setFromDate(newValue)}
						/>
						<DatePicker
							label="Выберите дату до"
							value={toDate}
							onChange={(newValue) => setToDate(newValue)}
						/>
					</DemoContainer>
				</LocalizationProvider>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<StatisticCard
						title="Контейнерные площадки:"
						series={[
							{
								data: trashStats.map((value, id) => ({ id, value })),
								outerRadius: 60,
								innerRadius: 30,
							},
						]}
						palette={StatisticPalette.trash}
						desc={StatisticDescription.trash}
						data={trashStats.map((value, id) => ({ id, value }))}
					/>
					<StatisticCard
						title="Несанкционированные свалки:"
						series={[
							{
								data: garbageStats.map((value, id) => ({ id, value })),
								outerRadius: 60,
								innerRadius: 30,
							},
						]}
						palette={StatisticPalette.garbage}
						desc={StatisticDescription.garbage}
						data={garbageStats.map((value, id) => ({ id, value }))}
					/>
					<StatisticCard
						title="Выявленные проблемы:"
						series={[
							{
								data: problemStats.map((value, id) => ({ id, value })),
								outerRadius: 60,
								innerRadius: 30,
							},
						]}
						palette={StatisticPalette.problem}
						desc={StatisticDescription.problem}
						data={problemStats.map((value, id) => ({ id, value }))}
					/>
				</Box>
			</Container>
		</Box>
	);
};
