import { Dispatch, FC, SetStateAction, useEffect, memo } from 'react'
import useFetch from '@/hooks/useFetch'
import StoryService from '../../services/story.service'

import { CircularProgress } from '@mui/material'
import { IComment } from '@/types/common.types'
import StoryCommentsItem from '../StoryCommentsItem/StoryCommentsItem'

interface IStoryComments {
	kidsIds: number[] | undefined
	setCommitsQty: Dispatch<SetStateAction<number>>
	commentsData?: IComment[]
}

const StoryCommentsList: FC<IStoryComments> = ({ kidsIds, setCommitsQty, commentsData }) => {
	const { data, isLoading: isFirstCommentsLoading } = useFetch(
		() => StoryService.getCommentsData(kidsIds),
		undefined,
		!!commentsData
	)

	useEffect(() => {
		setCommitsQty((prevQty) => (prevQty += kidsIds?.length || 0))
	}, [])

	if (isFirstCommentsLoading) return <CircularProgress />

	return (
		<>
			{(commentsData ? commentsData : data)?.map((comment) => (
				<StoryCommentsItem key={comment.id} comment={comment} setCommitsQty={setCommitsQty} />
			))}
		</>
	)
}

export default memo(StoryCommentsList)
