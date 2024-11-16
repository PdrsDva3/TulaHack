import { FC } from 'react';
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
import { Button, TextField, Typography } from '@mui/material';
import './LoginPage.scss';

export const LoginPage: FC = () => {
	return (
		<section className="login">
			<div className="main_wrapper">
				<div>
					<img src={left_grey_house} className="left_grey_house" />
					<img src={left_white_house} className="left_white_house" />
					<img src={left_grey_window} className="left_grey_window" />
					<img src={left_orange_house} className="left_orange_house" />
					<img src={left_orange_window} className="left_orange_window" />
					<img src={left_white_window} className="left_white_window" />
					<img src={line} className="line" />
					<img src={line} className="line1" />
					<img src={right_grey_house} className="right_grey_house" />
					<img src={right_grey_window} className="right_grey_window" />
					<img src={right_orange} className="right_orange" />
					<img src={right_white_house} className="right_white_house" />
					<img src={right_white_window} className="right_white_window" />
					<img src={right_white} className="right_white" />
				</div>
				<div className="line_wrap">
					<img src={one} className="one" />
					<img src={two} className="two" />
					<img src={three} className="three" />
					<img src={four} className="four" />
					<img src={five} className="five" />
					<img src={six} className="six" />
					<img src={seven} className="seven" />
					<img src={eight} className="eight" />
					<img src={nine} className="nine" />
					<img src={left_grey_house} className="left_grey_house" />
					<img src={left_white_house} className="left_white_house" />
					<img src={left_grey_window} className="left_grey_window" />
					<img src={left_orange_house} className="left_orange_house" />
					<img src={left_orange_window} className="left_orange_window" />
					<img src={left_white_window} className="left_white_window" />
					<img src={line} className="line" />
					<img src={line} className="line1" />
					<img src={right_grey_house} className="right_grey_house" />
					<img src={right_grey_window} className="right_grey_window" />
					<img src={right_orange} className="right_orange" />
					<img src={right_white_house} className="right_white_house" />
					<img src={right_white_window} className="right_white_window" />
					<img src={right_white} className="right_white" />
				</div>
			</div>
			<form className="login_form">
				<Typography className="title" id="title" variant="h3" sx={{ mt: 3 }}>
					Вход в систему
				</Typography>

				<TextField
					id="login_user_email"
					label="Почта"
					sx={[
						{ color: 'secondary.main', width: '0.9', backgroundColor: 'common.white' },
						{ '&:autofill': { backgroundColor: 'common.white' } },
					]}
				/>

				<TextField
					id="login_user_password"
					label="Пароль"
					sx={{ color: 'secondary.main', width: '0.9' }}
					type="password"
					name="password"
				/>
				<Button
					type="submit"
					className="login__btn"
					variant="contained"
					sx={{ borderRadius: '10px', px: 5, py: 1.5, mt: 'auto', mb: 3 }}
				>
					Войти
				</Button>
			</form>
		</section>
	);
};
