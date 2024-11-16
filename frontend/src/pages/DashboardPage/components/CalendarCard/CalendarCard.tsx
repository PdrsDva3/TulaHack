import { Container, Box, Typography, Button, Divider } from '@mui/material';
import ArrowIconCard from '../../../../assets/svg/arrow-icon-right.svg?react';
import { DateCalendar } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { api } from '../../../../api/api.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CalendarCard = () => {
	const navigate = useNavigate();
	useEffect(() => {
		api.get('points/all').then((res) => {
			console.log(res);
		});
	}, []);

	return (
		<Container
			sx={{
				m: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				backgroundColor: 'common.white',
				borderRadius: '20px',
				minHeight: '35vw',
				width: '27.778vw',
				minWidth: '320px',
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
					gap: 2,
					justifyContent: 'space-between',
					alignItems: 'center',
					cursor: 'pointer',
				}}
				onClick={() => navigate('/monitoring')}
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
					<Typography variant="h3" color="common.black">
						Календарь отчетов
					</Typography>
					<Button variant="text">
						<ArrowIconCard />
					</Button>
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
	);
};
