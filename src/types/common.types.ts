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
	text?: string
	dead?: boolean
}

interface IComment extends Pick<IStory, 'by' | 'time' | 'id' | 'kids' | 'text' | 'dead'> {
	type: 'commit'
	parent: number
}

export type { IStory, IComment }
