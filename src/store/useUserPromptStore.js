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

    fetchPromptById: async (promptId) => {
        try {
            set({ loading: true })

            const res = await axios.get(`/api/prompt/${promptId}`)

            set({ loading: false })
            return res.data.data
        } catch (err) {
            console.log('Error fetching by ID prompt:', err)
            set({ loading: false, error: 'Failed to fetch Prompt by ID' })
        }
    },

    createPrompt: async (promptData) => {
        const { prompt, userId, tag, likedBy } = promptData
        try {
            set({ loading: true, error: null })

            const res = await axios.post('/api/prompt/new', { prompt, userId, tag, likedBy })
            const data = res.data.data

            set({ loading: false, userPrompts: data })
        } catch (err) {
            console.log('Error creating prompt:', err)
            set({ loading: false, error: 'Failed to create prompt' })
        }
    },

    editPrompt: async (promptId, promptData) => {
        const { prompt, tag } = promptData
        try {
            set({ loading: true, error: null })

            const res = await axios.patch(`/api/prompt/${promptId}`, { prompt, tag })

            set({ loading: false })
            return res.data
        } catch (err) {
            console.log('Error updating prompt:', err)
            set({ loading: false, error: 'Failed to update prompt' })
        }
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

    likedByUser: async (promptId, userId) => {
        try {
            const res = await axios.post(`/api/prompt/${promptId}/like`, { userId })
            return res.data
        } catch (err) {
            console.log('Error liking prompt:', err)
            set({ error: 'Failed to like prompt' })
        }
    }

}))

export default useUserPromptStore
