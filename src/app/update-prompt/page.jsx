"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

import axios from "axios"

import useUserPromptStore from "@/store/useUserPromptStore"

import Form from '@/components/Form'
import Loading from "@/components/loading"

const UpdatePrompt = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const promptId = searchParams.get("id")

    const { editPrompt, fetchPromptById } = useUserPromptStore()

    const [post, setPost] = useState({ prompt: "", tag: "", })
    const [submitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const setData = async () => {
            const data = await fetchPromptById(promptId)
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        setData()
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (!promptId) return alert("Missing PromptId!")

        editPrompt(post)

        try {
            const response = await axios.patch(`/api/prompt/${promptId}`, {
                prompt: post.prompt,
                tag: post.tag,
            })

            if (response.data.success) {
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Suspense fallback={<Loading />}>
            <Form
                type='Edit'
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </Suspense>
    )
}

export default UpdatePrompt