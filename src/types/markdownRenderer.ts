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

export function isToken(token: unknown): token is Token {
  return !!token && typeof token == 'object' && 'type' in token
}

export function hasChildren(token: unknown): token is Token & { tokens: Token[] } {
  return isToken(token) && 'tokens' in token
}

export function isCodeBlock(token: unknown): token is marked.Tokens.Code {
  return isToken(token) && token.type === 'code'
}

export function isCodeSpan(token: unknown): token is marked.Tokens.Codespan {
  return isToken(token) && token.type === 'codespan'
}

export function isCode(token: unknown): token is marked.Tokens.Code | marked.Tokens.Codespan {
  return isCodeBlock(token) || isCodeSpan(token)
}

export function isTable(token: unknown): token is marked.Tokens.Table {
  return isToken(token) && token.type === 'table'
}

export function isList(token: unknown): token is marked.Tokens.List {
  return isToken(token) && token.type === 'list'
}

export function isListItem(token: unknown): token is marked.Tokens.ListItem {
  return isToken(token) && token.type === 'list_item'
}

export function isHeading(token: unknown): token is marked.Tokens.Heading {
  return isToken(token) && token.type === 'heading'
}

export function isLink(token: unknown): token is marked.Tokens.Link {
  return isToken(token) && token.type === 'link'
}

export function isImage(token: unknown): token is marked.Tokens.Image {
  return isToken(token) && token.type === 'image'
}

export function isHtml(token: unknown): token is marked.Tokens.HTML {
  return isToken(token) && token.type === 'html'
}

export function isBlockquote(token: unknown): token is marked.Tokens.Blockquote {
  return isToken(token) && token.type === 'blockquote'
}

export function isHorizontalRule(token: unknown): token is marked.Tokens.Hr {
  return isToken(token) && token.type === 'hr'
}

export function isSpace(token: unknown): token is marked.Tokens.Space {
  return isToken(token) && token.type === 'space'
}

export function isBreak(token: unknown): token is marked.Tokens.Br {
  return isToken(token) && token.type === 'br'
}

export function isText(token: unknown): token is marked.Tokens.Text {
  return isToken(token) && token.type === 'text'
}

export function isParagraph(token: unknown): token is marked.Tokens.Paragraph {
  return isToken(token) && token.type === 'paragraph'
}

export function isStrong(token: unknown): token is marked.Tokens.Strong {
  return isToken(token) && token.type === 'strong'
}

export function isEmphasis(token: unknown): token is marked.Tokens.Em {
  return isToken(token) && token.type === 'em'
}

export function isDeleted(token: unknown): token is marked.Tokens.Del {
  return isToken(token) && token.type === 'del'
}

export function isTextToken(token: unknown): token is marked.Tokens.Text | marked.Tokens.Em | marked.Tokens.Strong | marked.Tokens.Del {
  return isText(token) || isParagraph(token) || isStrong(token) || isEmphasis(token) || isDeleted(token)
}

export function isEscape(token: unknown): token is marked.Tokens.Escape {
  return isToken(token) && token.type === 'escape'
}