<template>
  <div class="p-layout-table">
    <div class="p-layout-table__header" :class="classes.header">
      <slot name="header">
        <div class="p-layout-table__section p-layout-table__section--start">
          <slot name="header-start" />
        </div>

        <div class="p-layout-table__section p-layout-table__section--end">
          <slot name="header-end" />
        </div>
      </slot>
    </div>

    <slot />

    <div class="p-layout-table__footer">
      <slot name="footer">
        <div class="p-layout-table__section p-layout-table__section--start">
          <slot name="footer-start" />
        </div>

        <div class="p-layout-table__section p-layout-table__section--end">
          <slot name="footer-end" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    sticky?: boolean,
  }>()

  const classes = computed(() => ({
    header: {
      'p-layout-table__header--sticky': props.sticky,
    },
  }))
</script>

<style>
.p-layout-table__header { @apply
  flex
  justify-between
  items-center
  mb-2
  p-2
}

.p-layout-table__header--sticky { @apply
  sticky
  top-0
  border-0
  bg-opacity-90
  bg-background-600
  dark:bg-background-400
  z-10
}

.p-layout-table__footer { @apply
  flex
  justify-between
  items-center
  mt-2
  py-2
  z-10
}

.p-layout-table__section { @apply
  flex
  gap-2
  items-center
}

.p-layout-table__section--start { @apply
  mr-auto
}

.p-layout-table__section--end { @apply
  ml-auto
}
</style>