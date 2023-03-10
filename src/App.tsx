import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Loader } from '@/components'

const MainPage = lazy(() => import('@/pages/MainPage'))

const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/story/:storyId' element={<h1>Story</h1>} />
			<Route path='*' element={<MainPage />} />
		</Routes>
	</Suspense>
)

export default App
