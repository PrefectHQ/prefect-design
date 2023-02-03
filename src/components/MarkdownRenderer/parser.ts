import { marked } from 'marked'
import { VNode, h, createTextVNode as t, RendererNode, RendererElement } from 'vue'
import { PCode, PCodeHighlight, PLink } from '@/components'
import { isSupportedLanguage } from '@/types/codeHighlight'
import { Token, ParserOptions } from '@/types/markdownRenderer'

const baseClass = 'markdown-renderer'
const defaultHeadingClasses = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm']

// const componentMap = {
//   blockquote: 'blockquote',
//   br: PDivider,
//   code: PCode,
//   codespan: 'blockquote',
//   def: 'blockquote',
//   del: 'blockquote',
//   em: 'blockquote',
//   escape: 'blockquote',
//   heading: 'blockquote',
//   hr: 'blockquote',
//   html: 'blockquote',
//   image: 'blockquote',
//   link: 'blockquote',
//   list: 'blockquote',
//   list_item: 'blockquote',
//   paragraph: 'blockquote',
//   space: 'blockquote',
//   strong: 'blockquote',
//   table: 'blockquote',
//   text: 'blockquote',
// }

const getVNode = (token: marked.TokensList[number], options: ParserOptions): VNode => {
  const { headingClasses = defaultHeadingClasses, baseLinkUrl = '' } = options
  const base = 'div'

  const normalizeHref = (href: string): string => href.startsWith('http') ? href : `${baseLinkUrl}${href}`

  let children: VNode<RendererNode, RendererElement, Record<string, unknown>>[] | undefined

  if ('tokens' in token) {
    children = token.tokens?.map(_t => getVNode(_t, options)) ?? undefined
  } else {
    children = []
  }

  const props: Record<string, unknown> = { class: [`${baseClass}__token`] }
  const { type } = token
  // switch (token.type) {
  //   case 'blockquote':
  //     base = 'blockquote'
  //     break
  //   case 'br':
  //     base = PDivider
  //     break
  //   case 'code':
  //     return getCodeVNode(token)
  //   case 'codespan':
  //     base = PCode
  //     break
  //   case 'def':
  //   case 'del':
  //   case 'em':
  //   case 'escape':
  //   case 'heading':
  //     return h(`h${token.depth}`, { class: classList }, token.tokens.map(_t => getVNode(_t)))
  //   case 'hr':
  //   case 'html':
  //   case 'image':
  //   case 'link':
  //   case 'list':
  //   case 'list_item':
  //   case 'paragraph':
  //   case 'space':
  //   case 'strong':
  //   case 'table':
  //   case 'text':
  //     return t(token.text)
  //   default:
  //     break
  // }
  // if (token.text?.includes('res')) {
  //   console.log({ token })
  // }
  if (type == 'text') {
    return t(token.text)
  }

  if (type == 'image') {
    const { href, text, title } = token
    const composedHref = normalizeHref(href)
    const classList = [`${baseClass}__image`]
    return h('img', { src: composedHref, alt: text, class: classList, title })
  }

  if (type == 'html') {
    return h('p', { align: 'center', dir: 'auto', class: [`${baseClass}__html`], innerHTML: token.text })
  }

  if (type == 'code') {
    return getCodeVNode(token)
  }

  if (type == 'codespan') {
    return h(PCode, { inline: true }, { default: () => token.text })
  }

  if (type == 'table') {
    return getTableVNode(token)
  }

  if (type == 'blockquote') {
    return h('blockquote', {}, children)
  }

  if (type == 'heading') {
    const { depth } = token
    const classList = [headingClasses[depth], 'font-semibold']
    return h(`h${depth}`, { class: classList }, children)
  }

  if (type == 'link') {
    const { href, title } = token
    const composedHref = normalizeHref(href)
    return h(PLink, { to: composedHref, title }, { default: () => token.text })
  }

  return h(base, props, children)
}

const getTableVNode = (token: Token & { type: 'table' }): VNode => {
  return h('table', {}, [token.raw])
}

const getCodeVNode = (token: Token & { type: 'code' }): VNode => {
  const classList = [`${baseClass}__code`]
  const { text, lang } = token
  if (isSupportedLanguage(lang)) {
    h(PCodeHighlight, { text, lang, class: classList })
  }

  return h(PCode, { class: classList }, { default: () => text })
}

export const getRootVNode = (tokens: marked.TokensList | [], options: ParserOptions): VNode => {
  const children: VNode[] = tokens.map((token) => getVNode(token, options))
  return h('article', { class: [baseClass] }, children)
}