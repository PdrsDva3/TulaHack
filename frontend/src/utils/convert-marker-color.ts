export const convertMarkerColor = (problems: string): string => {
	switch (problems) {
		case 'bad':
			return '#FF0303';
		case 'old':
			return '#FF0303';
		case 'in_process':
			return '#FFA500';
		case 'no_see':
			return '#FFA500';
		case 'see':
			return '#008000';
		default:
			return '#989898';
	}
};
