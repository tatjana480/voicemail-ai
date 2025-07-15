'use client'

import { useState } from 'react'
import { Wand2 } from 'lucide-react'

interface EmailGeneratorProps {
  transcript: string
  onEmailGenerated: (email: string) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export default function EmailGenerator({ 
  transcript, 
  onEmailGenerated, 
  isGenerating, 
  setIsGenerating 
}: EmailGeneratorProps) {
  const [tone, setTone] = useState('professional')
  const [emailType, setEmailType] = useState('general')

  const generateEmail = async () => {
    if (!transcript.trim()) return

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcript.trim(),
          tone,
          emailType,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate email')
      }

      const data = await response.json()
      onEmailGenerated(data.email)
    } catch (error) {
      console.error('Error generating email:', error)
      onEmailGenerated('Error generating email. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Email Generator</h2>
        <p className="text-sm text-gray-600 mt-1">Choose your tone and type for the perfect email</p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 Email Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="professional">🏢 Professional</option>
            <option value="casual">😊 Casual</option>
            <option value="friendly">🤝 Friendly</option>
            <option value="formal">🎩 Formal</option>
            <option value="urgent">⚡ Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📧 Email Type
          </label>
          <select
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="general">💬 General</option>
            <option value="meeting">📅 Meeting</option>
            <option value="follow-up">🔄 Follow-up</option>
            <option value="inquiry">❓ Inquiry</option>
            <option value="complaint">⚠️ Complaint</option>
            <option value="thank-you">🙏 Thank You</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateEmail}
        disabled={!transcript.trim() || isGenerating}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
          !transcript.trim() || isGenerating
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating...
          </>
        ) : (
          <>
            <Wand2 size={20} />
            Generate Perfect Email
          </>
        )}
      </button>

      {!transcript.trim() && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Record your voice message first to generate an email
        </p>
      )}
    </div>
  )
}
