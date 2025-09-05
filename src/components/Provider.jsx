'use client'

import { useEffect } from "react"
import useAuthStore from "@/store/useAuthStore"
import { SessionProvider, useSession } from "next-auth/react"

const SessionSync = () => {
    const { data: sessionData } = useSession()
    const setSession = useAuthStore((state) => state.setSession)

    const { initializeAuth } = useAuthStore()

    useEffect(() => {
        setSession(sessionData || null)
    }, [sessionData, setSession])

    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    return null
}

const Provider = ({ children, session }) => {
    return (
        <SessionProvider session={session} refetchInterval={0} refetchOnWindowFocus={false}>\
            <SessionSync />
            {children}
        </SessionProvider>
    )
}

export default Provider