import mongoose from "mongoose"

let isConnected = false // Track the connection status

export const connectToDB = async () => {
    mongoose.set("strictQuery", true)

    if(isConnected) return

    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
            dbname: "shared_prompt"
        })

        isConnected = true

        console.log('🍃 MongoDB is connected 🍀')
    } catch (err) {
        console.error(err)
    }
}