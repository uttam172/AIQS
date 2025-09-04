import { connectToDB } from "@/utils/database"
import Prompt from '@/models/prompt'
import { Respond } from "@/utils/Respond"

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            likedBy: []
        })

        await newPrompt.save()

        return Respond(201, true, "Prompt posted successfully", newPrompt)
    } catch (error) {
        console.log(error)
        return Respond(500, false, error.message)
    }
}