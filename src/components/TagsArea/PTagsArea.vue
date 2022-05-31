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
    <BaseInput v-bind="$attrs">
      <template v-for="(index, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
      <template #control="{ attrs }">
        <input v-model="newTag" type="text" class="p-tags-area__input" v-bind="attrs" @keydown="handleKeydown">
      </template>
    </BaseInput>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'

  export default defineComponent({
    name: 'PTagsArea',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import BaseInput from '@/components/BaseInput/BaseInput.vue'
  import PTag from '@/components/Tag/PTag.vue'
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

.p-tags-area__input { @apply
  w-full
  rounded-md
  outline-none
  border-none
  ring-0
  focus:ring-0
}
</style>