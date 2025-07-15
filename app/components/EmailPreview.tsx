'use client'

import { useState } from 'react'
import { Copy, Mail, Download } from 'lucide-react'

interface EmailPreviewProps {
  email: string
  isGenerating: boolean
}

export default function EmailPreview({ email, isGenerating }: EmailPreviewProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const openInEmailClient = () => {
    const subject = email.split('\n')[0].replace('Subject: ', '')
    const body = email.split('\n').slice(2).join('\n')
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Email Preview</h2>
        
        {email && !isGenerating && (
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            
            <button
              onClick={openInEmailClient}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
            >
              <Mail size={16} />
              Open
            </button>
          </div>
        )}
      </div>

      <div className="min-h-[300px] p-4 bg-gray-50 rounded-lg border">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Crafting your perfect email...</p>
            </div>
          </div>
        ) : email ? (
          <div className="space-y-4">
            <div className="whitespace-pre-wrap text-gray-900 font-mono text-sm">
              {email}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Mail size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Your generated email will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}