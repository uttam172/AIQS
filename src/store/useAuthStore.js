import axios from 'axios'
import { create } from 'zustand'

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession, getProviders } from 'next-auth/react'


const useAuthStore = create((set) => ({
    session: null,
    providers: null,
    loading: false,
    error: null,

    initializeAuth: async () => {
        try {
            set({ loading: true, error: null })

            const providers = await getProviders()
            set({ providers })

            set({ loading: false, error: null })
        } catch (err) {
            console.error('Error initializing auth:', err)
            set({ loading: false, error: 'Failed to initialize auth' })
        }
    },

    setSession: (session) => set({ session }),

    signIn: async (providerId) => {
        try {
            set({ loading: true, error: null })

            await nextAuthSignIn(providerId)

            set({ loading: false, error: null })
        } catch (err) {
            console.error('Sign in error:', err)
            set({ loading: false, error: 'Failed to sign in' })
        }
    },

    signOut: async () => {
        set({ loading: true })
        await signOut()
        set({ user: null, loading: false, error: null })
    },
    signOut: async () => {
        try {
            set({ loading: true, error: null })

            await nextAuthSignOut({ callbackUrl: '/' })
            set({ session: null, loading: false, error: null })
        } catch (err) {
            console.error('Sign out error:', err)
            set({ loading: false, error: 'Failed to sign out' })
        }
    },
}))

export default useAuthStore