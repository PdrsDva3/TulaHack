import { FC } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { AppBar, SvgIcon, Typography, Box, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { MapOutlined, LeaderboardOutlined } from '@mui/icons-material';
import TelegramIcon from '@mui/icons-material/Telegram';
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
				py: 1,
			}}
		>
			<Button variant="text" sx={{ color: 'common.black' }} onClick={() => navigate('/')}>
				<House />
			</Button>

			<Box sx={{ display: 'flex', gap: 10, py: 1 }}>
				<NavLink to="/monitoring">
					{({ isActive }) => (
						<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
							<SvgIcon fontSize="medium">
								<MapOutlined
									sx={{ color: isActive ? 'primary.main' : 'secondary.dark' }} // Меняем цвет
								/>
							</SvgIcon>
							<Typography
								variant="h3"
								sx={{ color: isActive ? 'primary.main' : 'secondary.dark' }} // Меняем цвет
							>
								Мониторинг
							</Typography>
						</Box>
					)}
				</NavLink>

				<NavLink to="/statistic">
					{({ isActive }) => (
						<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
							<SvgIcon fontSize="medium">
								<LeaderboardOutlined
									sx={{ color: isActive ? 'primary.main' : 'secondary.dark' }} // Меняем цвет
								/>
							</SvgIcon>
							<Typography
								variant="h3"
								sx={{ color: isActive ? 'primary.main' : 'secondary.dark' }} // Меняем цвет
							>
								Статистика
							</Typography>
						</Box>
					)}
				</NavLink>

				<NavLink to="/calendar">
					{({ isActive }) => (
						<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
							<SvgIcon fontSize="medium">
								<CalendarMonthOutlinedIcon
									sx={{ color: isActive ? 'primary.main' : 'secondary.dark' }} // Меняем цвет
								/>
							</SvgIcon>
							<Typography
								variant="h3"
								sx={{ color: isActive ? 'primary.main' : 'secondary.dark' }} // Меняем цвет
							>
								Календарь вывоза с КП
							</Typography>
						</Box>
					)}
				</NavLink>
			</Box>

			<Box
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}
			>
				<a
					style={{ color: 'common.black', cursor: 'pointer' }}
					href="https://t.me/MISIS_GogoRiki_bot"
					target="_blank"
				>
					<SvgIcon
						sx={{
							color: 'common.black',
							gap: 2,
							textAlign: 'center',
							verticalAlign: 'middle',
						}}
					>
						<TelegramIcon />
					</SvgIcon>
				</a>

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
			</Box>
		</AppBar>
	);
};
