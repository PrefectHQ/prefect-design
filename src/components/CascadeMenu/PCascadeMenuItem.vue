<template>
  <POverflowMenuItem class="p-cascade-menu-item" :class="classes.root" @click="handleClick">
    <slot>
      {{ data.label }}
    </slot>
  </POverflowMenuItem>
</template>

<script lang="ts" setup generic="T, V">
  import { CascadeData, CascadeMenuValue, isArray } from '@/utilities'
  import { POverflowMenuItem } from '@/components'
  import { computed } from 'vue'

  const props = defineProps<{
    data: CascadeData<T, V>,
    multiple?: boolean,
  }>()

  const selected = defineModel<CascadeMenuValue<V>>('selected', { required: true })

  const classes = computed(() => ({
    root: {
      'p-cascade-menu-item--active': itemIsSelected.value,
    }
  }))

  const itemIsSelected = computed(() => (Array.isArray(selected.value) && props.data.value && selected.value.includes(props.data.value) || selected.value === props.data.value))

  const handleClick = (e: MouseEvent) => {
    console.log('clicked', props.data.label, props.data.value)


    if (!props.data.value) {
      return
    }

    const selectedIsArray = isArray(selected.value)

    if (selectedIsArray) {
      const selectedIncludesValue = selected.value.includes(props.data.value)

      if (props.multiple) {
        if (selectedIncludesValue) {
          selected.value = selected.value.filter((v: any) => v !== props.data.value)
        } else {
          selected.value = [...selected.value, props.data.value]
        }
      } else {
        if (selectedIncludesValue) {
          selected.value = []
        } else {
          selected.value = [props.data.value]
        }
      }
    } else {
      const selectedIsValue = selected.value === props.data.value

      if (selectedIsValue) {
        selected.value = []
      } else {
        selected.value = [props.data.value]
      }
    }
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