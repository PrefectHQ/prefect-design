<template>
  <TagsInputRoot
    v-model="modelValue"
    class="flex gap-2 items-center border p-2 rounded-default w-full max-w-[480px] flex-wrap border-[var(--p-color-input-border)] bg-[var(--p-color-input-bg)]"
  >
    <TagsInputItem v-for="item in modelValue" :key="item" :value="item" class="text-[var(--p-color-tag-text)] flex shadow-md items-center justify-center gap-2 bg-[var(--p-color-tag-bg)] aria-[current=true]:border-2 border-[var(--p-color-divider)] rounded-default p-1">
      <TagsInputItemText class="text-sm pl-1" />
      <TagsInputItemDelete class="p-0.5 rounded bg-transparent hover:bg-[var(--p-color-selectable-hover)]">
        <PIcon icon="XMarkIcon" size="small" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput :placeholder class="text-sm focus:outline-none flex-1 rounded-default border-none bg-transparent placeholder:text-subdued px-1" />
  </TagsInputRoot>
</template>

<script setup lang="ts">
  import { TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot } from 'radix-vue'

  const modelValue = defineModel<string[]>()
  defineProps<{
    placeholder?: string,
  }>()
</script>