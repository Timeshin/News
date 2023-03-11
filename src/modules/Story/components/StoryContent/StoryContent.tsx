import { useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import StoryService from '../../services/story.service'
import dayjs from 'dayjs'

import { Box, Button, CircularProgress, Link, Typography } from '@mui/material'
import { Comment as CommentIcon } from '@mui/icons-material'
import { Loader } from '@/components'
import StoryCommentsList from '../StoryCommentsList/StoryCommentsList'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

interface IQueryParams {
	[key: string]: string | undefined
	storyId: string
}

const StoryContent = () => {
	const { storyId } = useParams<IQueryParams>()
	const navigate = useNavigate()
	const [commitsQty, setCommitsQty] = useState(0)
	const { data: storyData, isError, isLoading } = useFetch(() => StoryService.getStoryData(storyId || '0'))
	const {
		data: mainCommentsData,
		isLoading: isFirstCommentsLoading,
		refetch
	} = useFetch(() => StoryService.getCommentsData(storyData?.kids))

	const onCommentsRefreshHandler = () => {
		setCommitsQty(0)
		refetch()
	}

	const onGoBackHandler = () => {
		navigate('/')
	}

	if (isLoading) return <Loader />

	if (isError) {
		return (
			<Typography variant='h1' color='red'>
				Error
			</Typography>
		)
	}

	return (
		<>
			<Box
				onClick={onGoBackHandler}
				sx={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 1, top: 32, left: 32, cursor: 'pointer' }}
			>
				<KeyboardBackspaceIcon /> Go back
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
				<Link href={storyData?.url} mb={2} target='_blank'>
					{storyData?.title}
				</Link>
				<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
					<Typography variant='caption'>Author: {storyData?.by}</Typography>
					<Typography variant='caption' sx={{ fontWeight: 'bold', marginLeft: 1 }}>
						{dayjs.unix(storyData?.time || 0).format('YYYY-MM-DD HH:mm')}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', margin: '2px 0' }}>
					<div dangerouslySetInnerHTML={{ __html: storyData?.text as string }} />
				</Box>
				{commitsQty !== 0 && (
					<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<CommentIcon sx={{ marginRight: 1 }} />
							<Typography variant='caption'>{commitsQty} comments</Typography>
						</Box>
						<Button onClick={onCommentsRefreshHandler} variant='contained'>
							Refetch comments
						</Button>
					</Box>
				)}
				{!isFirstCommentsLoading ? (
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2 }}>
						<StoryCommentsList kidsIds={storyData?.kids} setCommitsQty={setCommitsQty} commentsData={mainCommentsData} />
					</Box>
				) : (
					<CircularProgress sx={{ marginTop: 5 }} />
				)}
			</Box>
		</>
	)
}

export default StoryContent
