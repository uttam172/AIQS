'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Swal from "sweetalert2"
import axios from "axios"

import Profile from '@/components/Profile'

const MyProfile = () => {

    const router = useRouter()
    const { data: session } = useSession()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`/api/users/${session?.user.id}/posts`)
            const data = await response.data

            setPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, [])

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
                try {
                    await axios.delete(`/api/prompt/${post._id.toString()}`)

                    const filteredPosts = posts.filter((p) => p._id !== post._id)
                    
                    setPosts(filteredPosts)
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile