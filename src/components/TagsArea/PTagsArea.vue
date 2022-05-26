<template>
  <div class="p-tags-area">
    <slot :tags="internalValue" :remove-tag="removeTag">
      <div class="p-tags-area__tags">
        <template v-for="tag in internalValue" :key="tag">
          <slot name="tag" :tag="tag" :remove-tag="removeTag">
            <PTag dismissible @dismiss="removeTag(tag)">
              {{ tag }}
            </PTag>
          </slot>
        </template>
      </div>
    </slot>
    <PTextInput v-model="newTag" @keydown="handleKeydown" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PTag from '@/components/Tag/PTag.vue'
  import PTextInput from '@/components/TextInput'
  import { keys } from '@/types'

  const props = defineProps<{
    tags: string[] | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:tags', value: string[]): void,
  }>()

  const internalValue = computed({
    get() {
      return props.tags ?? []
    },
    set(value: string[]) {
      emits('update:tags', value)
    },
  })

  const newTag = ref<string | null>(null)

  function removeTag(tag: string): void {
    const value = internalValue.value.filter(x => x !== tag)

    internalValue.value = value
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === keys.enter) {
      submitNewTag()
    }
  }

  function validateNewTag(tag: string | null): tag is string  {
    return !!newTag.value?.length && !internalValue.value.includes(newTag.value)
  }

  function submitNewTag(): void {
    if (validateNewTag(newTag.value)) {
      internalValue.value.push(newTag.value)
    }

    newTag.value = null
  }
</script>

<style>
.p-tags-area__tags { @apply
  flex
  flex-wrap
  gap-1
  mb-2
}
</style>