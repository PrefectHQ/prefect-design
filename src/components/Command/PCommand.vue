<template>
  <PCommandBase class="rounded-lg border shadow-md max-w-[450px]" v-bind="forwarded">
    <PCommandInput :placeholder="placeholder" />
    <PCommandList>
      <PCommandEmpty>No results found.</PCommandEmpty>
      <slot />
    </PCommandList>
  </PCommandBase>
</template>

<script setup lang="ts">
  import { useForwardPropsEmits, type ComboboxRootEmits, type ComboboxRootProps, ComboboxItem } from 'radix-vue'
  import PCommandBase from '@/components/Command/PCommandBase.vue'
  import PCommandEmpty from '@/components/Command/PCommandEmpty.vue'
  import PCommandGroup from '@/components/Command/PCommandGroup.vue'
  import PCommandInput from '@/components/Command/PCommandInput.vue'
  import PCommandItem from '@/components/Command/PCommandItem.vue'
  import PCommandList from '@/components/Command/PCommandList.vue'
  import PCommandSeparator from '@/components/Command/PCommandSeparator.vue'
  import PCommandShortcut from '@/components/Command/PCommandShortcut.vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = withDefaults(defineProps<ComboboxRootProps & { placeholder?: string, items?: Record<string, (typeof ComboboxItem)[]> }>(), {
    open: true,
    modelValue: '',
    items: () => ({}),
    placeholder: 'Search...',
  })

  const emits = defineEmits<ComboboxRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>