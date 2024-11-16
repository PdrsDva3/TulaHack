import { DatePicker } from '@mui/x-date-pickers';
import { FC, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/material';

export const StatisticPage: FC = () => {
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs('2024-04-17'));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs('2024-04-18'));

	return (
		<Container>
			<Container>
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
			</Container>
		</Container>
	);
};
