import { marked } from 'marked'
import { VNode, h, createTextVNode as t, RendererNode, RendererElement } from 'vue'
import { PCode, PCodeHighlight, PLink } from '@/components'
import { Token } from '@/types/markdownRenderer'

const baseClass = 'markdown-renderer'
const headingClass = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm']

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

const getVNode = (token: marked.TokensList[number]): VNode => {
  const base = 'div'

  let children: VNode<RendererNode, RendererElement, Record<string, unknown>>[] | undefined

  if ('tokens' in token) {
    children = token.tokens?.map(_t => getVNode(_t)) ?? undefined
  } else {
    children = []
  }

  const props: Record<string, unknown> = { class: [`${baseClass}__token`] }
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
  if (token.type == 'text') {
    return t(token.text)
  }

  if (token.type == 'image') {
    console.log('hello!')
  }

  if (token.type == 'html') {
    return h('p', { align: 'center', dir: 'auto', class: [`${baseClass}__html`], innerHTML: token.text })
  }

  if (token.type == 'code') {
    return getCodeVNode(token)
  }

  if (token.type == 'codespan') {
    return h(PCode, { inline: true }, { default: () => token.text })
  }

  if (token.type == 'table') {
    return getTableVNode(token)
  }

  if (token.type == 'blockquote') {
    return h('blockquote', {}, children)
  }

  if (token.type == 'heading') {
    const classList = [headingClass[token.depth], 'font-semibold']
    return h(`h${token.depth}`, { class: classList }, children)
  }

  if (token.type == 'link') {
    return h(PLink, { to: token.href }, { default: () => token.text })
  }

  return h(base, props, children)
}

const getTableVNode = (token: Token & { type: 'table' }): VNode => {
  return h('table', {}, [token.raw])
}

const getCodeVNode = (token: Token & { type: 'code' }): VNode => {
  const classList = [`${baseClass}__code`]
  switch (token.lang) {
    case 'python':
    case 'markdown':
    case 'json':
    case 'html':
    case 'css':
    case 'javascript':
    case 'vue':
      return h(PCodeHighlight, { text: token.text, lang: token.lang, class: classList })
    default:
      return h(PCode, { class: classList }, { default: () => token.text })
  }
}

export const getRootVNode = (tokens: marked.TokensList | []): VNode => {
  const children: VNode[] = tokens.map(getVNode)
  return h('article', { class: [baseClass] }, children)
}