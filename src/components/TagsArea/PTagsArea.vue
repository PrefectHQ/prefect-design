<template>
  <div class="p-tags-area">
    <slot :tags="internalValue" :remove-tag="removeTag">
      <div class="p-tags-area__tags">
        <template v-for="tag in internalValue" :key="tag">
          <button type="button" class="p-tags-area__tag" :disabled="disabled" @click="editTag(tag)">
            <slot name="tag" :tag="tag" :remove-tag="removeTag">
              <PTag :dismissible="!disabled" @dismiss="removeTag(tag)">
                {{ tag }}
              </PTag>
            </slot>
          </button>
        </template>
      </div>
    </slot>
    <PBaseInput v-bind="$attrs">
      <template v-for="(index, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
      <template #control="{ attrs }">
        <input
          v-model="newTag"
          type="text"
          class="p-tags-area__input"
          v-bind="{ ...attrs, disabled }"
          @keydown="handleKeydown"
          @blur="handleBlur"
        >
      </template>
    </PBaseInput>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PTagsArea',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'
  import PTag from '@/components/Tag/PTag.vue'
  import { keys } from '@/types/keyEvent'

  const props = defineProps<{
    modelValue: string[] | null | undefined,
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string[]): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? []
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const newTag = ref<string | null>(null)

  function removeTag(tag: string): void {
    const value = internalValue.value.filter(x => x !== tag)

    internalValue.value = value
  }

  function editTag(tag: string): void {
    newTag.value = tag
    removeTag(tag)
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === keys.enter && trySubmitNewTag()) {
      event.preventDefault()
    }
  }

  function handleBlur(): void {
    trySubmitNewTag()
  }

  function validateNewTag(tag: string | null): tag is string {
    return !!newTag.value?.length && !internalValue.value.includes(newTag.value)
  }

  function trySubmitNewTag(): boolean {
    if (!validateNewTag(newTag.value)) {
      return false
    }

    internalValue.value = [...internalValue.value, newTag.value]
    newTag.value = null

    return true
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
  bg-transparent
  w-full
  rounded-default
  outline-none
  border-none
  ring-0
  focus:ring-0
}

.p-tags-area__input:disabled { @apply
  cursor-not-allowed
}
</style>