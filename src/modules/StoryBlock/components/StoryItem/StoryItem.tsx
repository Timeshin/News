import { FC } from 'react'
import type { IStory } from '../../types/newsService.types'
import dayjs from 'dayjs'

import { TableCell, TableRow } from '@mui/material'

interface INewsItem {
	onOpenNewsStoryHandler: (id: number) => void
	story: IStory
}

const StoryItem: FC<INewsItem> = ({ onOpenNewsStoryHandler, story: { title, time, score, by, id } }) => (
	<TableRow
		hover
		sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
		onClick={() => onOpenNewsStoryHandler(id)}
	>
		<TableCell component='th' scope='row'>
			{title}
		</TableCell>
		<TableCell align='right'>{score}</TableCell>
		<TableCell align='right'>{by}</TableCell>
		<TableCell align='right'>{dayjs.unix(time).format('YYYY-DD-MM')}</TableCell>
	</TableRow>
)

export default StoryItem
