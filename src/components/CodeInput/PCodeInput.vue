<template>
  <p-base-input class="p-code-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>

    <template v-if="showLineNumbers" #prepend>
      <div ref="target" class="p-code-input__line-numbers-wrapper">
        <PLineNumbers class="p-code-input__line-numbers" :lines="lines" />
      </div>
    </template>

    <template #control="{ attrs: ctrlAttrs }">
      <div ref="source" class="p-code-input__control" :class="classes.inputControl">
        <textarea
          v-model="internalValue"
          spellcheck="false"
          class="p-code-input__textarea"
          :rows="lines"
          v-bind="ctrlAttrs"
        />

        <div class="p-code-input__view-container">
          <template v-if="lang">
            <PCodeHighlight
              :lang="lang"
              multiline
              :text="internalValue"
              class="p-code-input__view"
              v-bind="ctrlAttrs"
            />
          </template>

          <template v-else>
            <PCode class="p-code-input__view" multiline v-bind="ctrlAttrs">
              {{ internalValue }}
            </PCode>
          </template>
        </div>
      </div>
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { PCode, PCodeHighlight, PLineNumbers } from '@/components'
  import { useScrollLinking } from '@/compositions'
  import { SupportedLanguage } from '@/types/codeHighlight'

  const props = defineProps<{
    modelValue: string | undefined,
    lang?: SupportedLanguage,
    showLineNumbers?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const { source, target } = useScrollLinking()

  const lines = computed(() => internalValue.value.split('\n').length)

  const internalValue = computed({
    get() {
      return props.modelValue ?? ''
    },
    set(val: string) {
      emit('update:modelValue', val)
    },
  })

  const classes = computed(() => ({
    inputControl: {
      'p-code-input__control--show-line-numbers': props.showLineNumbers,
    },
  }))
</script>

<style>
.p-code-input,
.p-code-input__control,
.p-code-input__textarea {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}

.p-code-input {
  @apply
  relative
  min-h-[100px]
  font-mono
  bg-background-500
  overflow-hidden
  p-0
}

.p-code-input__line-numbers-wrapper { @apply
  relative
  shrink-0
  grow-0
  h-full
  max-h-full
  w-min
  overflow-hidden
}

.p-code-input__line-numbers { @apply
  px-3
  py-4
  w-full
}

.p-code-input__control--show-line-numbers { @apply
  border-l
  border-background-400
  dark:border-foreground-200
}

.p-code-input__control { @apply
  grow
  h-full
  flex
  items-start
  justify-start
  overflow-auto
  min-h-[inherit]
  relative
  p-0
  z-[1]
}

.p-code-input__textarea {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  z-index: -1;

  @apply
  block
  grow
  rounded-l-none
  bg-background
  text-transparent
  overflow-hidden
  caret-foreground-500
  resize-none
  m-0
  p-4
  whitespace-nowrap
  top-0
}

.p-code-input__view-container {
  @apply
  absolute
  top-0
  left-0
  p-4
  pointer-events-none
  z-0
}

.p-code-input__view {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;

  @apply
  bg-transparent
  text-foreground
  p-0
}
</style>