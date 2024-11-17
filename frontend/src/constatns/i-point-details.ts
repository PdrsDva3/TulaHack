export interface PointDetails {
	id: number;
	address: string;
	lat: string;
	lon: string;
	last_ts: string;
	problems: string;
	containers: {
		Place: number;
		Container: number;
	};
	ts_1: string;
	ts_2: string;
	photo_1: string;
	photo_2: string;
	other_trash: number;
	status: string;
}

export interface PointDetailsWithGarbage extends PointDetails {
	isGarbage: boolean;
}
