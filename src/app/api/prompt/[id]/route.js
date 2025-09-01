import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"
import { Respond } from "@/utils/Respond"

// GET (read)
export const GET = async (request, { params }) => {
    const { id } = await params

    try {
        await connectToDB()

        const prompt = await Prompt.findById(id).populate('creator')

        if (!prompt) return Response.json("Prompt not found", { status: 404 })

        return Respond(200, true, "Data Fetched Successfully", prompt)
    } catch (error) {
        console.log(error)
        return Respond(500, false, error.message)
    }
}

// Patch (update)
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

// Delete (delete)
export const DELETE = async (request, { params }) => {
    const { id } = await params

    try {
        await connectToDB()

        await Prompt.findByIdAndDelete(id)

        return Respond(200, true, "Prompt Deleted Successfully")
    } catch (error) {
        console.log(error)
        return Respond(500, false, error.message)
    }
}