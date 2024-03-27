<template>
  <div class="p-cascade-panel">
    <PCard class="p-cascade-panel__main" :class="classes.main">
      <template v-for="child in data.children" :key="child.label">
        <PCascadeMenuItem :data="child" @click="toggleItem(child)" />
      </template>
    </PCard>

    <template v-if="selectedItem && selectedItem.children">
      <PCascadePanel :data="selectedItem" class="p-cascade-panel__subpanel" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { CascadeData, isDefined, resolveChildren } from '@/utilities'
  import { PCard, PCascadeMenuItem } from '@/components'
  import { onMounted, ref, computed } from 'vue'

  const props = defineProps<{
    data: CascadeData,
  }>()

  const children = ref<CascadeData[]>()
  const selectedItem = ref<CascadeData>()

  const toggleItem = (item: CascadeData) => {
      // TODO: This isn't the right comparision
      if (selectedItem.value?.label === item.label) {
        selectedItem.value = undefined
      } else {
        selectedItem.value = item
      }
  }

  const classes = computed(() => ({
    main: {
      'p-cascade-panel__main--subpanel-open': isDefined(selectedItem.value) && isDefined(selectedItem.value.children),
    }
  }))

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