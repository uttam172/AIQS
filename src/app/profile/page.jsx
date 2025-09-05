'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import Swal from "sweetalert2"

import useAuthStore from "@/store/useAuthStore"
import useUserPromptStore from "@/store/useUserPromptStore"

import Profile from '@/components/Profile'

const MyProfile = () => {

    const router = useRouter()
    const { session } = useAuthStore()
    const { userPrompts, fetchUserPrompts, deletePrompt } = useUserPromptStore()

    useEffect(() => {
        const loadData = async () => {
            await fetchUserPrompts(session?.user.id)
        }
        loadData()
    }, [session])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deletePrompt(post._id.toString())
            }
        })
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={userPrompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile