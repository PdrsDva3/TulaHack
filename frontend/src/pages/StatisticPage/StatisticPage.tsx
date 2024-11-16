import { DatePicker } from '@mui/x-date-pickers';
import { FC, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Chip, Container } from '@mui/material';
import { StatisticCard } from './components';

export const StatisticPage: FC = () => {
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs('2024-04-17'));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs('2024-04-18'));

	const paletteGarbage = ['red', 'green', 'orange'];

	const paletteTrash = ['blue', 'lightblue', 'white'];

	const paletteProblem = ['red', 'lightgreen', 'white'];

	const descGarbage = ['Вывезено','Есть проблемы','Не вывезено'];

	const descTrash = ['Ликвидированно','Не ликвидированно'];

	const descProblem = ['Решено','Не решено'];


	return (
		<Container sx={{ display: 'flex', gap: 6, pt: 10 }}>
			<Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
			</Container>
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
					<DemoContainer components={['DatePicker', 'DatePicker']}>
						<DatePicker
							label="Controlled picker"
							value={fromDate}
							onChange={(newValue) => setFromDate(newValue)}
						/>
						<DatePicker
							label="Controlled picker"
							value={toDate}
							onChange={(newValue) => setToDate(newValue)}
						/>
					</DemoContainer>
				</LocalizationProvider>

				<StatisticCard
					title="Сосотояние КП в период 15.11.24-15.11.24:"
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
					title="Несанкционированные свалки 15.11.24-15.11.24:"
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
					title="Выявленные проблемы в период 15.11.24-15.11.24:"
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
		</Container>
	);
};
