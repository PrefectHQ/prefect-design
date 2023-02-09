import { marked } from 'marked'
import { VNode, RendererNode, RendererElement } from 'vue'

export type Token = ReturnType<typeof marked.lexer>[number]
export type VNodeChildren = VNode<RendererNode, RendererElement, Record<string, unknown>>[]

export type MarkdownMessagePayload = {
  text: string,
}

export type ParseMessagePayload = {
  tokens: marked.TokensList,
}

export type ParserOptions = {
  headingClasses?: string[],
  baseLinkUrl?: string | null | undefined,
}


export function hasChildren(token: Token): token is Token & { tokens: Token[] } {
  return 'tokens' in token
}

export function isCodeBlock(token: Token): token is Token & { type: 'code' } {
  return token.type === 'code'
}

export function isCodeSpan(token: Token): token is Token & { type: 'codespan' } {
  return token.type === 'codespan'
}

export function isCode(token: Token): token is Token & { type: 'code' | 'codespan' } {
  return isCodeBlock(token) || isCodeSpan(token)
}

export function isTable(token: Token): token is Token & { type: 'table' } {
  return token.type === 'table'
}

export function isList(token: Token): token is Token & { type: 'list' } {
  return token.type === 'list'
}

export function isListItem(token: Token): token is Token & { type: 'list_item' } {
  return token.type === 'list_item'
}

export function isHeading(token: Token): token is Token & { type: 'heading' } {
  return token.type === 'heading'
}

export function isLink(token: Token): token is Token & { type: 'link' } {
  return token.type === 'link'
}

export function isImage(token: Token): token is Token & { type: 'image' } {
  return token.type === 'image'
}

export function isHtml(token: Token): token is Token & { type: 'html' } {
  return token.type === 'html'
}

export function isBlockquote(token: Token): token is Token & { type: 'blockquote' } {
  return token.type === 'blockquote'
}

export function isHorizontalRule(token: Token): token is Token & { type: 'hr' } {
  return token.type === 'hr'
}

export function isSpace(token: Token): token is Token & { type: 'space' } {
  return token.type === 'space'
}

export function isBreak(token: Token): token is Token & { type: 'br' } {
  return token.type === 'br'
}

export function isText(token: Token): token is Token & { type: 'text' } {
  return token.type === 'text'
}

export function isParagraph(token: Token): token is Token & { type: 'paragraph' } {
  return token.type === 'paragraph'
}

export function isStrong(token: Token): token is Token & { type: 'strong' } {
  return token.type === 'strong'
}

export function isEmphasis(token: Token): token is Token & { type: 'em' } {
  return token.type === 'em'
}

export function isDeleted(token: Token): token is Token & { type: 'del' } {
  return token.type === 'del'
}

export function isTextToken(token: Token): token is Token & { type: 'text' | 'paragraph' | 'strong' | 'em' | 'del' } {
  return isText(token) || isParagraph(token) || isStrong(token) || isEmphasis(token) || isDeleted(token)
}