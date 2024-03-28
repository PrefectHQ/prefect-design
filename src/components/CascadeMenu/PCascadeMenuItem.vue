<template>
  <POverflowMenuItem class="p-cascade-menu-item" :class="classes.root" @click="handleClick">
    <slot>
      {{ data.label }}
    </slot>
  </POverflowMenuItem>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { POverflowMenuItem } from '@/components'
  import { CascadeData, CascadeValue } from '@/utilities'

  const props = defineProps<{
    data: CascadeData,
    multiple?: boolean,
  }>()

  const value = defineModel<CascadeValue>('value', { required: true })

  const classes = computed(() => ({
    root: {
      'p-cascade-menu-item--active': itemIsSelected.value,
    },
  }))

  const itemIsSelected = computed(() => {
    if (Array.isArray(value.value)) {
      return value.value.includes(props.data.value)
    }

    return value.value === props.data.value
  })

  const handleClick = (): void => {
    if (!props.multiple) {
      value.value = itemIsSelected.value ? undefined : props.data.value
      return
    }

    if (Array.isArray(value.value)) {
      if (itemIsSelected.value) {
        value.value = value.value.filter((v) => v !== props.data.value)
      } else {
        value.value = [...value.value, props.data.value]
      }

      return
    }

    value.value = itemIsSelected.value ? undefined : [props.data.value]
  }
</script>

<style>
.p-cascade-menu-item { @apply
  hover:bg-selectable-hover
}

.p-cascade-menu-item--active { @apply
  bg-selected
}
</style>