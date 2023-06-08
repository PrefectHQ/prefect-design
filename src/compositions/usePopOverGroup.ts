export type PopOverOpenMethod = () => void
export type PopOverCloseMethod = () => void

type PopoverGroupOpenMethod = (close: PopOverCloseMethod) => void

export type UsePopOverGroup = (groupId: string) => {
  open: PopoverGroupOpenMethod,
  close: PopOverCloseMethod,
}

function factory(): UsePopOverGroup {
  const groups = new Map<string, PopOverCloseMethod | undefined>()

  const composition: UsePopOverGroup = groupId => {

    const close: PopOverCloseMethod = () => {
      const groupCloseMethod = groups.get(groupId)

      if (groupCloseMethod) {
        groupCloseMethod()
      }
    }

    const open: PopoverGroupOpenMethod = closePopover => {
      close()

      groups.set(groupId, closePopover)
    }

    return {
      open,
      close,
    }
  }

  return composition
}

export const usePopOverGroup = factory()