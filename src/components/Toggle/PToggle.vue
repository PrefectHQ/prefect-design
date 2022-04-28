<template>
  <SwitchGroup as="div" class="flex items-center">
    <SwitchLabel v-if="$slots.prepend" as="span" class="mr-3">
      <slot name="prepend" />
    </SwitchLabel>
    <Switch v-model="toggleModel" class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-prefect-500 bg-gray-200" :class="toggleClasses" :disabled="disabled">
      <span aria-hidden="true" class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" :class="toggleTranslate" />
    </Switch>
    <SwitchLabel v-if="$slots.append" as="span" class="ml-3">
      <slot name="append" />
    </SwitchLabel>
  </SwitchGroup>
</template>

<script lang="ts" setup>
  import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  import { computed } from 'vue'

  const props = defineProps<{
    modelValue: boolean,
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const toggleModel = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emits('update:modelValue', value)
    },
  })
  const toggleTranslate = computed(() => [toggleModel.value ? 'translate-x-5' : 'translate-x-0'])
  const toggleClasses = computed(() => ({ 'p-toggle--disable': props.disabled, 'bg-prefect-500': toggleModel.value }))
</script>

<style>
.p-toggle--disable {@apply
  cursor-not-allowed
  opacity-50
}
</style>
