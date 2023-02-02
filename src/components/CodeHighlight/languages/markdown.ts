import type { HLJSApi, LanguageFn, Language, Mode } from 'highlight.js'
import { SupportedLanguages } from '@/types/codeHighlight'

export const githubFlavoredMarkdownLanguage: LanguageFn = (highlight: HLJSApi): Language => {
  const COMMENT = highlight.COMMENT(
    /<!--/,
    /-->/,
    { relevance: 10 },
  )

  const CODE = {
    className: 'code',
    variants: [
      ...SupportedLanguages.map((lang): Mode => ({
        begin: `\`\`\`${lang}\n`,
        end: '```',
        subLanguage: lang,
        relevance: 0,
        excludeBegin: true,
        excludeEnd: true,
      })),
    ],
  }

  const STRIKE_THROUGH = {
    className: 'strikethrough',
    variants: [
      { begin: '(~{2,})[^~](.|\\n)*?\\1~*[ ]*' },
      {
        begin: '~~',
        end: '~~+[ ]*$',
      },
    ],
  }

  return {
    name: 'markdown',
    subLanguage: 'markdown',
    contains: [
      COMMENT,
      CODE,
      STRIKE_THROUGH,
    ],
    relevance: 0,
  }
}

export default githubFlavoredMarkdownLanguage