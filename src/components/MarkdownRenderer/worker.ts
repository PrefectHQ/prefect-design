import { marked } from 'marked'
import { ParseMessagePayload, MarkdownMessagePayload } from '@/types/markdownRenderer'

const markedOptions: marked.MarkedOptions = {
  gfm: true,
  breaks: true,
}

const parse = (text: string): marked.TokensList => {
  return marked.lexer(text, markedOptions)
}

const handleMessage = (message: MessageEvent<MarkdownMessagePayload>): void => {
  const { text } = message.data
  const tokens = parse(text)
  const response: ParseMessagePayload = { tokens }
  self.postMessage(response)
}

self.onmessage = handleMessage
export default {}