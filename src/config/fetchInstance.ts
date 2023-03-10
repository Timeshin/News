import axios from 'axios'

const fetchInstance = axios.create({
	baseURL: process.env.API_URL
})

export default fetchInstance
