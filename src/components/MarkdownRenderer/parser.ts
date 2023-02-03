import { marked } from 'marked'
import { Parser } from 'postcss'
import { VNode, h, createTextVNode as t } from 'vue'
import { PCheckbox, PCode, PCodeHighlight, PLink } from '@/components'
import { isSupportedLanguage } from '@/types/codeHighlight'
import { Token, ParserOptions, VNodeChildren } from '@/types/markdownRenderer'

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
  const { headingClasses = defaultHeadingClasses, baseLinkUrl = '', baseElement = 'div' } = options

  const normalizeHref = (href: string): string => href.startsWith('http') ? href : `${baseLinkUrl}${href}`

  let children: VNodeChildren

  if ('tokens' in token) {
    children = token.tokens?.map(_t => getVNode(_t, options)) ?? undefined
  } else {
    children = []
  }

  const props: Record<string, unknown> = { class: [`${baseClass}__token`] }
  const { type } = token

  if (type == 'text') {
    if (children?.length) {
      console.log('returning text with children', children)
      return h(baseElement, props, children)
    }

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

  if (type == 'list') {
    return getListVNode(token, options, children)
  }

  if (type == 'list_item') {
    const { text, task, checked } = token

    if (task) {
      const classList: string[] = [`${baseClass}__checkbox`]
      return h(PCheckbox, { modelValue: checked, disabled: true, label: text, checked, class: classList })
    }

    const classList: string[] = [`${baseClass}__list-item`]
    const node = h('li', { class: classList }, children)
    return node
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
    console.log({ link: token })
    const { href, title } = token
    const composedHref = normalizeHref(href)
    return h(PLink, { to: composedHref, title }, { default: () => token.text })
  }

  return h(baseElement, props, children)
}

const getTableVNode = (token: Token & { type: 'table' }): VNode => {
  return h('table', {}, [token.raw])
}

const getListVNode = (token: Token & { type: 'list' }, options: ParserOptions, children: VNodeChildren = []): VNode => {
  const { ordered, items } = token
  const base = ordered ? 'ol' : 'ul'
  const classList = [`${baseClass}__list`, `${baseClass}__list--${ordered ? 'ordered' : 'unordered'}`]
  const listItems = items.map(item => getVNode(item, options))
  return h(base, { class: classList }, [...children, ...listItems])
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