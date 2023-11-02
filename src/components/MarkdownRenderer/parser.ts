import { marked } from 'marked'

import { VNode, h, createTextVNode as t } from 'vue'
import { PCheckbox, PCode, PCodeHighlight, PDivider, PLink, PSanitizeHtml, PHashLink, PTable } from '@/components'
import { isSupportedLanguage } from '@/types/codeHighlight'
import {
  Token,
  ParserOptions,
  VNodeChildren,
  hasChildren,
  isCodeBlock,
  isCodeSpan,
  isTable,
  isList,
  isListItem,
  isHeading,
  isLink,
  isImage,
  isBlockquote,
  isHtml,
  isSpace,
  isBreak,
  isHorizontalRule,
  isTextToken,
  isEscape
} from '@/types/markdownRenderer'
import { ColumnClassesMethod } from '@/types/tables'
import { randomId } from '@/utilities'
import { isRouteExternal } from '@/utilities/router'
import { unescapeHtml } from '@/utilities/strings'

const baseElement = 'div'
const baseClass = 'markdown-renderer'
const defaultHeadingClasses = ['text-4xl', 'text-3xl', 'text-2xl', 'text-lg', 'text-base', 'text-sm']


const mapChildTokens = (tokens: Token[], options: ParserOptions): VNodeChildren => tokens.flatMap((token) => getVNode(token, options))

const getVNode = (token: Token, options: ParserOptions): VNode | VNode[] => {
  const { headingClasses = defaultHeadingClasses, baseLinkUrl = '' } = options

  const normalizeHref = (href: string): string => isRouteExternal(href) ? href : `${baseLinkUrl}${href}`

  let children: VNodeChildren = []

  if (hasChildren(token)) {
    children = mapChildTokens(token.tokens, options)
  }

  const props = { class: [`${baseClass}__token`] }
  const { type } = token

  if (isEscape(token)) {
    return t(unescapeHtml(token.text))
  }

  if (isTextToken(token)) {
    // This is because text tokens can have embedded elements
    // like links, images, etc. and text nodes can't have children
    if (children.length) {
      const classList = [`${baseClass}__text`, `${baseClass}__text--${type}`]
      return h(baseElement, { class: classList }, children)
    }

    return t(unescapeHtml(token.text))
  }

  if (isSpace(token) || isBreak(token)) {
    const classList = [`${baseClass}__space`]
    return h(baseElement, { class: classList }, children)
  }

  if (isHorizontalRule(token)) {
    const classList = [`${baseClass}__divider`]
    return h(PDivider, { class: classList })
  }

  if (isImage(token)) {
    const { href, text, title } = token
    const composedHref = normalizeHref(href)
    const classList = [`${baseClass}__image`]
    return h('img', { src: composedHref, alt: text, class: classList, title })
  }

  if (isHtml(token)) {
    const { text } = token
    return h(PSanitizeHtml, { html: text, class: [`${baseClass}__html`] })
  }

  if (isCodeBlock(token)) {
    return getCodeVNode(token)
  }

  if (isCodeSpan(token)) {
    const classList = [`${baseClass}__codespan`]
    return h(PCode, { inline: true, class: classList }, { default: () => unescapeHtml(token.text) })
  }

  if (isTable(token)) {
    return getTableVNode(token, options)
  }

  if (isList(token)) {
    return getListVNode(token, options, children)
  }

  if (isListItem(token)) {
    const { task, checked } = token

    if (task || typeof checked === 'boolean') {
      return getCheckboxVNode(token)
    }

    const classList = [`${baseClass}__list-item`]
    const node = h('li', { class: classList }, children)
    return node
  }

  if (isBlockquote(token)) {
    const classList = [`${baseClass}__blockquote`]
    return h('blockquote', { class: classList }, children)
  }

  if (isHeading(token)) {
    const { depth, text } = token
    const classList = [headingClasses[depth], `${baseClass}__heading`, `${baseClass}__heading--h${depth}`]
    const heading = h(PHashLink, { hash: text, depth, class: [...classList, `${baseClass}__heading-wrapper`] }, { default: () => children })

    if (depth < 2) {
      return [heading, h(PDivider)]
    }

    return heading
  }

  if (isLink(token)) {
    const { href, title } = token
    const classList = [`${baseClass}__link`]
    const composedHref = normalizeHref(href)
    return h(PLink, { to: composedHref, title, class: classList, rel: 'noopener' }, { default: () => token.text })
  }

  return h(baseElement, props, children)
}

const getTableVNode = (token: Token & { type: 'table' }, options: ParserOptions): VNode => {
  const { header, align, rows } = token
  const classList = [`${baseClass}__table`]

  type TableDataValue = Record<string, unknown> & { _markdownMetadata: { text: string, tokens: Token[] } }
  type TableData = Record<string, TableDataValue>
  const data: TableData[] = []
  const columns: string[] = []
  const slots: Record<string, unknown> = {}

  header.forEach(({ tokens }, index) => {
    const slotName = randomId()
    columns.push(slotName)

    const headerChildren = mapChildTokens(tokens, options)
    const classList = [`${baseClass}__table-heading`]
    const alignValue = align[index]

    if (alignValue) {
      classList.push(`${baseClass}__table-column--${alignValue}`)
    }
    slots[`${slotName}-heading`] = () => h(baseElement, { class: classList }, headerChildren)
  })

  rows.forEach((row) => {
    const rowData: TableData = {}

    row.forEach(({ text, tokens }, i) => {
      const slotName = randomId()
      rowData[columns[i]] = { [slotName]: text, _markdownMetadata: { text, tokens } }
    })

    data.push(rowData)
  })

  columns.forEach((column) => {
    slots[column] = ({ value }: { value: TableDataValue }) => {
      const { _markdownMetadata: { tokens } } = value

      const cellChildren = mapChildTokens(tokens, options)

      if (!cellChildren.length) {
        return h(baseElement, { class: [`${baseClass}__table-cell`] }, { default: () => value[column] })
      }

      return cellChildren
    }
  })

  const columnClasses: ColumnClassesMethod<TableData> = (column, value, index) => {
    const alignValue = align[index]
    const classList = [`${baseClass}__table-column`]

    if (alignValue) {
      classList.push(`${baseClass}__table-column--${alignValue}`)
    }
    return classList
  }

  return h(PTable, { class: classList, data, columnClasses }, slots)
}

const getCheckboxVNode = (token: marked.Tokens.ListItem): VNode => {
  const { text, checked } = token
  const classList = [`${baseClass}__checkbox`]
  return h(PCheckbox, { modelValue: checked, disabled: true, label: text, checked, class: classList })
}

const getListVNode = (token: marked.Tokens.List, options: ParserOptions, children: VNodeChildren = []): VNode => {
  const { ordered, items } = token
  const base = ordered ? 'ol' : 'ul'
  const classList = [`${baseClass}__list`, `${baseClass}__list--${ordered ? 'ordered' : 'unordered'}`]
  const listItems = mapChildTokens(items, options)
  return h(base, { class: classList }, [...children, ...listItems])
}

const getCodeVNode = (token: marked.Tokens.Code): VNode => {
  const classList = [`${baseClass}__code`]
  const { text, lang } = token

  if (isSupportedLanguage(lang)) {
    return h(PCodeHighlight, { text, lang, class: classList })
  }

  return h(PCode, { class: classList }, { default: () => unescapeHtml(text) })
}

export const getRootVNode = (tokens: marked.TokensList | [], options: ParserOptions): VNode => {
  const children = mapChildTokens(tokens, options)
  return h('article', { class: [baseClass] }, children)
}