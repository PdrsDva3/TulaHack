import dayjs from 'dayjs';

export const calculateLightDay = () => {
	const today = dayjs();
	const startOfDay = today.startOf('day').add(6, 'hour'); // Assume sunrise at 6:00 AM
	const endOfDay = today.startOf('day').add(18, 'hour'); // Assume sunset at 6:00 PM
	return { startOfDay, endOfDay };
};
