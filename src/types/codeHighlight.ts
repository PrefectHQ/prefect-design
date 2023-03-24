const CssLanguageRefs = ['css'] as const
const GithubFlavoredMarkdownLanguageRefs = ['gh-markdown'] as const
const HtmlLanguageRefs = ['html', 'xml'] as const
const JavascriptLanguageRefs = ['javascript', 'js'] as const
const JinjaLanguageRefs = ['jinja'] as const
const JsonLanguageRefs = ['json'] as const
const MarkdownLanguageRefs = ['markdown', 'md'] as const
const PythonLanguageRefs = ['python', 'py'] as const
const VueLanguageRefs = ['vue'] as const
const YamlLanguageRefs = ['yaml', 'yml'] as const

export const SupportedLanguages = [
  ...CssLanguageRefs,
  ...GithubFlavoredMarkdownLanguageRefs,
  ...HtmlLanguageRefs,
  ...JavascriptLanguageRefs,
  ...JinjaLanguageRefs,
  ...JsonLanguageRefs,
  ...MarkdownLanguageRefs,
  ...PythonLanguageRefs,
  ...VueLanguageRefs,
  ...YamlLanguageRefs,
] as const

export type SupportedLanguage = typeof SupportedLanguages[number]

export function isSupportedLanguage(lang: unknown): lang is SupportedLanguage {
  return SupportedLanguages.includes(lang as SupportedLanguage)
}

export type UnformattedMessagePayload = {
  text: string,
  lang: SupportedLanguage,
}

export type FormattedMessagePayload = {
  unformatted: string,
  formatted: string,
  illegal: boolean,
  relevance: number,
  language: string,
}

export function isJavascriptLanguageRef(lang: SupportedLanguage): lang is typeof JavascriptLanguageRefs[number] {
  return JavascriptLanguageRefs.includes(lang as typeof JavascriptLanguageRefs[number])
}

export function isJsonLanguageRef(lang: SupportedLanguage): lang is typeof JsonLanguageRefs[number] {
  return JsonLanguageRefs.includes(lang as typeof JsonLanguageRefs[number])
}

export function isPythonLanguageRef(lang: SupportedLanguage): lang is typeof PythonLanguageRefs[number] {
  return PythonLanguageRefs.includes(lang as typeof PythonLanguageRefs[number])
}

export function isVueLanguageRef(lang: SupportedLanguage): lang is typeof VueLanguageRefs[number] {
  return VueLanguageRefs.includes(lang as typeof VueLanguageRefs[number])
}

export function isMarkdownLanguageRef(lang: SupportedLanguage): lang is typeof MarkdownLanguageRefs[number] {
  return MarkdownLanguageRefs.includes(lang as typeof MarkdownLanguageRefs[number])
}

export function isGithubFlavoredMarkdownLanguageRef(lang: SupportedLanguage): lang is typeof GithubFlavoredMarkdownLanguageRefs[number] {
  return GithubFlavoredMarkdownLanguageRefs.includes(lang as typeof GithubFlavoredMarkdownLanguageRefs[number])
}

export function isHtmlLanguageRef(lang: SupportedLanguage): lang is typeof HtmlLanguageRefs[number] {
  return HtmlLanguageRefs.includes(lang as typeof HtmlLanguageRefs[number])
}

export function isCssLanguageRef(lang: SupportedLanguage): lang is typeof CssLanguageRefs[number] {
  return CssLanguageRefs.includes(lang as typeof CssLanguageRefs[number])
}

export function isJinjaLanguageRef(lang: SupportedLanguage): lang is typeof JinjaLanguageRefs[number] {
  return JinjaLanguageRefs.includes(lang as typeof JinjaLanguageRefs[number])
}

export function isYamlLanguageRef(lang: SupportedLanguage): lang is typeof YamlLanguageRefs[number] {
  return YamlLanguageRefs.includes(lang as typeof YamlLanguageRefs[number])
}