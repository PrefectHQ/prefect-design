<template>
  <div class="p-cascade-panel">
    <PCard class="p-cascade-panel__main" :class="classes.main">
      <template v-for="child in data.children" :key="child.label">
        <PCascadeMenuItem :data="child" v-model:selected="selected" :level="level" />
      </template>
    </PCard>

    <template v-if="selectedChild && selectedChildHasChildren">
      <PCascadePanel v-model:selected="selected" :data="selectedChild" :level="level + 1"
        class="p-cascade-panel__subpanel" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { CascadeData, isDefined, resolveChildren } from '@/utilities'
  import { PCard, PCascadeMenuItem } from '@/components'
  import { onMounted, ref, computed } from 'vue'

  const props = withDefaults(defineProps<{
    data: CascadeData,
    level?: number,
  }>(), {
    level: 0,
  })

  const children = ref<CascadeData[]>()

  const selected = defineModel<CascadeData['value'][]>('selected', { required: true })

  const classes = computed(() => ({
    main: {
      'p-cascade-panel__main--subpanel-open': hasSelectedChild.value && selectedChildHasChildren.value,
    }
  }))

  const hasSelectedChild = computed(() => {
    return selected.value[props.level] !== undefined
  })

  const selectedChild = computed(() => {
    return children.value?.find(child => child.value === selected.value[props.level])
  })

  const selectedChildHasChildren = computed(() => {
    return isDefined(selectedChild.value?.children)
  })

  onMounted(async () => {
    children.value = await resolveChildren(props.data)
  })
</script>

<style>
.p-cascade-panel { @apply
  flex
  w-min
}

.p-cascade-panel__main { @apply
  min-w-36
  px-0
  py-0
  overflow-hidden
}

.p-cascade-panel__main--subpanel-open { @apply
  rounded-r-none
  border-r
  border-divider
}

.p-cascade-panel__subpanel .p-cascade-panel__main { @apply
  rounded-l-none
}
</style>