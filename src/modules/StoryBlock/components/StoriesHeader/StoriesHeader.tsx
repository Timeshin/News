import { TableCell, TableHead, TableRow } from '@mui/material'

const StoriesHeader = () => (
	<TableHead>
		<TableRow>
			<TableCell>Title</TableCell>
			<TableCell align='right'>Rate</TableCell>
			<TableCell align='right'>Nick name</TableCell>
			<TableCell align='right'>Date</TableCell>
		</TableRow>
	</TableHead>
)

export default StoriesHeader
