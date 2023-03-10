import { Button, Paper, Skeleton, Table, TableBody, TableContainer, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/useRequest'
import NewsService from '../../services/news.service'
import StoriesHeader from '../StoriesHeader/StoriesHeader'
import StoryItem from '../StoryItem/StoryItem'

const StoriesList = () => {
	const { data, isLoading, isError, refetch } = useRequest(NewsService.getStoriesData.bind(NewsService), 60000)
	const navigate = useNavigate()

	const onOpenNewsStoryHandler = (storyId: number) => {
		navigate(`story/${storyId}`)
	}

	if (isLoading)
		return (
			<Container sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Paper elevation={0} sx={{ width: '100%', height: '90vh', overflow: 'hidden' }}>
					{[...Array(10).keys()].map((number) => (
						<Skeleton key={number} width='100%' height='70px' animation='wave' />
					))}
				</Paper>
			</Container>
		)

	if (isError)
		return (
			<Typography variant='h1' color='red'>
				Error
			</Typography>
		)

	return (
		<Container sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Button onClick={refetch} sx={{ position: 'absolute', top: '5%', right: '5%' }} variant='contained'>
				Refetch
			</Button>
			<Paper elevation={1} variant='elevation' sx={{ width: '100%', height: '90vh', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: '100%', maxWidth: '100%' }}>
					<Table stickyHeader>
						<StoriesHeader />
						<TableBody>
							{data?.map((story) => (
								<StoryItem key={story.id} onOpenNewsStoryHandler={onOpenNewsStoryHandler} story={story} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	)
}

export default StoriesList
