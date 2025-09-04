'use client'

import { useState } from "react"
import Image from 'next/image'
import { usePathname } from "next/navigation"
import useAuthStore from "@/store/useAuthStore"

import { copy, liked, tick, unliked } from "@/assets/icons"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

    const pathName = usePathname()

    const { session } = useAuthStore()

    const [copied, setCopied] = useState('')

    const [isLiked, setIsLiked] = useState(false)

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(""), 3000)
    }

    const handleLike = async (pid) => {
        setIsLiked(!isLiked)
        console.log(pid, " - ", session?.user.id)
        // await likePrompt(post.id, session?.user.id)
        // await fetchUserPrompts(session?.user.id)
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator?.image}
                        alt="userImage"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.creator?.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator?.email}
                        </p>
                    </div>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? tick : copy }
                        alt="copy"
                        width={25}
                        height={25}
                    />
                </div>
            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>

            <span className="" onClick={() => handleLike(post._id)}>
                <Image src={isLiked ? liked : unliked} alt="like" width={25} height={25} className="my-3 size-4 cursor-pointer"/> {post.likes}
            </span>

            <div className="flex flex-wrap justify-content-start items-stretch gap-1">
                {post.tag.split(' ').map((tag) => (
                    <p
                        className="font-inter text-sm blue_gradient cursor-pointer"
                        key={tag}
                        onClick={() => handleTagClick && handleTagClick(tag)}
                    >
                        {tag}
                    </p>
                ))}
            </div>

            {session?.user.id === post.creator?._id && pathName === '/profile' && (
                <div className="mt-5 flex-center gap-4 border-t  border-gray-300 pt-3">
                    <p
                        className="font-inter text-sm green_gradient cursor-pointer"
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className="font-inter text-sm orange_gradient cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}

export default PromptCard