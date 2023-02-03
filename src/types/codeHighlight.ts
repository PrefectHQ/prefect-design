export const SupportedLanguages = ['jinja', 'json', 'javascript', 'python', 'vue', 'markdown', 'html', 'css', 'gh-markdown', 'markdown', 'xml'] as const
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