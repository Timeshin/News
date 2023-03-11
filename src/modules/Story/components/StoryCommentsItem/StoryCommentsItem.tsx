import { Dispatch, useState, SetStateAction, FC } from 'react'
import dayjs from 'dayjs'

import { Box, Typography } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import { IComment } from '@/types/common.types'
import StoryCommentsList from '../StoryCommentsList/StoryCommentsList'

interface IStoryCommentsItem {
	comment: IComment
	setCommitsQty: Dispatch<SetStateAction<number>>
}

const StoryCommentsItem: FC<IStoryCommentsItem> = ({ comment: { time, by, text, kids }, setCommitsQty }) => {
	const [loadNestedComments, setLoadNestedComments] = useState(false)
	const onLoadCommentsHandler = () => {
		setLoadNestedComments(true)
	}

	return (
		<Box
			onClick={onLoadCommentsHandler}
			sx={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column',
				alignItems: 'flex-start',
				padding: 2,
				cursor: 'pointer'
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
				<Typography variant='caption'>Author: {by}</Typography>
				<Typography variant='caption' sx={{ fontWeight: 'bold', marginLeft: 1 }}>
					{dayjs.unix(time).format('YYYY-MM-DD HH:mm')}
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', margin: '2px 0' }}>
				<div dangerouslySetInnerHTML={{ __html: text || '' }} />
			</Box>
			{kids && (
				<Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
					<CommentIcon sx={{ marginRight: 1 }} />
					<Typography variant='caption'>{kids.length} comments</Typography>
				</Box>
			)}
			{kids && loadNestedComments && (
				<Box sx={{ marginLeft: 4 }}>
					<StoryCommentsList kidsIds={kids} setCommitsQty={setCommitsQty} />
				</Box>
			)}
		</Box>
	)
}

export default StoryCommentsItem
