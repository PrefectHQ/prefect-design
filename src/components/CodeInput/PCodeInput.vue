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
          @keyup="updateTextAreaWidth"
          @paste="updateTextAreaWidth"
        />

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
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import { useResizeObserver } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
  import { PCode, PCodeHighlight, PLineNumbers } from '@/components'
  import { useScrollLinking } from '@/compositions'
  import { SupportedLanguage } from '@/types/codeHighlight'

  const props = defineProps<{
    modelValue?: string | null | undefined,
    lang?: SupportedLanguage,
    showLineNumbers?: boolean,
    placeholder?: string,
    minLines?: number,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const textarea = ref()
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
    if (textarea.value) {
      return parseFloat(getComputedStyle(textarea.value).lineHeight)
    }

    return 0
  })

  const textAreaWidth = ref(0)

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

  const updateTextAreaWidth = (): void => {
    console.log('updateTextAreaWidth')
    if (textarea.value && source.value) {
      textAreaWidth.value = Math.max(textarea.value.scrollWidth, source.value.scrollWidth)
    }
  }

  const { observe } = useResizeObserver(updateTextAreaWidth)

  onMounted(() => {
    observe(textarea)
    observe(source)
  })

  const styles = computed(() => {
    return {
      textarea: {
        height: `${lineHeight.value * lines.value}px`,
        width: `${textAreaWidth.value}px`,
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
.p-code-input,
.p-code-input__view,
.p-code-input__control,
.p-code-input__textarea {
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
  bg-background-500
  font-mono
  overflow-hidden
  p-0
  relative
}

.p-code-input__line-numbers-wrapper { @apply
  grow-0
  h-full
  max-h-full
  overflow-hidden
  px-2
  py-4
  relative
  self-start
  shrink-0
  w-min
}

.p-code-input__line-numbers { @apply
  w-full
}

.p-code-input__control { @apply
  bg-background
  cursor-text
  grow
  h-full
  min-h-[inherit]
  overflow-auto
  p-0
  py-4
  relative
  rounded-lg
  self-stretch
  z-[1]
}

.p-code-input__control--show-line-numbers { @apply
  border-background-400
  border-l
  dark:border-foreground-200
  rounded-l-none
}

.p-code-input__textarea { @apply
  bg-transparent
  block
  caret-foreground-500
  m-0
  min-h-full
  min-w-full
  overflow-hidden
  p-0
  resize-none
  text-transparent
  whitespace-pre
}

.p-code-input__textarea::selection { @apply
  bg-foreground-200
  bg-opacity-50
}

.p-code-input__view { @apply
  absolute
  bg-transparent
  left-0
  min-h-full
  overflow-hidden
  p-0
  pointer-events-none
  py-4
  select-none
  text-foreground
  top-0
  z-0
}
</style>