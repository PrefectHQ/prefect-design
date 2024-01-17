// https://stackoverflow.com/a/62557418/3511012
export function globalExists(varName: string): boolean {
  const globalEval = eval
  try {
    globalEval(varName)
    return true
  } catch {
    return false
  }
}

export function randomId(): string {
  // typescript says crypto will be defined but it might not be
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!globalExists('crypto')) {
    return nonCryptoUUID()
  }

  // typescript says crypto will be defined but it might not be
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!crypto.randomUUID) {
    return backupRandomUUID()
  }

  return crypto.randomUUID()
}

function backupRandomUUID(): string {
  return (+[1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    .toString()
    .replace(/[018]/g,
      substring => (+substring ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +substring / 4).toString(16),
    )
}

function nonCryptoUUID(): string {
  const first = base16Integer()
  const last = base16Integer()
  return `${first.slice(0, 8) }-${ first.slice(8, 12) }-4${ first.slice(13) }-a${ last.slice(1, 4) }-${ last.slice(4)}`
}

function base16Integer(): string {
  // eslint-disable-next-line no-loss-of-precision, @typescript-eslint/no-loss-of-precision
  return `00000000000000000${ (Math.random() * 0xffffffffffffffff).toString(16)}`.slice(-16)
}