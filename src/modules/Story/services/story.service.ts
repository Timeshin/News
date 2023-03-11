import { AxiosInstance } from 'axios'
import fetchInstance from '@/config/fetchInstance'
import type { IComment, IStory } from '@/types/common.types'

class StoryService {
	private readonly apiInstance: AxiosInstance

	constructor(api: AxiosInstance) {
		this.apiInstance = api
	}

	public async getStoryData(storyId: string) {
		const storyResult = await this.apiInstance.get<IStory>(`item/${storyId}.json`).then(({ data }) => data)
		const resultData: IStory = {
			text: storyResult.text || 'No text',
			...storyResult
		}

		return resultData
	}

	public async getCommentsData(commentsIds: number[] | undefined) {
		if (!commentsIds) return

		const promisesArray = commentsIds.map((commentId) =>
			this.apiInstance.get<IComment>(`item/${commentId}.json`).then(({ data }) => data)
		)
		const commentsData = await Promise.allSettled(promisesArray).then((result) =>
			result.filter((promiseResult) => promiseResult.status === 'fulfilled' && promiseResult.value)
		)
		const resultComments = (commentsData as PromiseFulfilledResult<IComment>[]).map(({ value }) => value)

		return resultComments
	}
}

export default new StoryService(fetchInstance)
