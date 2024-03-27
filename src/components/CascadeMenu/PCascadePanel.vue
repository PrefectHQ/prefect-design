<template>
  <div class="p-cascade-panel">
    <PCard class="p-cascade-panel__main" :class="classes.main">
      <template v-for="childData in data.children" :key="childData.label">
        <PCascadeMenuItem :data="childData" v-model:selected="internalSelected" :multiple="data.multiple">
          <slot name="menu-item" v-bind="{ data: childData, selected: internalSelected }" />
        </PCascadeMenuItem>
      </template>
    </PCard>

    <template v-if="subpanel">
      <slot name="subpanel" v-bind="{ data: subpanel, selected: internalSelected }">
        <PCascadePanel v-model:selected="selected" :data="subpanel" :level="level + 1"
          class="p-cascade-panel__subpanel" />
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup generic="T, V">
  import { CascadeData, isDefined, resolveChildren, CascadeMenuValue } from '@/utilities'
  import { PCard, PCascadeMenuItem } from '@/components'
  import { onMounted, ref, computed, watch } from 'vue'

  const props = withDefaults(defineProps<{
    data: CascadeData<T, V>,
    level?: number,
  }>(), {
    level: 0,
  })

  const children = ref<CascadeData<T, V>[]>()
  const selected = defineModel<CascadeMenuValue<V>[]>('selected', { required: true })

  const internalSelected = computed({
    get: () => selected.value[props.level],
    set: (value: CascadeMenuValue<V>) => {
      selected.value[props.level] = value
    }
  })
  
  const subpanel = ref<CascadeData<T, V>>()
  const subpanelIsOpen = computed(() => isDefined(subpanel.value))

  const classes = computed(() => ({
    main: {
      'p-cascade-panel__main--subpanel-open': subpanelIsOpen.value,
    }
  }))

  watch(() => internalSelected.value, (newValue, oldValue) => {
    if (!newValue) {
      return
    }
    
    if (newValue.length === 0) {
      subpanel.value = undefined
      
    } else {
      const mostRecentValue = newValue[newValue.length - 1]
      if (mostRecentValue) {
        if (props.data.value == mostRecentValue && subpanel.value?.value !== mostRecentValue) {
          subpanel.value = props.data
        } else {
          const child = children.value?.find(child => child.value === mostRecentValue)
          if (child?.children) {
            subpanel.value = child
          }
        }
      }
    }

    selected.value[props.level + 1] = []
  }, { deep: true })

  onMounted(async () => {
    children.value = await resolveChildren<T, V>(props.data)

    if (internalSelected.value?.length > 0) {
      const mostRecentValue = internalSelected.value[internalSelected.value.length - 1]
      if (mostRecentValue) {
        const child = children.value?.find(child => child.value === mostRecentValue)
        if (child?.children) {
          subpanel.value = child
        }
      }
    }
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