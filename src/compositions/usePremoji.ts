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

const next = (input: string): string | number => {
  const pattern = /(:[A-Za-z0-9-_]+:)/g
  const [match] = (pattern.exec(input) || []).slice(1)

  if (match) {
    const key = match.substring(1, match.length - 1)
    let replacement

    if (premojis.find(item => item.name === `:${key}:`)) {
      replacement = `<img style="display:inline-block" src="${host}${key}.png" width="20" height="20">`
    }

    if (!replacement) {
      return input.indexOf(match) + match.length + 1
    }

    return input.replace(match, replacement)
  }

  throw new Error('No emoji found!')
}

export const convertToPremoji = (input: string): string => {
  let value = input
  let offset = 0
  try {
    while (value) {
      const result = next(value.substring(offset))
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
