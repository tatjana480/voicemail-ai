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

    const prompt = `Transform the following voice transcript into a well-structured, professional email.

Voice transcript: "${transcript}"

Email requirements:
- Tone: ${tone}
- Type: ${emailType}
- Include appropriate subject line
- Format as a complete email with proper structure
- Make it clear, concise, and actionable
- Fix any grammar or speech-to-text errors
- Add appropriate greetings and closings

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