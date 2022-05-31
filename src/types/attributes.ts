import { SetupContext, StyleValue as VueStyleValue } from 'vue'

export type StyleValue = VueStyleValue
export type ClassValue = string | string[] | Record<string, boolean>
export type AttrsValue = Exclude<SetupContext['attrs'], 'class' | 'style'>