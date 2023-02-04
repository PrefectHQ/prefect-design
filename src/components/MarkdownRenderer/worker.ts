import { default as dompurify } from 'dompurify'
import { marked } from 'marked'
import { UnformattedMessagePayload } from '@/types/markdownRenderer'

const forbiddenAttrs = ['style']
const useProfiles = { svg: true, html: true }

const markedOptions: marked.MarkedOptions = {
  gfm: true,
  breaks: true,
  sanitizer: (html: string): string => {
    return dompurify.sanitize(html,
      {
        FORBID_ATTR: forbiddenAttrs,
        USE_PROFILES: useProfiles,
      })
  },
}

const parse = (text: string): marked.TokensList => {
  return marked.lexer(text, markedOptions)
}

const handleMessage = (message: MessageEvent<UnformattedMessagePayload>): void => {
  const { text } = message.data

  const parsed = parse(text)
  const response = {
    unformatted: text,
    tokens: parsed,
  }

  self.postMessage(response)
}

self.onmessage = handleMessage
export default {}