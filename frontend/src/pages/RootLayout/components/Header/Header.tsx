import { FC } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { AppBar, SvgIcon } from '@mui/material';

export const Header: FC = () => {
	return <AppBar className="header">

		<SvgIcon>
			<CalendarMonthOutlinedIcon/>
		</SvgIcon>
	</AppBar>;
};
