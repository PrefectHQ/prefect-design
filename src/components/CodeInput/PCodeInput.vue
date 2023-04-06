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

  const valueLines = computed(() => internalValue.value.split(/\r|\r\n|\n/))
  const lines = computed(() => Math.max(valueLines.value.length, 1))
  const rows = computed(() => valueLines.value.length)

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
.p-code-input__view,
.p-code-input__control,
.p-code-input__textarea,
.p-code-input__textarea-view-container {
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
  min-h-[100px]
  overflow-auto
  p-0
  relative
}

.p-code-input__line-numbers-wrapper { @apply
  grow-0
  h-full
  max-h-full
  overflow-hidden
  relative
  shrink-0
  w-min
}

.p-code-input__line-numbers { @apply
  px-3
  py-4
  w-full
}

.p-code-input__control { @apply
  bg-background
  cursor-text
  flex
  grow
  h-full
  items-start
  justify-start
  min-h-[inherit]
  overflow-auto
  p-0
  relative
  rounded-lg
  z-[1]
}

.p-code-input__control--show-line-numbers { @apply
  border-l
  border-background-400
  dark:border-foreground-200
  rounded-l-none
}

.p-code-input__textarea { @apply
  absolute
  bg-transparent
  block
  box-content
  caret-foreground-500
  grow
  h-min
  left-0
  m-0
  min-h-[1.5rem]
  min-w-[1.5rem]
  overflow-hidden
  p-0
  resize-none
  right-0
  text-transparent
  top-0
  w-full
  whitespace-pre-wrap
  z-0
}

.p-code-input__textarea-view-container { @apply
  relative
  ml-4
  mt-4
  pr-4
}

.p-code-input__view-container { @apply
  overflow-hidden
  pointer-events-none
  min-h-full
  z-0
}

.p-code-input__view { @apply
  bg-transparent
  overflow-hidden
  min-h-full
  p-0
  text-foreground
}
</style>