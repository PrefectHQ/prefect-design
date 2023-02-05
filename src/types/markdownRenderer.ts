import { marked } from 'marked'
import { VNode, RendererNode, RendererElement } from 'vue'

export type Token = ReturnType<typeof marked.lexer>[number]
export type VNodeChildren = VNode<RendererNode, RendererElement, Record<string, unknown>>[] | undefined

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