import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY
})

export const gemeini1_5Flash = google('gemini-1.5-flash')