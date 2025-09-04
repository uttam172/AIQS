import axios from 'axios'
import { create } from 'zustand'

const usePromptStore = create((set) => ({
    prompts: [],
    loading: false,
    error: null,

    fetchPrompts: async () => {
        try {
            set({ loading: true , prompts: [] })

            const res = await axios.get(`/api/prompt`)
            const data = res.data.data

            set({ loading: false, prompts: data })
        } catch (err) {
            console.log('Error fetching posts:', err)
            set({ loading: false, error: 'Failed to fetch posts' })
        }
    },

    likePrompt: async (promptId, userId) => {
        try {
            const res = await axios.patch(`/api/prompt/${promptId}/likes`, { userId })
            return res.data
        } catch (err) {
            console.log('Error liking prompt:', err)
            set({ error: 'Failed to like prompt' })
        }
    }
}))

export default usePromptStore