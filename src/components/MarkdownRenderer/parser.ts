import { marked } from 'marked'

import { VNode, h, createTextVNode as t } from 'vue'
import { PCheckbox, PCode, PCodeHighlight, PDivider, PLink, PHtml, PHashLink } from '@/components'
import { isSupportedLanguage } from '@/types/codeHighlight'
import { Token, ParserOptions, VNodeChildren } from '@/types/markdownRenderer'
import { unescapeHtml } from '@/utilities/strings'

const baseClass = 'markdown-renderer'
const defaultHeadingClasses = ['text-4xl', 'text-3xl', 'text-2xl', 'text-lg', 'text-base', 'text-sm']

const getVNode = (token: Token, options: ParserOptions, i: number, arr: marked.TokensList | Token[]): VNode => {
  const { headingClasses = defaultHeadingClasses, baseLinkUrl = '' } = options
  const baseElement = 'div'

  const normalizeHref = (href: string): string => href.startsWith('http') ? href : `${baseLinkUrl}${href}`

  let children: VNodeChildren

  if ('tokens' in token) {
    children = token.tokens?.map((_t, i, arr) => getVNode(_t, options, i, arr)) ?? undefined
  } else {
    children = []
  }

  const props: Record<string, unknown> = { class: [`${baseClass}__token`] }
  const { type } = token

  const textTypes: Token['type'][] = ['text', 'paragraph', 'strong', 'em', 'del']

  if ('text' in token && textTypes.includes(type)) {
    // This is because text tokens can have embedded elements
    // like links, images, etc. and text nodes can't have children
    if (children?.length) {
      const classList = [`${baseClass}__text`, `${baseClass}__text--${type}`]
      return h(baseElement, { class: classList }, children)
    }

    return t(unescapeHtml(token.text))
  }

  if (type == 'br' || type == 'space') {
    const classList = [`${baseClass}__space`]
    return h(baseElement, { class: classList }, children)
  }

  if (type == 'hr') {
    const classList = [`${baseClass}__divider`]
    return h(PDivider, { class: classList })
  }

  if (type == 'image') {
    const { href, text, title } = token
    const composedHref = normalizeHref(href)
    const classList = [`${baseClass}__image`]
    return h('img', { src: composedHref, alt: text, class: classList, title })
  }

  if (type == 'html') {
    const { text } = token
    return h(PHtml, { html: text, class: [`${baseClass}__html`] })
  }

  if (type == 'code') {
    return getCodeVNode(token)
  }

  if (type == 'codespan') {
    return h(PCode, { inline: true }, { default: () => unescapeHtml(token.text) })
  }

  if (type == 'table') {
    return getTableVNode(token)
  }

  if (type == 'list') {
    return getListVNode(token, options, children)
  }

  if (type == 'list_item') {
    const { task, checked } = token

    if (task || typeof checked === 'boolean') {
      return getCheckboxVNode(token)
    }

    const classList = [`${baseClass}__list-item`]
    const node = h('li', { class: classList }, children)
    return node
  }

  if (type == 'blockquote') {
    const classList = [`${baseClass}__blockquote`]
    return h('blockquote', { class: classList }, children)
  }

  if (type == 'heading') {
    console.log(token)
    const { depth, text } = token

    if (depth < 2) {
      children?.push(h(PDivider))
    }

    const classList = [headingClasses[depth], `${baseClass}__heading`, `${baseClass}__heading--h${depth}`]
    return h(PHashLink, { hash: text, depth, class: [...classList, `${baseClass}__heading-wrapper`] }, { default: () => children })
  }

  if (type == 'link') {
    const { href, title } = token
    const classList = [`${baseClass}__link`]
    const composedHref = normalizeHref(href)
    return h(PLink, { to: composedHref, title, class: classList }, { default: () => token.text })
  }

  return h(baseElement, props, children)
}

const getTableVNode = (token: Token & { type: 'table' }): VNode => {
  const classList = [`${baseClass}__table`]
  return h('table', { class: classList }, [token.raw])
}

const getCheckboxVNode = (token: Token & { type: 'list_item' | 'checkbox' }): VNode => {
  const { text, checked } = token
  const classList = [`${baseClass}__checkbox`]
  return h(PCheckbox, { modelValue: checked, disabled: true, label: text, checked, class: classList })
}

const getListVNode = (token: Token & { type: 'list' }, options: ParserOptions, children: VNodeChildren = []): VNode => {
  const { ordered, items } = token
  const base = ordered ? 'ol' : 'ul'
  const classList = [`${baseClass}__list`, `${baseClass}__list--${ordered ? 'ordered' : 'unordered'}`]
  const listItems = items.map((item, i, arr) => getVNode(item, options, i, arr))
  return h(base, { class: classList }, [...children, ...listItems])
}

const getCodeVNode = (token: Token & { type: 'code' }): VNode => {
  const classList = [`${baseClass}__code`]
  const { text, lang } = token
  if (isSupportedLanguage(lang)) {
    return h(PCodeHighlight, { text, lang, class: classList })
  }

  return h(PCode, { class: classList }, { default: () => unescapeHtml(text) })
}

export const getRootVNode = (tokens: marked.TokensList | [], options: ParserOptions): VNode => {
  const children: VNode[] = tokens.map((token, i, arr) => getVNode(token, options, i, arr))
  return h('article', { class: [baseClass] }, children)
}