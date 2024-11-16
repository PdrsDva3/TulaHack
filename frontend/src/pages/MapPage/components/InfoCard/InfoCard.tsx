import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import { DowloadButton } from '../../../../components/DowloadButton/DowloadButton';

export const InfoCard = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '28.472vw',
				gap: 2,
				backgroundColor:"common.white",
				borderRadius:"20px",
				my:2,
				py:3,
				boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)'
			}}
		>
			<Box sx={{ display: 'flex', gap: 9 }}>
				<Chip
					label="Данные КП"
					component="h3"
					color="primary"
					sx={{ borderRadius: '5px' }}
				/>
				<DowloadButton />
			</Box>

			<Box
				className="adress_field"
				sx={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<Typography variant="h4">Адрес:</Typography>
				<Typography variant="h5" sx={{ color: 'secondary.dark' }}>
					ул. Поляны д. 9
				</Typography>
			</Box>

			<Box
				className="coordinates_field"
				sx={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<Typography variant="h4">Координаты:</Typography>
				<Typography variant="h5" sx={{ color: 'secondary.dark' }}>
					12.12345678, 23.123456789
				</Typography>
			</Box>

			<Box
				className="problem_field"
				sx={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<Typography variant="h4">Проблема:</Typography>
				<Chip
					label="Обнаружена в 9:20"
					component="p"
					color="error"
					sx={{ borderRadius: '5px' }}
				/>
			</Box>

			<Box className="bot_messege_field" sx={{ display: 'flex', gap: 1 }}>
				<Typography variant="h6" color="secondary.dark">
					Уведомление от чат-бота:
				</Typography>
				<Typography variant="h6" color="secondary.dark">
					Отправлено
				</Typography>
			</Box>

			<Box className="container_field">
				<Typography variant="h4" sx={{ display: 'flex', justifyContent: 'left' }}>
					Контейнеры:
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
					<Typography variant="h6">кол-во</Typography>
					<Typography variant="h6">тип</Typography>
					<Typography variant="h6">статус</Typography>
				</Box>
				<Divider variant="middle" sx={{ width: '25vw', color: 'primary', py: 1 }} />
				<Box sx={{ display: 'flex', justifyContent: 'space-around', pl:4 }}>
					<Typography variant="h6" color="secondary.dark">
						5
					</Typography>
					<Typography variant="h6" color="secondary.dark">
						стандартный
					</Typography>
					<Typography variant="h6" color="secondary.dark">
						в работе
					</Typography>
				</Box>
			</Box>
		</Container>
	);
};
