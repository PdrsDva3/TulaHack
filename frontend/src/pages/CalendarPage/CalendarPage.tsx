import { Button, Container, Grid2, Typography } from "@mui/material"
import { FC } from "react"
import { CalendarCard } from "../DashboardPage/components"
import dowload from '../../assets/svg/dowload.svg'

export const CalendarPage: FC = () => {
	return(
		<Grid2 container spacing={4}
			sx={{
				display:"flex",
				flexDirection:"column",
				justifyContent:'center',
				alignItems:'center',
				my:6}}>
			<Grid2  size={8} sx={{display:"flex", justifyContent:"space-between"}}>
				<Container
					sx={{
						display: 'flex',
						width:"20vw",
						gap: 2,
						backgroundColor: 'common.white',
						borderRadius: '10px',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)'
					}}
				>
					<Typography variant="h4" color="secondary.dark" sx={{py:2}}>
						Отчет за 19.09.2024 - 12.10.2024
					</Typography>
				</Container>

				<Container
					sx={{
						display: 'flex',
						width:"20vw",
						gap: 2,
						backgroundColor: 'common.white',
						borderRadius: '10px',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)'
					}}
				>
					<Typography variant="h4" color="secondary.dark" sx={{py:4}}>
						КП 20314535 на просп. Ленина 12
					</Typography>
				</Container>

				<Button
					sx={{
						backgroundColor: 'common.white',
						borderRadius: '10px',
						display: 'flex',
						gap: 2,
						justifyContent: 'center',
						boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)'
					}}
				>
					<img src={dowload} />
					<Typography variant="h5" color="common.black">
						Скачать последний отчет
					</Typography>
				</Button>
			</Grid2>

			<Grid2 size={8} sx={{display:"flex", gap:8}}>
				<CalendarCard/>
				<Container
					sx={{
						backgroundColor:"secondary.dark",
						height:"29vw",
						borderRadius:"10px"
					}}
				></Container>
			</Grid2>
		</Grid2>
	)
}
