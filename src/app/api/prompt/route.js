import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return Response.json(prompts, { status: 200 })
    } catch (error) {
        return Response.json("Failed to fetch all prompts", { status: 500 })
    }
} 