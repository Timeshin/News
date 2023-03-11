import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Loader } from '@/components'

const StoriesPage = lazy(() => import('@/pages/StoriesPage'))
const StoryPage = lazy(() => import('@/pages/StoryPage'))

const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route path='/' element={<StoriesPage />} />
			<Route path='/story/' element={<StoryPage />}>
				<Route path=':storyId' element={<StoryPage />} />
			</Route>
			<Route path='*' element={<StoriesPage />} />
		</Routes>
	</Suspense>
)

export default App
