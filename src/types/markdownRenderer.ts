import { marked } from 'marked'

export type Token = ReturnType<typeof marked.lexer>[number]

export type UnformattedMessagePayload = {
  text: string,
}

export type FormattedMessagePayload = {
  unformatted: string,
  tokens: marked.TokensList,
}