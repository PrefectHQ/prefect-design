import { default as dompurify } from 'dompurify'
import { marked } from 'marked'
import { ParseMessagePayload, SanitizeMessagePayload, MarkdownMessagePayload } from '@/types/markdownRenderer'

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

const sanitize = (text: string): string => {
  return dompurify.sanitize(text,
    {
      FORBID_ATTR: forbiddenAttrs,
      USE_PROFILES: useProfiles,
    })
}

const handleMessage = (message: MessageEvent<MarkdownMessagePayload>): void => {
  const { text, type } = message.data

  if (type == 'parse') {
    const tokens = parse(text)
    const response: ParseMessagePayload = { type, tokens }
    self.postMessage(response)
  } else {
    const sanitized = sanitize(text)
    const response: SanitizeMessagePayload = { type, sanitized }
    self.postMessage(response)
  }
}

self.onmessage = handleMessage
export default {}