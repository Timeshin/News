import { AxiosInstance } from 'axios'
import fetchInstance from '@/config/fetchInstance'
import type { IStory } from '@/types/common.types'

class StoriesService {
	private readonly apiInstance: AxiosInstance

	constructor(api: AxiosInstance) {
		this.apiInstance = api
	}

	private async getNewStoriesIds() {
		return this.apiInstance.get<number[]>('newstories.json?orderBy="$key"&limitToFirst=100').then(({ data }) => data)
	}

	public async getStoriesData() {
		const bestStoriesIds = await this.getNewStoriesIds()
		const promisesArray = bestStoriesIds.map((storyId) =>
			this.apiInstance.get<IStory>(`item/${storyId}.json`).then(({ data }) => data)
		)

		const storiesData = await Promise.allSettled(promisesArray).then((result) =>
			result.filter((promiseResult) => promiseResult.status === 'fulfilled' && promiseResult?.value)
		)
		const resultStories: IStory[] = (storiesData as PromiseFulfilledResult<IStory>[])
			.map(({ value }) => value)
			.sort((a, b) => a.time - b.time)

		return resultStories
	}
}

export default new StoriesService(fetchInstance)
