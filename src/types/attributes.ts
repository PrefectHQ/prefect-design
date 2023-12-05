import { SetupContext, StyleValue as VueStyleValue } from 'vue'

export type StyleValue = VueStyleValue
export type ClassValue = string | undefined | Record<string, boolean> | ClassValue[]
export type AttrsValue = Exclude<SetupContext['attrs'], 'class' | 'style'>