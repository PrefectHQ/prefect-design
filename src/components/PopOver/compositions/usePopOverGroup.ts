export type PopOverOpenMethod = () => void
export type PopOverCloseMethod = () => void

export type UsePopOverGroup = () => {
  setGroupCloseMethod: (groupId: string, close: PopOverCloseMethod) => void,
}

function factory(): UsePopOverGroup {
  const groups = new Map<string, PopOverCloseMethod | undefined>()

  function setGroupCloseMethod(groupId: string, close: PopOverCloseMethod): void {
    const groupCloseMethod = groups.get(groupId)

    if (groupCloseMethod) {
      groupCloseMethod()
    }

    groups.set(groupId, close)
  }

  return () => ({
    setGroupCloseMethod,
  })
}

export const usePopOverGroup = factory()