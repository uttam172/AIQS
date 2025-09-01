import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"
import { Respond } from "@/utils/Respond"

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return Respond(200, true, "All prompts fetched successfully", prompts)
    } catch (error) {
        console.log(error)
        return Respond(500, false, error.message)
    }
} 