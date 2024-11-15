import { FC } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { AppBar, SvgIcon, Toolbar } from '@mui/material';

export const Header: FC = () => {
	return <AppBar className="header">
		<Toolbar>
			<SvgIcon>
				<CalendarMonthOutlinedIcon/>
			</SvgIcon>
		</Toolbar>
	</AppBar>;
};
