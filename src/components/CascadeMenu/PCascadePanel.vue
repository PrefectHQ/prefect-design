<template>
  <div class="p-cascade-panel">
    <PCard class="p-cascade-panel__main" :class="classes.main">
      <template v-for="childData in children" :key="childData.label">
        <PCascadeMenuItem v-model:value="value" :data="childData" :multiple="data.multiple">
          <slot name="menu-item" v-bind="{ data: childData, value }" />
        </PCascadeMenuItem>
      </template>
    </PCard>

    <template v-if="subpanel">
      <slot name="subpanel" v-bind="{ data: subpanel, value }">
        <PCascadePanel
          v-model:value="value"
          :data="subpanel"
          :level="level + 1"
          class="p-cascade-panel__subpanel"
        />
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue'
  import { PCard, PCascadeMenuItem } from '@/components'
  import { CascadeData, resolveChildren, CascadeValue, valueIsSet, valueIncludesValue } from '@/utilities'

  const props = withDefaults(defineProps<{
    data: CascadeData,
    level?: number,
  }>(), {
    level: 0,
  })

  const children = ref<CascadeData[]>()
  const value = defineModel<CascadeValue>('value', { required: true })

  const valueIsInChildren = computed(() => {
    if (!children.value || !valueIsSet(value.value)) {
      return false
    }

    return children.value.some((child) => valueIncludesValue(value.value, child.value))
  })

  const subpanel = computed(() => {
    if (!children.value || !valueIsSet(value.value)) {
      return
    }

    if (valueIsInChildren.value) {
      return children.value.find((child) => valueIncludesValue(value.value, child.value))
    }

    return children.value.find((child) => valueIncludesValue(value.value, child.value))
  })

  const classes = computed(() => ({
    main: {
      'p-cascade-panel__main--subpanel-open': subpanel.value,
    },
  }))

  onMounted(async () => {
    children.value = await resolveChildren(props.data)
    console.log('resolved children', JSON.parse(JSON.stringify(children.value)))
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