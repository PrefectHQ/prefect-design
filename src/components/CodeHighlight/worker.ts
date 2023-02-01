import { default as highlight, LanguageFn, HighlightResult } from 'highlight.js'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import xml from 'highlight.js/lib/languages/xml'
import { SupportedLanguage, UnformattedMessagePayload } from '@/components/CodeHighlight/types'

const registeredLanguages: Set<SupportedLanguage> = new Set()

const highlightText = (text: string, lang: SupportedLanguage): HighlightResult => {
  registerLanguage(lang)
  return highlight.highlight(text, { language: lang })
}

const getLanguageFunctions = (lang: SupportedLanguage): LanguageFn[] => {
  switch (lang) {
    case 'javascript':
      return [javascript]
    case 'python':
      return [python]
    case 'css':
      return [css]
    case 'html':
    case 'vue':
      return [xml, css, javascript]
    case 'markdown':
      return [markdown]
    default:
      throw new Error(`Language ${lang} is not supported`)
  }
}

const isRegistered = (lang: SupportedLanguage): boolean => registeredLanguages.has(lang)

const registerLanguage = (lang: SupportedLanguage): void => {
  if (isRegistered(lang)) {
    return
  }
  registeredLanguages.add(lang)
  const languageFunctions = getLanguageFunctions(lang)

  languageFunctions.forEach((langFn) => highlight.registerLanguage(lang, langFn))
}

const handleMessage = (message: MessageEvent<UnformattedMessagePayload>): void => {
  const { text, lang } = message.data
  const highlighted = highlightText(text, lang)
  self.postMessage(highlighted.value)
}

self.onmessage = handleMessage
export default {}