import { default as highlight, LanguageFn, HighlightResult } from 'highlight.js'
import css from 'highlight.js/lib/languages/css'
import jinja from 'highlight.js/lib/languages/django'
import javascript from 'highlight.js/lib/languages/javascript'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import xml from 'highlight.js/lib/languages/xml'
import { githubFlavoredMarkdownLanguage } from '@/components/CodeHighlight/languages/markdown'
import { vueLanguage } from '@/components/CodeHighlight/languages/vue'
import { SupportedLanguage, UnformattedMessagePayload } from '@/types/codeHighlight'

const registeredLanguages: Set<SupportedLanguage> = new Set()

const highlightText = (text: string, lang: SupportedLanguage): HighlightResult => {
  registerLanguage(lang)
  return highlight.highlight(text, { language: lang })
}

const getLanguageFunctions = (lang: SupportedLanguage): Record<string, LanguageFn> => {
  switch (lang) {
    case 'json':
    case 'javascript':
      return { javascript }
    case 'python':
      return { python }
    case 'css':
      return { css }
    case 'jinja':
      return { jinja }
    case 'xml':
    case 'html':
    case 'vue':
      return { xml, css, javascript, 'vue': vueLanguage }
    case 'markdown':
    case 'gh-markdown':
      return { 'gh-markdown': githubFlavoredMarkdownLanguage, markdown, xml, css, python, javascript, vueLanguage }
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
  Object.entries(languageFunctions).forEach(([langRef, langFn]) => highlight.registerLanguage(langRef, langFn))
}

const handleMessage = (message: MessageEvent<UnformattedMessagePayload>): void => {
  const { text, lang } = message.data
  const { language, code, illegal, relevance, value } = highlightText(text, lang)

  self.postMessage({
    unformatted: code,
    formatted: value,
    illegal,
    relevance,
    language,
  })
}

self.onmessage = handleMessage
export default {}