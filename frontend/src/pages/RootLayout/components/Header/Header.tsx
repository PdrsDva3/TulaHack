import { FC } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { AppBar, SvgIcon, Typography, Box, Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { MapOutlined, LeaderboardOutlined  } from '@mui/icons-material';
import ArrowIcon from '../../../../assets/svg/arrowicon.svg?react'
import LogOut from '../../../../assets/svg/logout.svg?react'

export const Header: FC = () => {
	return <AppBar className="header" sx={{backgroundColor:'common.white',position:'static', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
		<Button
			variant='text'
			sx={{color:"common.black"}}
		>
		 <ArrowIcon color='common.black' fill='common.black'/>
		</Button>


		<Toolbar
			sx={{display:'flex', gap:10}}
		>
			<NavLink to="/" >
				<Box
					sx={{display:'flex', gap:4, alignItems:'center'}}
				>
					<SvgIcon fontSize="medium">
						<CalendarMonthOutlinedIcon  sx={{color:'secondary.dark'}}/>
					</SvgIcon>
					<Typography
						variant='h3'
						sx={{color:"secondary.dark"}}
					>
						Календарь отчетов
					</Typography>
				</Box>
			</NavLink>

			<NavLink to='/monitoring'>
				<Box
					sx={{display:'flex', gap:4, alignItems:'center'}}
				>
					<SvgIcon fontSize="medium">
						<MapOutlined sx={{color:'secondary.dark'}}/>
					</SvgIcon>
					<Typography
						variant='h3'
						sx={{color:"secondary.dark"}}
					>
						Мониторинг
					</Typography>
				</Box>
			</NavLink>

			<NavLink to='/'>
				<Box
					sx={{display:'flex', gap:4, alignItems:'center'}}
				>
					<SvgIcon fontSize="medium">
						<LeaderboardOutlined  sx={{color:'secondary.dark'}}/>
					</SvgIcon>
					<Typography
						variant='h3'
						sx={{color:"secondary.dark"}}
					>
						Статистика
					</Typography>
				</Box>
			</NavLink>
		</Toolbar>

		<Button
			variant='text'
			sx={{color:"common.black", gap:2}}
		>
		 <LogOut/>
		 <Typography variant='h4' sx={{color:"common.black"}}>Выйти</Typography>
		</Button>
	</AppBar>;
};
