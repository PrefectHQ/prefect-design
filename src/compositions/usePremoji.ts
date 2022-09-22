import { ref } from 'vue'

export type Premoji = {
  name: string,
  image: string,
  codes: string[],
}

export const premojis = [
  {
    // The name that we should see in the pattern, e.g. :github:, sort of like a unique ID
    'name': ':github:',
    // name of the image or link to the image (?)
    'image': 'github.png',
    // tags that we can use to search for premoji; can be reused
    'meta-tags': ['github', 'git', 'gh', 'logo'],
  },
  {
    'name': ':google:',
    'image': 'google.png',
    'meta-tags': ['google', 'logo'],
  },
]

const host = 'https://raw.githubusercontent.com/PrefectHQ/premojis/main/premojis/'

const convertToHtml = (input: string): string | number => {
  const pattern = /(:[A-Za-z0-9-_]+:)/g
  const [patternMatch] = (pattern.exec(input) ?? []).slice(1)

  if (patternMatch) {
    const key = patternMatch.substring(1, patternMatch.length - 1)
    const replacement = ref<string | null>(null)

    premojis.find(item => item.name === `:${key}:` ? replacement.value = `<img style="display:inline-block" src="${host}${item.image}" width="20" height="20">` : replacement.value = null)

    if (!replacement.value) {
      return input.indexOf(patternMatch) + patternMatch.length + 1
    }

    return input.replace(patternMatch, replacement.value)
  }

  throw new Error('No premoji found!')
}

export const convertToPremoji = (input: string): string => {
  let value = input
  let offset = 0
  try {
    while (value) {
      const result = convertToHtml(value.substring(offset))
      if (typeof result === 'number') {
        offset = result
      } else {
        value = `${value.substring(0, offset)}${result}`
      }
    }
    return value
  } catch (done) {
    return value
  }
}
