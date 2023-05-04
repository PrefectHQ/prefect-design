<template>
  <div class="p-navigation-bar">
    <template v-if="$slots.leading">
      <div class="p-navigation-bar__leading">
        <slot name="leading" />
      </div>
    </template>
    <div class="p-navigation-bar__content">
      <slot />
    </div>
    <template v-if="$slots.trailing">
      <div class="p-navigation-bar__trailing">
        <slot name="trailing" />
      </div>
    </template>
  </div>
</template>

<style>
.p-navigation-bar { @apply
  fixed
  lg:sticky
  top-16
  lg:top-0
  bottom-0
  lg:bottom-auto
  w-screen
  flex
  flex-col
  lg:h-screen
  lg:w-64
}

.p-navigation-bar {
  z-index: var(--p-navigation-bar-z-index, 20)
}

.p-navigation-bar__leading,
.p-navigation-bar__content,
.p-navigation-bar__trailing { @apply
  p-3
  overflow-y-auto
}

.p-navigation-bar__leading { @apply
  border-b-2
  flex-shrink-0
}

.p-navigation-bar__content,
.p-navigation-bar__trailing { @apply
  grid
  gap-1
}

.p-navigation-bar__trailing { @apply
  mt-auto
  border-t-2
  flex-shrink-0
}
</style>