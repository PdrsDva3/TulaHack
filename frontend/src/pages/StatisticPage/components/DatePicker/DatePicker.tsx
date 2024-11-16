import { Container } from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { DemoItem } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"

export const DatePicker = () => {
	return(
		<Container>
			<DemoItem label="Выберите дату">
				<DesktopDatePicker defaultValue={dayjs('2024-11-17')}/>
			</DemoItem>
		</Container>
	)
}
