'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import useUserPromptStore from "@/store/useUserPromptStore"
import useAuthStore from "@/store/useAuthStore"

import Form from '@/components/Form'

const CreatePrompt = () => {

    const router = useRouter()

    const { createPrompt } = useUserPromptStore()
    const { session} = useAuthStore()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitting(true)

        await createPrompt({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag,
            likedBy: [],
        })

        router.push("/")
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleSubmit}
        />
    )
}

export default CreatePrompt