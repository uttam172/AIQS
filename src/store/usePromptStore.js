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
}))

export default usePromptStore