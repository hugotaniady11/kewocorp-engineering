'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGoNoGoPolling } from '@/hooks/goNoGoPooling'

interface WebhookConfig {
  id: string
  name: string
  description: string
  url: string
  enabled: boolean
}

const WEBHOOK_CONFIGS: WebhookConfig[] = [
  {
    id: 'flow1',
    name: 'Frontend Workflow (n8n)',
    description: 'Runs AI-based Go/No-Go analysis through n8n webhook.',
    url: 'https://kewo.app.n8n.cloud/webhook/go-no-go-coordinator-fe',
    enabled: true,
  },
]

const LLM_MODELS = [
  { id: 'gpt-4.1-mini', name: 'Extract text + Merge all agent' },
  { id: 'grok-3-mini', name: 'Merge all agent' },
]

function RenderObject({ data }: { data: any }) {
  if (!data || typeof data !== 'object') return null

  return (
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <p className="mb-1 capitalize font-semibold text-gray-900">
            {key.replace(/_/g, ' ')}
          </p>

          {Array.isArray(value) ? (
            <div className="space-y-2 border-l border-gray-200 pl-3">
              {value.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-1 rounded-md bg-gray-50 p-2 text-gray-800"
                >
                  {typeof item === 'object' ? (
                    <RenderObject data={item} />
                  ) : (
                    <p>{String(item)}</p>
                  )}
                </div>
              ))}
            </div>
          ) : typeof value === 'object' ? (
            <div className="border-l border-gray-200 pl-3">
              <RenderObject data={value} />
            </div>
          ) : (
            <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-2 text-gray-800">
              {String(value)}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default function RFPPage() {
  const router = useRouter()

  const [folderNumber, setFolderNumber] = useState(1)
  const [selectedFlows, setSelectedFlows] = useState<string[]>(['flow1'])
  const [selectedLLM, setSelectedLLM] = useState<string>('gpt-4.1-mini')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Ready to start analysis...')
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [documentData, setDocumentData] = useState<any | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiResult, setApiResult] = useState<any>(null)

  const [file, setFile] = useState<File | null>(null)
  const [open, setOpen] = useState(false)

  const [inputMode, setInputMode] = useState<'folder' | 'upload'>('folder')
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState('')

  const [extractedText, setExtractedText] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [analysisStarted, setAnalysisStarted] = useState(false)

  useGoNoGoPolling({
    sessionId: isRunning ? sessionId ?? '' : '',

    onAgentResult: async (data) => {
      if (data.agentName === 'OCR_DONE' && !analysisStarted) {
        setAnalysisStarted(true)
        setStatusText('OCR done. Starting AI analysis...')

        const extracted = data.result
        if (!extracted) return

        await startAnalysis(sessionId!, extracted)
        return
      }

      if (data.agentName === 'AI_STARTED') {
        setStatusText('AI agents are processing...')
        setProgress(30)
        return
      }

      setResults((prev) => [...prev, data])
      setProgress((p) => Math.min(p + 10, 90))
      setStatusText(`Agent ${data.agentName} completed`)
    },

    onComplete: (_sid, doc) => {
      setDocumentData(doc)
      setProgress(100)
      setStatusText('✅ Analysis completed successfully!')
      setIsRunning(false)
    },
  })

  useEffect(() => {
    if (!isRunning || !sessionId || analysisStarted) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `https://kewo.app.n8n.cloud/webhook/workflow-sessions?sessionId=${sessionId}`
        )

        const data = await res.json()
        const record = Array.isArray(data) ? data[0] : data

        if (record?.status === 'ocr_analysis_done') {
          setAnalysisStarted(true)
          setStatusText('OCR done. Starting AI analysis...')

          const extracted = record?.metadata?.extracted_text

          if (!extracted) {
            console.error('No extracted text found')
            return
          }

          await startAnalysis(sessionId, extracted)
        }
      } catch (err) {
        console.error('Polling error:', err)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isRunning, sessionId, analysisStarted])

  const startAnalysis = async (
    currentSessionId: string,
    currentExtractedText: string,
    currentFolderNumber?: number
  ) => {
    try {
      await Promise.all(
        selectedFlows.map((flowId) => {
          const webhook = WEBHOOK_CONFIGS.find((w) => w.id === flowId)
          if (!webhook) return Promise.resolve()

          const formData = new FormData()
          formData.append('sessionId', currentSessionId)
          formData.append('workflowName', webhook.name)
          formData.append('workflowId', webhook.id)
          formData.append('startTime', new Date().toISOString())
          formData.append('userAgent', navigator.userAgent)
          formData.append('selectedLLM', selectedLLM)
          formData.append('llmModel', selectedLLM)

          if (inputMode === 'folder' && currentFolderNumber !== undefined) {
            formData.append('folderNumber', String(currentFolderNumber))
          }

          formData.append('extractedText', currentExtractedText)

          return fetch(webhook.url, {
            method: 'POST',
            body: formData,
          }).catch(console.error)
        })
      )

      setProgress(30)
      setStatusText('AI workflows started...')
    } catch (err) {
      console.error('Analysis start failed:', err)
    }
  }

  const handleStart = async () => {
    if (isRunning) return

    if (selectedFlows.length === 0) {
      alert('Please select at least one workflow')
      return
    }

    if (inputMode === 'upload' && files.length === 0) {
      alert('Please upload at least 1 PDF')
      return
    }

    const newSessionId = `webapp-sess-${Math.random()
      .toString(36)
      .substring(2, 9)}`

    setSessionId(newSessionId)
    setProgress(10)
    setStatusText('Initializing...')
    setIsRunning(true)
    setResults([])
    setDocumentData(null)
    setApiResult(null)
    setAnalysisStarted(false)

    try {
      if (inputMode === 'upload') {
        const formData = new FormData()
        formData.append('sessionId', newSessionId)

        files.forEach((singleFile) => {
          formData.append('files', singleFile)
        })

        await fetch('https://kewo.app.n8n.cloud/webhook/ocr-multiple', {
          method: 'POST',
          body: formData,
        })

        setStatusText('OCR started...')
        setProgress(15)
      }

      if (inputMode === 'folder') {
        setAnalysisStarted(true)
        await startAnalysis(newSessionId, '', folderNumber)
      }
    } catch (error) {
      console.error('Start error:', error)
      setStatusText('Failed to start process.')
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setSessionId(null)
    setProgress(0)
    setStatusText('Ready to start analysis...')
    setResults([])
    setDocumentData(null)

    setInputMode('folder')
    setFolderNumber(1)
    setFiles([])
    setExtractedText(null)

    setSelectedLLM('gpt-4.1-mini')
    setFileError('')
    setOpen(false)
    setFile(null)
    setApiResult(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !sessionId) {
      alert('Missing file or session.')
      return
    }

    setIsSubmitting(true)
    setApiResult(null)
    setStatusText('Extracting text...')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const extractRes = await fetch('https://kewo.app.n8n.cloud/webhook/ocr-test', {
        method: 'POST',
        body: formData,
      })

      if (!extractRes.ok) {
        const txt = await extractRes.text()
        console.error('Extract failed', extractRes.status, txt)
        alert(`Extract failed (${extractRes.status})`)
        return
      }

      const extractJson: { fullText: string }[] = await extractRes.json()
      const fullText = extractJson[0]?.fullText || ''

      const payload = {
        sessionId,
        folderNumber: String(folderNumber),
        extract_document: fullText,
      }

      const res = await fetch(
        'https://kewo.app.n8n.cloud/webhook/Go/NoGoRecommendations',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText)
      }

      const responseData: any = await res.json()
      const firstItem = Array.isArray(responseData) ? responseData[0] : responseData

      setApiResult(firstItem)
    } catch (err) {
      console.error('Extract error', err)
      alert(
        'Something went wrong while extracting text: ' +
          (err instanceof Error ? err.message : String(err))
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUploadBulk = async () => {
    try {
      setIsUploading(true)
      setStatusText('Uploading & extracting text from PDFs...')

      const formData = new FormData()

      files.forEach((singleFile) => {
        formData.append('files', singleFile)
      })

      const res = await fetch('https://kewo.app.n8n.cloud/webhook/ocr-multiple', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!data[0]?.combinedText) {
        throw new Error('No text extracted')
      }

      setExtractedText(data[0].combinedText)
      setStatusText('PDF processed successfully ✅')

      return data[0].combinedText
    } catch (err) {
      console.error('OCR Upload Error:', err)
      setStatusText('Failed to process PDFs')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6 text-gray-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">RFP</h1>
          <p className="mt-1 text-sm text-gray-500">
            Run Go/No-Go analysis from folder input or uploaded PDF files.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Kewo RFP Analysis Enhanced
          </h2>
          <p className="text-gray-500">
            Select folder number, workflow, and LLM to generate Go/No-Go reports.
          </p>
        </div>

        <div className="mb-8">
          <label className="mb-2 block font-medium text-gray-700">
            Choose Input Method
          </label>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setInputMode('folder')
                setFiles([])
                setFileError('')
              }}
              className={`rounded border px-4 py-2 ${
                inputMode === 'folder'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300'
              }`}
            >
              Folder Number
            </button>

            <button
              type="button"
              onClick={() => {
                setInputMode('upload')
                setFileError('')
              }}
              className={`rounded border px-4 py-2 ${
                inputMode === 'upload'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300'
              }`}
            >
              Upload PDF
            </button>
          </div>
        </div>

        {inputMode === 'folder' && (
          <div className="mb-8">
            <label className="mb-2 block font-medium text-gray-700">
              Folder Number
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min={1}
                max={20}
                value={folderNumber}
                onChange={(e) => setFolderNumber(Number(e.target.value))}
                className="w-24 rounded border border-gray-300 px-3 py-2 text-center"
              />
              <input
                type="range"
                min={1}
                max={20}
                value={folderNumber}
                onChange={(e) => setFolderNumber(Number(e.target.value))}
                className="flex-1 accent-blue-600"
              />
            </div>
          </div>
        )}

        {inputMode === 'upload' && (
          <div className="mb-8">
            <label className="mb-2 block font-medium text-gray-700">
              Upload PDF Files
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files || [])
                setFileError('')

                if (selectedFiles.length > 10) {
                  setFileError('You can upload a maximum of 10 PDF files at once.')
                  e.currentTarget.value = ''
                  setFiles([])
                  return
                }

                const invalidFile = selectedFiles.find(
                  (item) =>
                    item.type !== 'application/pdf' &&
                    !item.name.toLowerCase().endsWith('.pdf')
                )

                if (invalidFile) {
                  setFileError('Only PDF files are allowed.')
                  e.currentTarget.value = ''
                  setFiles([])
                  return
                }

                setFiles(selectedFiles)
              }}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />

            <p className="mt-2 text-sm text-gray-500">
              You can upload up to 10 PDF files at the same time.
            </p>

            {fileError && (
              <p className="mt-2 text-sm text-red-600">{fileError}</p>
            )}

            {files.length > 0 && (
              <div className="mt-3 rounded border border-gray-200 p-3">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Selected files:
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {files.map((item, index) => (
                    <li key={`${item.name}-${index}`}>
                      {index + 1}. {item.name}
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleUploadBulk}
                    disabled={isUploading}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUploading ? 'Processing PDFs...' : 'Test OCR Upload'}
                  </button>
                </div>

                {extractedText && (
                  <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-800">
                      Extracted preview
                    </p>
                    <p className="max-h-40 overflow-auto whitespace-pre-wrap text-sm text-gray-600">
                      {extractedText}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mb-8">
          <h3 className="mb-3 font-semibold text-gray-800">
            Select Analysis Workflows
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WEBHOOK_CONFIGS.map((flow) => (
              <label
                key={flow.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${
                  selectedFlows.includes(flow.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFlows.includes(flow.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFlows((prev) => [...prev, flow.id])
                    } else {
                      setSelectedFlows((prev) =>
                        prev.filter((id) => id !== flow.id)
                      )
                    }
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-800">{flow.name}</p>
                  <p className="text-sm text-gray-500">{flow.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8 flex justify-end">
          <button
            onClick={handleReset}
            className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
          >
            Reset
          </button>
        </div>

        <div className="mb-8 text-center">
          <h3 className="mb-2 font-semibold text-gray-800">
            Select AI Language Model
          </h3>
          <select
            value={selectedLLM}
            onChange={(e) => setSelectedLLM(e.target.value)}
            className="w-72 rounded-lg border border-gray-300 px-3 py-2 text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LLM_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`rounded bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 ${
              isRunning ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {isRunning ? 'Processing...' : 'Start Analysis'}
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-1 flex justify-between text-sm text-gray-500">
            <span>Overall Progress</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-3 bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">{statusText}</p>
        </div>

        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 font-semibold text-gray-800">
              Real-time Analysis Results
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {results
                .sort((a, b) => {
                  const aName = a.agent_name || a.agentName
                  const bName = b.agent_name || b.agentName
                  if (aName === 'ai-general-summary') return -1
                  if (bName === 'ai-general-summary') return 1
                  return 0
                })
                .map((result, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-blue-700">
                        {result.agent_name || result.agentName}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {result.processing_time ?? result.processingTime ?? 0}s
                      </span>
                    </div>

                    <p className="mb-3 text-xs text-gray-500">
                      Completed at{' '}
                      {new Date(
                        result.updated_at || result.completedAt
                      ).toLocaleTimeString()}
                    </p>

                    <div className="space-y-3 text-sm text-gray-800">
                      {(() => {
                        let output =
                          typeof result.result === 'string'
                            ? result.result
                            : result.result?.output || result.result

                        if (typeof output === 'string') {
                          try {
                            const parsed = JSON.parse(output)
                            output =
                              typeof parsed === 'object'
                                ? parsed
                                : { content: output }
                          } catch {
                            output = { content: output }
                          }
                        }

                        return typeof output === 'object' ? (
                          <RenderObject data={output} />
                        ) : (
                          <p className="whitespace-pre-wrap">{String(output)}</p>
                        )
                      })()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {documentData && (
          <div className="mt-10 rounded-lg border border-green-300 bg-green-50 p-6 text-center">
            <h3 className="mb-2 text-lg font-bold text-green-700">
              Analysis Complete
            </h3>
            <p className="mb-4 text-gray-600">
              {documentData.documentName || 'RFP Proposal'}
            </p>

            <div className="mb-6 flex justify-center gap-4">
              {documentData.documentUrl && (
                <a
                  href={documentData.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Open Document
                </a>
              )}

              {documentData.docId && (
                <a
                  href={`https://docs.google.com/document/d/${documentData.docId}/export?format=pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Download PDF
                </a>
              )}
            </div>

            <div>
              <button
                onClick={() => setOpen(true)}
                className="rounded bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
              >
                Give Recommendation
              </button>

              {open && (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-left">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Upload company profile <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="file"
                      required
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      accept=".pdf,.doc,.docx,.txt"
                      disabled={isSubmitting}
                      className="block w-full cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 file:mr-3 file:rounded file:border-0 file:bg-blue-600 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {file && (
                    <p className="text-xs text-gray-600">
                      Selected file: <span className="font-medium">{file.name}</span>
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null)
                        setApiResult(null)
                        setOpen(false)
                      }}
                      disabled={isSubmitting}
                      className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={!file || isSubmitting}
                      className="flex flex-1 items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>

                  {apiResult && (
                    <div className="mt-3 max-h-128 overflow-auto rounded-lg border bg-gray-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-gray-900">
                        Go/No-Go Result:
                      </h4>
                      <pre className="whitespace-pre-wrap rounded border bg-white p-3 text-left text-xs font-mono">
                        {apiResult.output || JSON.stringify(apiResult, null, 2)}
                      </pre>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}