import React from 'react';
import { Container, Box, Typography } from '@mui/material';

interface PhotoCardProps {
	photo_base64: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo_base64 }) => (
	<Container
		sx={{
			backgroundColor: 'common.white',
			borderRadius: '20px',
			gap: 2,
			display: 'flex',
			flexDirection: 'column',
			maxHeight: '400px',
			py: 2,
			boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
		}}
	>
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
			<Typography variant="h2">Последние фото</Typography>
		</Box>
		<img
			src={`data:image/jpeg;base64,${photo_base64}`}
			alt="Фото точки"
			style={{
				maxHeight: '320px',
				borderRadius: '10px',
				objectFit: 'contain', // Ensure the image does not stretch, keeps its aspect ratio
				width: '100%', // Make the image width responsive
			}}
		/>
	</Container>
);
