import { GoogleGenerativeAI } from '@google/generative-ai'

let geminiClient: GoogleGenerativeAI | null = null

export function getGeminiClient(): GoogleGenerativeAI {
  if (!geminiClient) {
    if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set')
    geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }
  return geminiClient
}

export function getGeminiModel(modelName = 'gemini-1.5-flash') {
  return getGeminiClient().getGenerativeModel({ model: modelName })
}
