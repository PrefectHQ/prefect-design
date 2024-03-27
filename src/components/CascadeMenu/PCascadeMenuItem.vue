<template>
  <POverflowMenuItem class="p-cascade-menu-item" :class="classes.root" @click="handleClick">
    <slot>
      {{ data.label }}
    </slot>
  </POverflowMenuItem>
</template>

<script lang="ts" setup>
  import { CascadeData } from '@/utilities'
  import { POverflowMenuItem } from '@/components'
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    data: CascadeData,
    level?: number,
  }>(), {
    level: 0,
  })

  const selected = defineModel<CascadeData['value'][]>('selected', { required: true })

  const classes = computed(() => ({
    root: {
      'p-cascade-menu-item--active': itemIsSelected.value,
    }
  }))

  const itemIsSelected = computed(() => selected.value[props.level] === props.data.value)

  const handleClick = () => {
    if (itemIsSelected.value) {
      selected.value[props.level] = undefined
    } else {
      selected.value[props.level] = props.data.value
    }

    selected.value = selected.value.slice(0, props.level + 1)
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