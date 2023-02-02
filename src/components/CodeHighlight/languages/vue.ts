import type { HLJSApi, LanguageFn, Language } from 'highlight.js'

export const vueLanguage: LanguageFn = (highlight: HLJSApi): Language => {
  return {
    name: 'vue',
    subLanguage: 'xml',
    contains: [
      highlight.COMMENT('<!--', '-->', {
        relevance: 10,
      }),
      {
        begin: /^(\s*)(<script>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'javascript',
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: /^(?:\s*)(?:<script\s+lang=(["'])ts\1>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'typescript',
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: /^(\s*)(<style(\s+scoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'css',
        excludeBegin: true,
        excludeEnd: true,
      },
    ],
  }
}

export default vueLanguage