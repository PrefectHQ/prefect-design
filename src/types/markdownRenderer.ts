import { marked } from 'marked'
import { VNode, RendererNode, RendererElement } from 'vue'

export type Token = ReturnType<typeof marked.lexer>[number]
export type VNodeChildren = VNode<RendererNode, RendererElement, Record<string, unknown>>[] | undefined

export type MarkdownMessagePayload = {
  type: 'sanitize' | 'parse',
  text: string,
}

export type ParseMessagePayload = {
  type: 'parse',
  tokens: marked.TokensList,
}

export type SanitizeMessagePayload = {
  type: 'sanitize',
  sanitized: string,
}

export type ParserOptions = {
  headingClasses?: string[],
  baseLinkUrl?: string | null | undefined,
}