import { Route, Routes } from 'react-router-dom';
import { DashboardPage, LoginPage, NotFoundPage, RootLayout, MapPage, StatisticPage, CalendarPage } from '../pages';


export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/" element={<RootLayout />}>
				<Route index element={<DashboardPage />} />
				<Route path="monitoring" element={<MapPage />} />
				<Route path="statistic" element={<StatisticPage/>}/>
				{/*	<Route path=":date" element={<ReportPage/>}/>*/}
				{/*</Route >*/}
				<Route path="calendar" element={<CalendarPage/>}/>
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
