"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import useUserPostStore from "@/store/useUserPostStore"

import Profile from "@/components/Profile"
import Loading from "@/components/loading"

const UserProfile = ({ params }) => {

    const { posts, fetchPosts, loading, error } = useUserPostStore()

    const searchParams = useSearchParams()
    const userName = searchParams.get("name")

    useEffect(() => {
        if (params?.id) fetchPosts(params?.id)
    }, [params.id])

    if (loading) return <Loading />
    if (error) return <div className="text-red-500">error: {error}</div>

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
        />
    )
}

export default UserProfile