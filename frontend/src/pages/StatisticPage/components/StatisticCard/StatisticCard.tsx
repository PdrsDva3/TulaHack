import { PieChart, PieChartProps } from '@mui/x-charts';
import { Box, Chip, Container } from '@mui/material';

interface StatisticCardProps extends PieChartProps {
	title: string;
	palette: string[];
	desc: string[];
	data: { id: number; value: number }[]; // Данные диаграммы передаются через пропсы
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
	title,
	palette,
	desc,
	data,
	series,
}) => {
	return (
		<Container
			sx={{
				backgroundColor: 'common.white',
				borderRadius: '20px',
				boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
				display: 'flex',
				maxWidth: '400px',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				py: 2,
				gap: 2,
			}}
		>
			<Chip label={title} sx={{ backgroundColor: 'common.white' }} component="h1" />
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Box>
					<PieChart
						sx={{ display: 'flex', justifyContent: 'center' }}
						colors={palette}
						series={[
							{
								data, // Используем переданные данные
								outerRadius: 60,
								innerRadius: 30,
							},
						]}
						slotProps={{
							legend: { hidden: false },
						}}
						width={220}
						height={130}
					/>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{data.map((item, index) => (
						<Chip
							key={index}
							label={`${item.value} ${desc[index] || ''}`} // Используем соответствующее описание
							sx={{
								backgroundColor: palette[index] || 'gray', // Цвета для каждого элемента
								color: 'common.white',
							}}
						/>
					))}
				</Box>
			</Box>
		</Container>
	);
};
