import axios from 'axios'
import { create } from 'zustand'

const useUserPostStore = create((set) => ({
    posts: [],
    loading: false,
    error: null,

    fetchPosts: async (signedInUserId) => {
        try {
            set({ loading: true , posts: [] })

            if (!signedInUserId) return set({ loading: false , error: 'Sign In First'})

            const res = await axios.get(`/api/users/${signedInUserId}/posts`)
            const data = res.data.data

            set({ loading: false, posts: data })
        } catch (err) {
            console.log('Error fetching posts:', err)
            set({ loading: false, error: 'Failed to fetch posts' })
        }
    },
}))

export default useUserPostStore