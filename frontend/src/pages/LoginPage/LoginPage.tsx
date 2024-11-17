import { FC, useState } from 'react';
// import './LoginPage.scss';
import left_grey_house from '../../assets/svg/left_grey_house.svg';
import left_white_house from '../../assets/svg/left_white_house.svg';
import left_grey_window from '../../assets/svg/left_grey_window.svg';
import left_orange_house from '../../assets/svg/left_orange_house.svg';
import left_orange_window from '../../assets/svg/left_orange_window.svg';
import left_white_window from '../../assets/svg/left_white_window.svg';
import line from '../../assets/svg/line.svg';
import right_grey_house from '../../assets/svg/right_grey_house.svg';
import right_grey_window from '../../assets/svg/right_grey_window.svg';
import right_orange from '../../assets/svg/right_orange.svg';
import right_white_house from '../../assets/svg/right_white_house.svg';
import right_white_window from '../../assets/svg/right_white_window.svg';
import right_white from '../../assets/svg/right_white.svg';
import one from '../../assets/svg/1.svg';
import two from '../../assets/svg/2.svg';
import three from '../../assets/svg/3.svg';
import four from '../../assets/svg/4.svg';
import five from '../../assets/svg/5.svg';
import six from '../../assets/svg/6.svg';
import seven from '../../assets/svg/7.svg';
import eight from '../../assets/svg/8.svg';
import nine from '../../assets/svg/9.svg';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import './LoginPage.scss';
import { api } from '../../api/api.ts';
import { useNavigate } from 'react-router-dom';

export const LoginPage: FC = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = async (email: string, password: string) => {
		await api
			.post('user/login', {
				email,
				password,
			})
			.then((res) => {
				if (res.statusText === 'OK') {
					navigate('/');
				}
			})
			.catch((err) => {
				throw new Error(`Failed to fetch user data:\n${err}`);
			});
	};

	return (
		<section className="login">
			<div className="main_wrapper">
				<div className="line_wrap">
					<img src={left_grey_house} className="left_grey_house" />
					<img src={left_white_house} className="left_white_house" />
					<img src={left_grey_window} className="left_grey_window" />
					<img src={left_orange_house} className="left_orange_house" />
					<img src={left_orange_window} className="left_orange_window" />
					<img src={left_white_window} className="left_white_window" />
					<img src={line} className="line11" />
					<img src={line} className="line1" />
					<img src={right_grey_house} className="right_grey_house" />
					<img src={right_grey_window} className="right_grey_window" />
					<img src={right_orange} className="right_orange" />
					<img src={right_white_house} className="right_white_house" />
					<img src={right_white_window} className="right_white_window" />
					<img src={right_white} className="right_white box-shadow" />
				</div>
			</div>
			<div>
			<img src={one} className="one" />
				<img src={two} className="two" />
				<img src={three} className="three" />
				<img src={four} className="four" />
				<img src={five} className="five" />
				<img src={six} className="six" />
				<img src={seven} className="seven" />
				<img src={eight} className="eight" />
				<img src={nine} className="nine" />
			</div>
			<FormControl
				className="login_form box-shadow"
				sx={{
					backgroundColor: 'common.white',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					py: 4,
				}}
			>
				<Typography className="title" id="title" variant="h2" sx={{ mt: 3 }}>
					Вход в систему
				</Typography>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<TextField
						id="login_user_email"
						label="Почта"
						onChange={({ target }) => setEmail(target.value)}
						value={email}
						sx={{
							color: 'secondary.main',
							width: '0.9',
							backgroundColor: 'white',
							'& input:-webkit-autofill': {
								WebkitBoxShadow: '0 0 0 100px white inset',
								WebkitTextFillColor: 'black',
							},
						}}
					/>

					<TextField
						id="login_user_password"
						label="Пароль"
						onChange={({ target }) => setPassword(target.value)}
						value={password}
						sx={{ color: 'secondary.main', width: '0.9' }}
						type="password"
						name="password"
					/>
				</Box>
				<Button
					type="submit"
					className="login__btn"
					variant="contained"
					sx={{ borderRadius: '10px', px: 5, py: 1.5 }}
					onClick={() => handleSubmit(email, password)}
				>
					Войти
				</Button>
			</FormControl>
		</section>
	);
};
