import { FC } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { AppBar, SvgIcon, Typography, Box, Toolbar, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { MapOutlined, LeaderboardOutlined } from '@mui/icons-material';
import ArrowIcon from '../../../../assets/svg/arrowicon.svg?react';
import LogOut from '../../../../assets/svg/logout.svg?react';

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
			<Button variant="text" sx={{ color: 'common.black' }} onClick={() => navigate(-1)}>
				<ArrowIcon color="common.black" fill="common.black" />
			</Button>

			<Toolbar sx={{ display: 'flex', gap: 10 }}>
				<NavLink to="/calendar">
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<SvgIcon fontSize="medium">
							<CalendarMonthOutlinedIcon sx={{ color: 'secondary.dark' }} />
						</SvgIcon>
						<Typography variant="h3" sx={{ color: 'secondary.dark' }}>
							Календарь отчетов
						</Typography>
					</Box>
				</NavLink>

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
			</Toolbar>

			<Button
				variant="text"
				sx={{ color: 'common.black', gap: 2 }}
				onClick={() => navigate('/login')}
			>
				<LogOut style={{ width: '25px', height: '25px' }} />
				<Typography
					variant="h3"
					sx={{ color: 'common.black', textTransform: 'none', fontWeight: 500 }}
				>
					Выйти
				</Typography>
			</Button>
		</AppBar>
	);
};
