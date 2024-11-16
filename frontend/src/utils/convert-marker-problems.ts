export const convertMarkerProblems = (problems: string): string => {
	switch (problems) {
		case 'bad':
			return 'Обнаружена в';
		case 'old':
			return 'Не вывозили более 3-х дней на';
		case 'in_process':
			return 'В работе на';
		case 'no_see':
			return 'Не посещена на';
		case 'see':
			return 'Обслужена';
		default:
			return 'Неизвестно на';
	}
};
