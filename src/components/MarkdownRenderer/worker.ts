import { marked } from 'marked'
import { UnformattedMessagePayload } from '@/types/markdownRenderer'

const parse = (text: string): marked.TokensList => {
  return marked.lexer(text, {})
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