import { create } from 'zustand'
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, getProviders } from 'next-auth/react'

const useAuthStore = create((set) => ({
    session: null,
    providers: null,
    loading: false,
    error: null,

    initializeAuth: async () => {
        try {
            set({ error: null })

            const providers = await getProviders()
            set({ providers })

            set({ error: null })
        } catch (err) {
            console.error('Error initializing auth:', err)
            set({ error: 'Failed to initialize auth' })
        }
    },

    setSession: (session) => set({ session }),

    signIn: async (providersId) => {
        try {
            set({ error: null })

            await nextAuthSignIn(providersId)

            set({ error: null })
        } catch (err) {
            console.error('Sign in error:', err)
            set({ error: 'Failed to sign in' })
        }
    },

    signOut: async () => {
        try {
            set({ loading: true, error: null })

            await nextAuthSignOut({ redirect: false })

            set({ session: null, loading: false, error: null })
        } catch (err) {
            console.error('Sign out error:', err)
            set({ loading: false, error: 'Failed to sign out' })
        }
    },
}))

export default useAuthStore