import { connectToDB } from "@/utils/database"
import Prompt from '@/models/prompt'

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 })
    }
}

export const Likes = async (req, { params }) => {
    const { userId } = await req.json()
    const { id: promptId } = params

    try {
        await connectToDB()

        let prompt = await Prompt.findById(promptId)

        if (!prompt) {
            return new Response("Prompt not found", { status: 404 })
        }

        const hasLiked = prompt.likes.some((id) => id.toString() === userId)

        if (hasLiked) {
            // ✅ Unlike
            prompt.likes.pull(userId)
        } else {
            // ✅ Like
            prompt.likes.addToSet(userId)
        }

        await prompt.save()

        // ✅ Populate with user details
        const updatedPrompt = await Prompt.findById(promptId).populate("likes", "username email image") // pick only fields you need

        return new Response(
            JSON.stringify({
                likesCount: updatedPrompt.likes.length,
                likedUsers: updatedPrompt.likes,
                isLiked: !hasLiked, // current user's state after toggle
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        )
    } catch (error) {
        console.error("Error toggling like:", error)
        return new Response("Failed to update like", { status: 500 })
    }
}
