export const SupportedLanguages = ['javascript', 'python', 'vue', 'markdown', 'html', 'css', 'markdown'] as const
export type SupportedLanguage = typeof SupportedLanguages[number]
export type UnformattedMessagePayload = {
  text: string,
  lang: SupportedLanguage,
}

export type FormattedMessagePayload = string