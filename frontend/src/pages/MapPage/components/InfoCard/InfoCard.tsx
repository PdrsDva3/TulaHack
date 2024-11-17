import { Box, Button, Chip, Container, Typography } from '@mui/material';
import dowload from '../../../../assets/svg/dowload.svg';
import axios from 'axios';
import { convertMarkerColor, convertMarkerProblems, formatDate } from '../../../../utils';

interface InfoCardProps {
	address: string;
	lat: string;
	lon: string;
	problems: string;
	containers: {
		Place: number;
		Container: number;
	};
	ts_2: string;
	isGarbage: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({
	address,
	lat,
	lon,
	problems,
	containers,
	ts_2,
	isGarbage,
}) => {
	const getLastReport = async (lat: string, lon: string) => {
		try {
			// Отправляем запрос с JSON данными
			const response = await axios.post(
				'http://82.97.249.28:8000/report/today',
				{
					lat: lat,
					lon: lon,
				},
				{
					headers: {
						'x-device-id': 'stuff',
						'Content-Type': 'application/json', // Используем JSON
					},
					responseType: 'blob', // Ожидаем файл (blob)
				},
			);

			// Проверяем MIME-тип
			const mimeType = response.headers['content-type'];
			if (mimeType) {
				const file = new Blob([response.data], { type: mimeType });
				const fileURL = URL.createObjectURL(file);
				const a = document.createElement('a');
				a.href = fileURL;
				a.download = `report_${Date.now()}.docx`; // Задаем имя файла для скачивания
				a.click();
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error);
		}
	};

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				maxHeight: '300px',
				backgroundColor: 'common.white',
				borderRadius: '20px',
				my: 2,
				py: 3,
				boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					gap: 1,
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Chip
					label="Данные КП"
					component="h3"
					color="primary"
					sx={{ borderRadius: '5px' }}
				/>
				<Button
					sx={{
						backgroundColor: 'common.white',
						borderRadius: '10px',
						display: 'flex',
						gap: 2,
						justifyContent: 'center',
					}}
					onClick={() => getLastReport(lat, lon)}
				>
					<img src={dowload} />
					<Typography variant="h5" color="common.black">
						Скачать последний отчет
					</Typography>
				</Button>
			</Box>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
			>
				<Typography variant="h4">Адрес:</Typography>
				<Typography variant="h5" sx={{ color: 'secondary.dark' }}>
					{address}
				</Typography>
			</Box>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
			>
				<Typography variant="h4">Координаты:</Typography>
				<Typography variant="h5" sx={{ color: 'secondary.dark' }}>
					{lat}, {lon}
				</Typography>
			</Box>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
			>
				<Typography variant="h4">Проблема:</Typography>
				<Chip
					label={`${convertMarkerProblems(problems)} ${formatDate(ts_2)}`}
					component="p"
					color="secondary"
					sx={{
						borderRadius: '5px',
						backgroundColor: isGarbage ? '#0000FF' : `${convertMarkerColor(problems)}`,
						color: 'white',
					}}
				/>
			</Box>
			{/* <Divider variant="middle" sx={{ width: '100%', color: 'primary', py: 1, m: 0 }} /> */}
			<Box
				sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 5 }}
			>
				<Typography variant="h4">Контейнеры:</Typography>
				{containers.Container ? (
					<Typography variant="h5" sx={{ color: 'secondary.dark' }}>
						{containers.Container} шт.
					</Typography>
				) : (
					<Typography variant="h5" sx={{ color: 'secondary.dark' }}>
						Не определено
					</Typography>
				)}
			</Box>
		</Container>
	);
};
