import { twMerge } from 'tailwind-merge'
import { normalizeClass } from 'vue'


export function cn(...inputs: Parameters<typeof normalizeClass>): string {
  return twMerge(normalizeClass(inputs))
}

type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassDictionary = Record<string, any>
type ClassArray = ClassValue[]

declare module 'vue' {
  function normalizeClass(...inputs: ClassValue[]): string
}