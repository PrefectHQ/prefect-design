import { default as highlight, LanguageFn, HighlightResult } from 'highlight.js'
import css from 'highlight.js/lib/languages/css'
import jinja from 'highlight.js/lib/languages/django'
import javascript from 'highlight.js/lib/languages/javascript'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import { githubFlavoredMarkdownLanguage } from '@/components/CodeHighlight/languages/markdown'
import { vueLanguage } from '@/components/CodeHighlight/languages/vue'
import {
  isJavascriptLanguageRef,
  isJsonLanguageRef,
  isPythonLanguageRef,
  isCssLanguageRef,
  isJinjaLanguageRef,
  isHtmlLanguageRef,
  isGithubFlavoredMarkdownLanguageRef,
  isMarkdownLanguageRef,
  isVueLanguageRef,
  isYamlLanguageRef,
  SupportedLanguage,
  UnformattedMessagePayload
} from '@/types/codeHighlight'

const registeredLanguages: Set<SupportedLanguage> = new Set()

const highlightText = (text: string, lang: SupportedLanguage): HighlightResult => {
  registerLanguage(lang)
  return highlight.highlight(text, { language: lang })
}

const getLanguageFunctions = (lang: SupportedLanguage): Record<string, LanguageFn> => {
  if (isJavascriptLanguageRef(lang) || isJsonLanguageRef(lang)) {
    return { javascript }
  }

  if (isPythonLanguageRef(lang)) {
    return { python }
  }

  if (isYamlLanguageRef(lang)) {
    return { yaml }
  }

  if (isCssLanguageRef(lang)) {
    return { css }
  }

  if (isJinjaLanguageRef(lang)) {
    return { jinja }
  }

  if (isHtmlLanguageRef(lang) || isVueLanguageRef(lang)) {
    return { xml, css, javascript, 'vue': vueLanguage }
  }

  if (isGithubFlavoredMarkdownLanguageRef(lang) || isMarkdownLanguageRef(lang)) {
    return { 'gh-markdown': githubFlavoredMarkdownLanguage, markdown, xml, css, python, javascript, vueLanguage }
  }

  throw new Error(`Language ${lang} is not supported`)
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