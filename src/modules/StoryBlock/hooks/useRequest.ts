import { useCallback, useEffect, useState } from 'react'

let interval: ReturnType<typeof setInterval>

const useRequest = <T>(
	fetch: () => Promise<T>,
	delay = 60
): { data: T | undefined; refetch: () => void; isLoading: boolean; isSuccess: boolean; isError: boolean } => {
	const [data, setData] = useState<T>()
	const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'passive'>('passive')
	const requestData = useCallback(async () => {
		await fetch()
			.then((data) => {
				setData(data)
				setStatus('success')
			})
			.catch(() => {
				setStatus('error')
			})
	}, [fetch])
	const refetch = useCallback(() => {
		setData(undefined)
		setStatus('passive')
	}, [])

	useEffect(() => {
		if (status === 'loading' || status === 'error') return

		if (!data) {
			setStatus('loading')
			requestData()
		}

		interval = setInterval(() => {
			requestData()
		}, delay)

		return () => {
			clearInterval(interval)
		}
	}, [data, delay, requestData, status])

	return {
		data,
		refetch,
		isLoading: status === 'loading',
		isError: status === 'error',
		isSuccess: status === 'success'
	}
}

export default useRequest
