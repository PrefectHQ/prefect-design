<template>
  <div class="p-context-sidebar">
    <template v-if="$slots.header">
      <div class="p-context-sidebar__header">
        <slot name="header" />
      </div>
    </template>
    <div class="p-context-sidebar__body">
      <slot />
    </div>
    <template v-if="$slots.footer">
      <div class="p-context-sidebar__footer">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>

<style>
.p-context-sidebar { @apply
  bg-slate-700
  text-slate-300
  sticky
  top-0
  w-screen
  z-10
  lg:flex
  lg:h-screen
  lg:w-64
  lg:flex-col
}

.p-context-sidebar__header,
.p-context-sidebar__body,
.p-context-sidebar__footer { @apply
  p-3
}

.p-context-sidebar__header { @apply
  border-b-2
  border-slate-600
}

.p-context-sidebar__body,
.p-context-sidebar__footer { @apply
  grid
  gap-1
}

.p-context-sidebar__footer { @apply
  lg:mt-auto
  border-t-2
  border-slate-600
}
</style>