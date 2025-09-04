import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"
import { Respond } from "@/utils/Respond"

export const PATCH = async (request, { params }) => {
    const { userId } = await request.json()
    const { id } = await params

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(id)

        if (!existingPrompt) return Respond(404, false, "Prompt not found")

        const index = existingPrompt.likedBy.indexOf(userId)
        
        index > -1 ? existingPrompt.likedBy.splice(index, 1) : existingPrompt.likedBy.push(userId)

        await existingPrompt.save()

        return Respond(200, true, "Updated like status", existingPrompt.likedBy)
    } catch (error) {
        console.log(error)
        return Respond(500, false, error.message)
    }
}