import { Container, Box, Typography, Button, Divider } from '@mui/material';
import ArrowIconCard from '../../../../assets/svg/arrow-icon-right.svg?react';
import { DateCalendar } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { api } from '../../../../api/api.ts';
import { useEffect } from 'react';

export const CalendarCard = () => {
	useEffect(() => {
		api.get('points/all').then(res => {
			console.log(res)
		});
	}, [])

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				backgroundColor: 'common.white',
				borderRadius: '20px',
				height: '28.75vw',
				width: '27.778vw',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Box sx={{ pb: 16 }}>
				<Box
					sx={{
						display: 'flex',
						gap: 4,
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant="h3" color="common.black">
						Календарь отчетов
					</Typography>
					<Button variant="text">
						<ArrowIconCard />
					</Button>
				</Box>
				<Divider variant="middle" sx={{ width: '20vw', color: 'primary' }} />
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
	);
};
