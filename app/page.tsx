'use client'

import { useState } from 'react'
import VoiceRecorder from './components/VoiceRecorder'
import EmailGenerator from './components/EmailGenerator'
import EmailPreview from './components/EmailPreview'
import DemoButton from './components/DemoButton'

export default function Home() {
  const [transcript, setTranscript] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const runDemo = () => {
    const demoText = "Hey Sarah, I wanted to follow up on our conversation yesterday about the marketing campaign. Can we schedule a meeting next week to go over the details and finalize the budget? Let me know what works for your schedule. Thanks!"
    setTranscript(demoText)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          VoiceEmail Pro
        </h1>
        <p className="text-lg text-gray-600">
          Transform your voice into perfectly crafted emails
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
          <span>🎤 Voice to Text</span>
          <span>🤖 AI Enhancement</span>
          <span>📧 Perfect Emails</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Step 1: Record Your Voice</h2>
            <DemoButton onDemo={runDemo} />
          </div>
          
          <VoiceRecorder 
            onTranscript={setTranscript}
            transcript={transcript}
          />
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Generate Email</h2>
            <EmailGenerator
              transcript={transcript}
              onEmailGenerated={setGeneratedEmail}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Your Perfect Email</h2>
          <EmailPreview 
            email={generatedEmail}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </main>
  )
}