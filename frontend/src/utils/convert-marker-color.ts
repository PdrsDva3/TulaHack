export const convertMarkerColor = (problems: string): string => {
	switch (problems) {
		case 'bad':
			return '#FF0303';
		case 'old':
			return '#FF0303';
		case 'in_process':
			return '#F47544';
		case 'no_see':
			return '#F47544';
		case 'see':
			return '#33A200';
		default:
			return '#989898';
	}
};
