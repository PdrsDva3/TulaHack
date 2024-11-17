import { Box, Button, Container, Divider, Grid2, Typography } from '@mui/material';
import { FC } from 'react';
import dowload from '../../assets/svg/dowload.svg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateCalendar } from '@mui/x-date-pickers';
import { api } from '../../api/api.ts';
import { YandexMap } from '../../components';

export const CalendarPage: FC = () => {
	const btnClick = async () => {
		await api
			.post('user/registration', {
				email: 'm2302537@edu.misis.ru',
				password: '123qwerty',
				name: 'gandoniero',
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<Grid2
			container
			spacing={4}
			sx={{
				justifyItems: 'stretch',
				px: '5vw',
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
					onClick={btnClick}
				>
					<img src={dowload} />
					<Typography
						variant="h5"
						sx={{
							textTransform: 'none',
							color: 'common.black',
						}}
					>
						Скачать отчет по параметрам
					</Typography>
				</Button>
			</Grid2>

			<Grid2
				size={4}
				sx={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}
			>
				<Container
					sx={{
						m: 0,
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: 'common.white',
						borderRadius: '20px',
						width: '27.778vw',
						minWidth: '320px',
						maxHeight: '410px',
						alignItems: 'center',
						justifyContent: 'space-between',
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
						py: 2,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: 1,
							gap: 4,
							justifyContent: 'space-between',
							alignItems: 'center',
							cursor: 'pointer',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								width: 1,
								gap: 4,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography variant="h3" color="common.black">
								Календарь отчетов
							</Typography>
						</Box>
						<Divider variant="middle" sx={{ width: 1, color: 'primary' }} />
					</Box>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={['DateCalendar']}>
							<DateCalendar
								// value={selectedDate}
								// onChange={handleDateChange}
								views={['year', 'month', 'day']}
								sx={{ color: 'primary', fontVariant: 'h2' }}
							/>
						</DemoContainer>
					</LocalizationProvider>
				</Container>
			</Grid2>
			<Grid2 size={8} sx={{ display: 'flex' }}>
				<Box
					sx={{
						borderRadius: '10px',
						minHeight: '70vh',
						minWidth: '60vw',
					}}
				>
					<YandexMap
						center={[54.1921, 37.6156]}
						zoom={10}
						apiEndpoint="point/all"
					></YandexMap>
				</Box>
			</Grid2>
		</Grid2>
	);
};
