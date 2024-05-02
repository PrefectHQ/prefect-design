<template>
  <PDialog v-bind="forwarded">
    <PDialogContent class="overflow-hidden p-0 shadow-lg">
      <Command class="p-command-dialog">
        <slot />
      </Command>
    </PDialogContent>
  </PDialog>
</template>

<script setup lang="ts">
  import { useForwardPropsEmits, type DialogRootEmits, type DialogRootProps } from 'radix-vue'
  import Command from '@/components/Command/PCommand.vue'
  import PDialog from '@/components/Dialog/PDialogBase.vue'
  import PDialogContent from '@/components/Dialog/PDialogContent.vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DialogRootProps>()
  const emits = defineEmits<DialogRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>

<style>
.p-command-dialog {
  @apply
  [&_[cmdk-group-heading]]:px-2
  [&_[cmdk-group-heading]]:font-medium
  [&_[cmdk-group-heading]]:text-muted-foreground
  [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0
  [&_[cmdk-group]]:px-2
  [&_[cmdk-input-wrapper]_svg]:h-5
  [&_[cmdk-input-wrapper]_svg]:w-5
  [&_[cmdk-input]]:h-12
  [&_[cmdk-item]]:px-2
  [&_[cmdk-item]]:py-3
  [&_[cmdk-item]_svg]:h-5
  [&_[cmdk-item]_svg]:w-5;
}
</style>