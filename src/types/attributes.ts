import { SetupContext, StyleValue as VueStyleValue } from 'vue'

type SimpleClassValue = string | Record<string, boolean> | undefined

export type StyleValue = VueStyleValue
export type ClassValue = SimpleClassValue | SimpleClassValue[]
export type AttrsValue = Exclude<SetupContext['attrs'], 'class' | 'style'>