import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { transcript, tone, emailType } = await request.json()

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      )
    }

    const toneInstructions = {
      professional: "Use formal language, proper business etiquette, and maintain a respectful, competent tone",
      casual: "Use relaxed, conversational language as if talking to a colleague or friend",
      friendly: "Use warm, approachable language with a positive, helpful attitude",
      formal: "Use very formal, traditional business language with proper titles and ceremonial politeness",
      urgent: "Convey importance and time-sensitivity while remaining professional"
    }

    const typeInstructions = {
      general: "Standard email communication",
      meeting: "Request a meeting with specific times, agenda, and clear call-to-action",
      "follow-up": "Reference previous communication and provide updates or next steps",
      inquiry: "Ask specific questions and request information in an organized manner",
      complaint: "Express concerns professionally while seeking resolution",
      "thank-you": "Express genuine gratitude and acknowledge specific contributions"
    }

    const prompt = `Transform the following voice transcript into a well-structured email.

Voice transcript: "${transcript}"

Email requirements:
- Tone: ${tone} - ${toneInstructions[tone as keyof typeof toneInstructions]}
- Type: ${emailType} - ${typeInstructions[emailType as keyof typeof typeInstructions]}
- Include appropriate subject line that reflects the tone and type
- Format as a complete email with proper structure
- Make it clear, concise, and actionable
- Fix any grammar or speech-to-text errors
- Add appropriate greetings and closings that match the tone

Please format the response as:
Subject: [subject line]

[greeting]

[email body]

[closing]`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert email writer who transforms voice transcripts into perfectly crafted emails. Always maintain the original intent while improving clarity and professionalism.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const generatedEmail = completion.choices[0]?.message?.content || 'Failed to generate email'

    return NextResponse.json({ email: generatedEmail })
  } catch (error) {
    console.error('Error generating email:', error)
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    )
  }
}
