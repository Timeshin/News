interface IStory {
	by: string
	descendants: number
	id: number
	kids: number[]
	score: number
	time: number
	title: string
	type: 'story'
	url: string
}

export type { IStory }
