import { Button, Typography } from "@mui/material"
import dowload from '../../assets/svg/dowload.svg'

export const DowloadButton = () => {
	return (
		<Button
			sx={{backgroundColor:"common.white", borderRadius:"10px", display:"flex", gap:2, justifyContent:"center"}}
		>
			<img src={dowload}/>
			<Typography
			 	variant="h5"
				color="common.black"
			>
				Скачать последний отчет
			</Typography>
		</Button>
	)
}
