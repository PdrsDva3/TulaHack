import { FC } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { AppBar, SvgIcon, Typography, Box, Toolbar, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { MapOutlined, LeaderboardOutlined } from '@mui/icons-material';
import LogOut from '../../../../assets/svg/logout.svg?react';
import House from '../../../../assets/svg/house.svg?react';

export const Header: FC = () => {
	const navigate = useNavigate();

	return (
		<AppBar
			className="header"
			sx={{
				backgroundColor: 'common.white',
				position: 'fixed',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around',
				alignItems: 'center',
			}}
		>
			<Button variant="text" sx={{ color: 'common.black' }} onClick={() => navigate('/')}>
				<House/>
			</Button>

			<Toolbar sx={{ display: 'flex', gap: 10 }}>
				<NavLink to="/monitoring">
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<SvgIcon fontSize="medium">
							<MapOutlined sx={{ color: 'secondary.dark' }} />
						</SvgIcon>
						<Typography variant="h3" sx={{ color: 'secondary.dark' }}>
							Мониторинг
						</Typography>
					</Box>
				</NavLink>

				<NavLink to="/statistic">
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<SvgIcon fontSize="medium">
							<LeaderboardOutlined sx={{ color: 'secondary.dark' }} />
						</SvgIcon>
						<Typography variant="h3" sx={{ color: 'secondary.dark' }}>
							Статистика
						</Typography>
					</Box>
				</NavLink>

				<NavLink to="/calendar">
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<SvgIcon fontSize="medium">
							<CalendarMonthOutlinedIcon sx={{ color: 'secondary.dark' }} />
						</SvgIcon>
						<Typography variant="h3" sx={{ color: 'secondary.dark' }}>
							Календарь вывоза с КП
						</Typography>
					</Box>
				</NavLink>
			</Toolbar>

			<Button
				variant="text"
				sx={{ color: 'common.black', gap: 2 }}
				onClick={() => navigate('/login')}
			>
				<LogOut />
				<Typography variant="h4" sx={{ color: 'common.black' }}>
					Выйти
				</Typography>
			</Button>
		</AppBar>
	);
};
