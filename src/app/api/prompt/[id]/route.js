import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) return Response.json("Prompt not found", { status: 404 })

        return Response.json(prompt, { status: 200 })
    } catch (error) {
        return Response.json("Failed to fetch all prompts", { status: 500 })
    }
}

// Patch (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if (!existingPrompt) return Response.json("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return Response.json(existingPrompt, { status: 200 })
    } catch (error) {
        return Response.json("Failed to update prompt", { status: 500 })
    }
}

// Delete (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)

        return Response.json("Prompt deleted succrssfully", { status: 200 })
    } catch (error) {
        return Response.json("Failed to delete prompt", { status: 500 })
    }
}