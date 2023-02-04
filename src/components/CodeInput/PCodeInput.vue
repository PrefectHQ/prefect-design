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
      <div ref="source" class="p-code-input__control" :class="classes.inputControl" @click.self="handleInputControlClick">
        <div class="p-code-input__textarea-view-container">
          <textarea
            ref="textarea"
            v-model="internalValue"
            spellcheck="false"
            class="p-code-input__textarea"
            :rows="rows"
            :class="classes.textArea"
            v-bind="ctrlAttrs"
          />

          <div class="p-code-input__view-container">
            <template v-if="lang">
              <PCodeHighlight
                :lang="lang"
                :text="internalValue"
                class="p-code-input__view"
                v-bind="ctrlAttrs"
              />
            </template>

            <template v-else>
              <PCode class="p-code-input__view" v-bind="ctrlAttrs">
                {{ internalValue }}
              </PCode>
            </template>
          </div>
        </div>
      </div>
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { PCode, PCodeHighlight, PLineNumbers } from '@/components'
  import { useScrollLinking } from '@/compositions'
  import { SupportedLanguage } from '@/types/codeHighlight'

  const props = defineProps<{
    modelValue: string | null | undefined,
    lang?: SupportedLanguage,
    showLineNumbers?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const textarea = ref()
  const { source, target } = useScrollLinking()

  const valueLines = computed(() => internalValue.value.split('\n').length)
  const lines = computed(() => Math.max(valueLines.value - 1, 1))
  const rows = computed(() => lines.value + 1)

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
    textArea: {
      'p-code-input__textarea--show-line-numbers': props.showLineNumbers,
    },
  }))

  const handleInputControlClick = (): void => {
    if (textarea.value) {
      textarea.value.focus()
    }
  }
</script>

<style>
.p-code-input,
.p-code-input__control,
.p-code-input__textarea,
.p-code-input__textarea-view-container {
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
  overflow-auto
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


.p-code-input__control { @apply
  grow
  h-full
  flex
  items-start
  justify-start
  overflow-auto
  overscroll-contain
  bg-background
  rounded-lg
  min-h-[inherit]
  relative
  p-0
  cursor-text
  z-[1]
}

.p-code-input__control--show-line-numbers { @apply
  border-l
  border-background-400
  dark:border-foreground-200
  rounded-l-none
}

.p-code-input__textarea {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;

  @apply
  block
  grow
  bg-transparent
  text-transparent
  overflow-hidden
  caret-foreground-500
  resize-none
  m-0
  p-4
  whitespace-nowrap
  box-content
  min-h-[1rem]
  min-w-[1rem]
  top-0
  left-0
  bottom-0
  right-0
  absolute
  w-full
  z-0
}

.p-code-input__textarea-view-container { @apply
  relative
}

.p-code-input__view-container {
  @apply
  top-0
  left-0
  p-4
  pointer-events-none
  overflow-hidden
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
  overflow-hidden
}
</style>