import axios from 'axios'
import { create } from 'zustand'

const useUserPromptStore = create((set, get) => ({
    userPrompts: [],
    loading: false,
    error: null,

    fetchUserPrompts: async (signedInUserId) => {
        try {
            set({ loading: true, userPrompts: [] })

            if (!signedInUserId) return set({ loading: false, error: 'Sign In First' })

            const res = await axios.get(`/api/users/${signedInUserId}/posts`)
            const data = res.data.data

            set({ loading: false, userPrompts: data })
        } catch (err) {
            console.log('Error fetching posts:', err)
            set({ loading: false, error: 'Failed to fetch Prompt' })
        }
    },

    createPrompt: async (promptData) => {
        const { prompt, userId, tag } = promptData
        try {
            set({ loading: true, error: null })

            const res = await axios.post('/api/prompt/new', { prompt, userId, tag })
            const data = res.data.data

            set({ loading: false, userPrompts: data })
        } catch (err) {
            console.log('Error creating prompt:', err)
            set({ loading: false, error: 'Failed to create prompt' })
        }
    },

    editPrompt: async (promptData) => {

    },

    deletePrompt: async (promptId) => {
        try {
            set({ loading: true, error: null })

            await axios.delete(`/api/prompt/${promptId}`)

            const newData = get().userPrompts.filter(p => p._id !== promptId)
            
            set({ loading: false, userPrompts: newData })
        } catch (err) {
            console.log('Error deleting prompt:', err)
            set({ loading: false, error: 'Failed to delete prompt' })
        }
    },

}))

export default useUserPromptStore
