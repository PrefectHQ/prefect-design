<template>
  <div class="p-window p-background">
    <div class="p-window__top-bar">
      <div class="p-window__buttons">
        <div class="p-window__button" />
        <div class="p-window__button" />
        <div class="p-window__button" />
      </div>
      <div class="p-window__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="p-window__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="p-window__body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    title?: string,
  }>()
</script>

<style>
.p-window { @apply
  max-w-2xl
  overflow-hidden
  rounded-default
  w-full
}

.p-window__top-bar { @apply
  flex
  px-5
  py-4
  justify-between
  items-center
  border-b
  border-divider
}

.p-window__file-name { @apply
  text-sm
}

.p-window__buttons { @apply
  flex
  gap-2
}

.p-window__button { @apply
  rounded-full
  h-3
  w-3
}

.p-window__button:nth-of-type(1) { @apply
  bg-[#FB4E4E]
}

.p-window__button:nth-of-type(2) { @apply
  bg-[#F6A609]
}

.p-window__button:nth-of-type(3) { @apply
  bg-[#2AC769]
}

.p-window__actions { @apply
  -m-2
}

.p-window__body { @apply
  bg-code
  text-code
  px-5
  py-4
}

.p-window__body .p-code-highlight{
  background-color: unset;
}

.p-window__body .p-code-highlight__code-wrapper {
  color: unset;
}
</style>