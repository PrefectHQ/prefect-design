<template>
  <div class="p-cascade-menu">
    <CascadeMenuItem :item="data" :active="active" @click="handleClick" />
    <!--
      <template #default="{}">
      <template v-for="child in children" :key="child.label">
      <CascadeMenu v-model:value="value" :data="child" :active="itemIsSelected(data)" />
      </template>
      </template>
    -->
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  // import PCascadeMenuItem from '@/components/CascadeMenuItem.vue'
  import { CascadeData, resolveChildren } from '@/utilities'

  const props = defineProps<{
    data: CascadeData,
  }>()

  const value = defineModel<CascadeData['value']>('value')

  const active = ref(false)
  const loading = ref(false)

  const children = ref<CascadeData[]>([])

  const itemIsSelected = (item: CascadeData): boolean => {
    return false
    // return isEqual(value.value, item.value)
  }

  const handleClick = async (): Promise<void> => {
    // if (itemIsSelected(props.data)) {
    //   value.value = undefined
    //   return
    // }

    loading.value = true

    // const _children = await resolveChildren(props.data)
    // children.value = _children ?? []

    value.value = props.data.value
    loading.value = false
  }
</script>

<style>
.p-cascade-menu { @apply
  text-sm
  min-w-48
  w-full
}
</style>