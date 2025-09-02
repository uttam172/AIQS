"use client"

import { useEffect } from "react"

import useAuthStore from "@/store/useAuthStore"
import useUserPromptStore from "@/store/useUserPromptStore"

import Profile from "@/components/Profile"

const UserProfile = () => {

    const { session } = useAuthStore()
    const { userPrompts, fetchUserPrompts } = useUserPromptStore()
    
    console.log(session?.user.name)
    useEffect(() => {
        fetchUserPrompts(session?.user.id)
    }, [session])

    return (
        <Profile
            name={session?.user.name}
            desc={`Welcome to ${session?.user.name}'s personalized profile page. Explore ${session?.user.name}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPrompts}
        />
    );
};

export default UserProfile