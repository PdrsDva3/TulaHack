import { PieChart, PieChartProps } from '@mui/x-charts';
import { Box, Chip, Container } from '@mui/material';

interface StatisticCardProps extends PieChartProps {
	title: string;
	palette: string[];
	desc: string[];
}

const data = [
	{ id: 0, value: 10 },
	{ id: 1, value: 15 },
	{ id: 2, value: 20 },
];

export const StatisticCard: React.FC<StatisticCardProps> = ({
	title,
	series,
	palette,
	desc,
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
						series={series}
						slotProps={{
							legend: { hidden: false },
						}}
						width={220}
						height={130}
					/>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{data.map((item, index) => {
						return (
							<Chip
								key={index}
								label={`${item.value} ${desc[index]}`}
								sx={{ backgroundColor: palette[index], color: 'common.white' }}
							/>
						);
					})}
				</Box>
			</Box>
		</Container>
	);
};
