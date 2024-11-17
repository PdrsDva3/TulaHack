import { DatePicker } from '@mui/x-date-pickers';
import { FC, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Chip, Container } from '@mui/material';
import { StatisticCard } from './components';

export const StatisticPage: FC = () => {
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs('2024-11-16'));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs('2024-11-17'));

	const paletteGarbage = ['#008000', '#FFA500', '#FF0303'];

	const paletteTrash = ['blue', 'lightblue', 'white'];

	const paletteProblem = ['#85E551', '#E55151', 'white'];

	const descGarbage = ['Вывезено', 'Есть проблемы', 'Не вывезено'];

	const descTrash = ['Ликвидированно', 'Не ликвидированно'];

	const descProblem = ['Решено', 'Не решено'];

	return (
		<Box sx={{ display: 'flex', gap: 6, pt: 12 }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Chip
					label="Статистика на текущий момент 17.11.24"
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
							data: [
								{ id: 0, value: 10 },
								{ id: 1, value: 15 },
								{ id: 2, value: 20 },
							],
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={paletteGarbage}
					desc={descGarbage}
				/>
				<StatisticCard
					title={'Несанкционированной свалки:'}
					series={[
						{
							data: [
								{ id: 0, value: 10 },
								{ id: 1, value: 15 },
							],
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={paletteTrash}
					desc={descTrash}
				/>
				<StatisticCard
					title={'Выявленные проблемы:'}
					series={[
						{
							data: [
								{ id: 0, value: 10 },
								{ id: 1, value: 15 },
							],
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={paletteProblem}
					desc={descProblem}
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
							label="Выберите дату"
							value={fromDate}
							onChange={(newValue) => setFromDate(newValue)}
						/>
						<DatePicker
							label="Выберите дату"
							value={toDate}
							onChange={(newValue) => setToDate(newValue)}
						/>
					</DemoContainer>
				</LocalizationProvider>

				<StatisticCard
					title="Сосотояние КП в период 16.11.24-17.11.24:"
					series={[
						{
							data: [
								{ id: 0, value: 10 },
								{ id: 1, value: 15 },
								{ id: 2, value: 20 },
							],
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={paletteGarbage}
					desc={descGarbage}
				/>

				<StatisticCard
					title="Несанкционированные свалки 16.11.24-17.11.24:"
					series={[
						{
							data: [
								{ id: 0, value: 10 },
								{ id: 1, value: 15 },
							],
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={paletteTrash}
					desc={descTrash}
				/>

				<StatisticCard
					title="Выявленные проблемы в период 16.11.24-17.11.24:"
					series={[
						{
							data: [
								{ id: 0, value: 10 },
								{ id: 1, value: 15 },
							],
							outerRadius: 60,
							innerRadius: 30,
						},
					]}
					palette={paletteProblem}
					desc={descProblem}
				/>
			</Container>
		</Box>
	);
};
