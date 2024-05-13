<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>

<script setup lang="ts">
  import { TabsRoot, useForwardPropsEmits, type TabsRootProps, type TabsRootEmits } from 'radix-vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<TabsRootProps>()
  const emits = defineEmits<TabsRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>