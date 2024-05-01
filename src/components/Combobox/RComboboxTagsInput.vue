<template>
  <TagsInputRoot
    v-model="modelValue"
    class="flex gap-2 items-center border px-2 py-1 rounded-default w-full flex-wrap border-[var(--p-color-input-border)] bg-[var(--p-color-input-bg)]"
  >
    <TagsInputItem v-for="item in modelValue" :key="item" :value="item" class="text-[var(--p-color-tag-text)] flex shadow-md items-center justify-center gap-2 bg-[var(--p-color-tag-bg)] aria-[current=true]:border-2 border-[var(--p-color-divider)] rounded-default p-0.5">
      <TagsInputItemText v-if="$slots['item-text']" as-child>
        <slot name="item-text" :item="item" />
      </TagsInputItemText>
      <TagsInputItemText v-else class="text-sm pl-1" />

      <TagsInputItemDelete class="p-0.5 rounded bg-transparent hover:bg-[var(--p-color-selectable-hover)]">
        <PIcon icon="XMarkIcon" size="small" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <ComboboxInput as-child>
      <TagsInputInput v-model="searchTerm" :placeholder class="text-sm focus:outline-none flex-1 rounded-default border-none bg-transparent placeholder:text-subdued px-1" @keydown.enter.prevent />
    </ComboboxInput>

    <TagsInputClear>
      <PIcon icon="XMarkIcon" size="small" />
    </TagsInputClear>
  </TagsInputRoot>
</template>

<script setup lang="ts">
  import { ComboboxInput, TagsInputClear, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot } from 'radix-vue'
  import { watch } from 'vue'

  const modelValue = defineModel<string[]>()
  const searchTerm = defineModel<string>('searchTerm')
  defineProps<{
    placeholder?: string,
  }>()

  defineSlots<{
    'item-text': (props: { item: string }) => unknown,
  }>()

  watch(() => modelValue.value, () => {
    searchTerm.value = 'bobbers'
  }, { deep: true })
</script>