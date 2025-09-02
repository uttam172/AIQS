'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import useAuthStore from '@/store/useAuthStore'

import Feed from '@/components/Feed'

const Home = () => {

    const { data: sessionData } = useSession()
    const setSession = useAuthStore((state) => state.setSession)

    useEffect(() => {
        setSession(sessionData || null)
    }, [sessionData, setSession])

    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br />
                <span className="orange_gradient text-center"> AI-Powerd Prompts</span>
            </h1>

            <p className="desc text-center">
                AIQS is an open-source AI prompting tool for modern world to discover, create and share creative prompts
            </p>

            <Feed />
        </section>
    )
}

export default Home