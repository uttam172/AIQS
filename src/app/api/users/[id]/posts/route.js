import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"
import { Respond } from "@/utils/Respond"

export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const userPosts = await Prompt.find({
            creator: params.id
        }).populate('creator')

        return Respond(200, true, "All user's posts fetched successfully", userPosts)
    } catch (error) {
        console.log(error)
        return Respond(500, false, error.message)
    }
} 