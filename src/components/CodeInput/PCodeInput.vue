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
        <textarea
          ref="textarea"
          v-model="internalValue"
          spellcheck="false"
          class="p-code-input__textarea"
          :placeholder="placeholder"
          :rows="lines"
          :class="classes.textArea"
          :style="styles.textarea"
          v-bind="ctrlAttrs"
        />
        <div ref="view" class="p-code-input__view-container">
          <template v-if="lang">
            <PCodeHighlight
              :lang="lang"
              :text="internalValue"
              class="p-code-input__view"
              :style="styles.view"
              v-bind="ctrlAttrs"
            />
          </template>

          <template v-else>
            <PCode class="p-code-input__view" :style="styles.view" v-bind="ctrlAttrs">
              {{ internalValue }}
            </PCode>
          </template>
        </div>
      </div>
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import { useComputedStyle, useElementRect } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { PCode, PCodeHighlight, PLineNumbers } from '@/components'
  import { useScrollLinking } from '@/compositions'
  import { SupportedLanguage } from '@/types/codeHighlight'

  const props = defineProps<{
    modelValue: string | null | undefined,
    lang?: SupportedLanguage,
    showLineNumbers?: boolean,
    placeholder?: string,
    minLines?: number,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const textarea = ref()
  const textareaStyle = useComputedStyle(textarea)

  const view = ref()
  const { width } = useElementRect(view)

  const { source, target } = useScrollLinking()

  const lineSplitRegex = /\r|\r\n|\n/
  const valueLines = computed(() => {
    if (internalValue.value !== '') {
      return internalValue.value.split(lineSplitRegex)
    }

    if (props.placeholder) {
      return props.placeholder.split(lineSplitRegex)
    }

    return []
  })

  const lines = computed(() => Math.max(valueLines.value.length, props.minLines ?? 1))
  const lineHeight = computed(() => {
    if (textareaStyle.value) {
      return parseFloat(textareaStyle.value.lineHeight)
    }

    return 0
  })

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

  const styles = computed(() => {
    return {
      textarea: {
        height: `${lineHeight.value * lines.value}px`,
        width: width.value ? `${width.value}px` : '100%',
      },
      view: {
        height: `${lineHeight.value * lines.value}px`,
      },
    }
  })

  const handleInputControlClick = (): void => {
    if (textarea.value) {
      textarea.value.focus()
    }
  }
</script>

<style>
.p-code-input {
  --gap-x: var(--p-code-input-gap-x, 0.5rem);
  --gap-y: var(--p-code-input-gap-y, 1rem);
}

.p-code-input,
.p-code-input__view,
.p-code-input__control,
.p-code-input__textarea,
.p-code-input__line-numbers-wrapper {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}

.p-code-input__textarea,
.p-code-input__view {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

.p-code-input { @apply
  bg-code
  text-code
  font-mono
  overflow-hidden
  p-0
  relative
}

.p-code-input__line-numbers-wrapper { @apply
  bg-transparent
  border-divider
  border-r
  grow-0
  overflow-hidden
  px-[var(--gap-x)]
  py-[var(--gap-y)]
  relative
  rounded-r-none
  self-stretch
  shrink-0
  w-min
}

.p-code-input__line-numbers { @apply
  w-full
}

.p-code-input__control { @apply
  bg-code
  cursor-text
  grow
  h-full
  max-h-[inherit]
  min-h-[inherit]
  overflow-auto
  p-0
  py-[var(--gap-y)]
  relative
  self-stretch
  z-[1];
  scrollbar-gutter: stable;
  scrollbar-width: thin;
}

.p-code-input__textarea { @apply
  bg-transparent
  block
  caret-default
  m-0
  min-h-full
  min-w-full
  overflow-hidden
  p-0
  px-[var(--gap-x)]
  resize-none
  text-transparent
  whitespace-pre
}

.p-code-input__textarea:disabled { @apply
  cursor-not-allowed
}

.p-code-input__textarea::selection {
  background-color: var(--p-color-selection-highlight);
}

.p-code-input__view { @apply
  bg-transparent
  min-h-full
  min-w-full
  p-0
}

.p-code-input__view-container { @apply
  absolute
  left-0
  min-h-full
  min-w-full
  overflow-hidden
  top-0
  z-0
  px-[var(--gap-x)]
  pt-[var(--gap-y)]
  pointer-events-none
  select-none
}
</style>