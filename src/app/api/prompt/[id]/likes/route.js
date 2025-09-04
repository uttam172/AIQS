import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"
import { Respond } from "@/utils/Respond"

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()
    const { id } = await params

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(id)

        if (!existingPrompt) return Response.json("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return Respond(200, true, "Prompt Updated Successfully", existingPrompt)
    } catch (error) {
        console.log(error)
        return Respond(500, false, error.message)
    }
}