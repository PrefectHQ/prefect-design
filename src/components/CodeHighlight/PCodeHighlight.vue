<template>
  <div class="p-code-highlight" :lines="lines" :class="classes.root">
    <template v-if="showLineNumbers">
      <PLineNumbers class="p-code-highlight__line-numbers" :lines="lines" />
    </template>

    <PCode :inline="inline" class="p-code-highlight__code-wrapper" :class="classes.codeWrapper">
      <PUnwrap :html="formattedText" />
    </PCode>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue'
  import { PCode, PUnwrap, PLineNumbers } from '@/components'
  import HighlightWorker from '@/components/CodeHighlight/worker?worker&inline'
  import type { FormattedMessagePayload, SupportedLanguage } from '@/types/codeHighlight'

  const props = defineProps<{
    text: string,
    lang: SupportedLanguage,
    showLineNumbers?: boolean,
    inline?: boolean,
  }>()

  const worker: Worker = new HighlightWorker()
  const formattedText = ref('')

  const lines = computed(() => props.text.split('\n').length)
  const showLineNumbers = computed(() => !props.inline && props.showLineNumbers)

  const classes = computed(() => ({
    root: {
      'p-code-highlight--inline': props.inline,
    },
    codeWrapper: {
      'p-code-highlight__code-wrapper--show-line-numbers': showLineNumbers.value,
    },
  }))

  const handleWorkerMessage = (message: FormattedMessagePayload): void => {
    formattedText.value = message.formatted
  }

  worker.onmessage = (event: MessageEvent<FormattedMessagePayload>) => handleWorkerMessage(event.data)

  watch(() => [props.lang, props.text], ([lang, text]) => {
    worker.postMessage({ text, lang })
  }, { immediate: true })
</script>

<style>
.p-code-highlight {
  tab-size: 4;
  hyphens: none;

  @apply
  bg-code
  flex
  rounded-default
  font-mono
  py-0
  px-1
  overflow-auto
}

.p-code-highlight--inline { @apply
  inline-flex
}

.p-code-highlight__code-wrapper {
  font-size: inherit;

  @apply
  p-0
  bg-transparent
  text-code
}

.p-code-highlight__code-wrapper--show-line-numbers { @apply
  pl-2
  rounded-l-none
  border-l
  border-divider
  py-1
}

.p-code-highlight__line-numbers { @apply
  px-2
  py-1
}

.p-code-highlight__code-wrapper .hljs-subst,
.p-code-highlight__code-wrapper .hljs { @apply
  text-code
}

/* Comment */
.p-code-highlight__code-wrapper .hljs-comment {
  color: var(--p-color-syntax-comment);
}

/* Quote */
.p-code-highlight__code-wrapper .hljs-quote { @apply
  italic
}

/* Red */
.p-code-highlight__code-wrapper .hljs-variable,
.p-code-highlight__code-wrapper .hljs-template-variable,
.p-code-highlight__code-wrapper .hljs-tag,
.p-code-highlight__code-wrapper .hljs-name,
.p-code-highlight__code-wrapper .hljs-selector-id,
.p-code-highlight__code-wrapper .hljs-selector-class,
.p-code-highlight__code-wrapper .hljs-regexp,
.p-code-highlight__code-wrapper .hljs-deletion {
  color: var(--p-color-syntax-selector);
}

/* Orange */
.p-code-highlight__code-wrapper .hljs-number,
.p-code-highlight__code-wrapper .hljs-built_in,
.p-code-highlight__code-wrapper .hljs-literal,
.p-code-highlight__code-wrapper .hljs-type,
.p-code-highlight__code-wrapper .hljs-params,
.p-code-highlight__code-wrapper .hljs-meta,
.p-code-highlight__code-wrapper .hljs-link {
  color: var(--p-color-syntax-parameter);
}

/* Yellow */
.p-code-highlight__code-wrapper .hljs-attr,
.p-code-highlight__code-wrapper .hljs-attribute {
  color: var(--p-color-syntax-attribute);
}

/* Green */
.p-code-highlight__code-wrapper .hljs-string,
.p-code-highlight__code-wrapper .hljs-symbol,
.p-code-highlight__code-wrapper .hljs-bullet,
.p-code-highlight__code-wrapper .hljs-addition {
  color: var(--p-color-syntax-symbol);
}

/* Blue */
.p-code-highlight__code-wrapper .hljs-title,
.p-code-highlight__code-wrapper .hljs-section {
  color: var(--p-color-syntax-title);
}

/* Purple */
.p-code-highlight__code-wrapper .hljs-keyword,
.p-code-highlight__code-wrapper .hljs-selector-tag {
  color: var(--p-color-syntax-keyword);
}

.p-code-highlight__code-wrapper .hljs-code { @apply
  font-mono
}

.p-code-highlight__code-wrapper .hljs-strikethrough { @apply
  line-through
}

.p-code-highlight__code-wrapper .hljs-emphasis { @apply
  italic
}

.p-code-highlight__code-wrapper .hljs-strong { @apply
  font-bold
}

@media screen and (-ms-high-contrast: active) {
  .p-code-highlight__code-wrapper .hljs-addition,
  .p-code-highlight__code-wrapper .hljs-attr,
  .p-code-highlight__code-wrapper .hljs-built_in,
  .p-code-highlight__code-wrapper .hljs-bullet,
  .p-code-highlight__code-wrapper .hljs-comment,
  .p-code-highlight__code-wrapper .hljs-link,
  .p-code-highlight__code-wrapper .hljs-literal,
  .p-code-highlight__code-wrapper .hljs-meta,
  .p-code-highlight__code-wrapper .hljs-number,
  .p-code-highlight__code-wrapper .hljs-params,
  .p-code-highlight__code-wrapper .hljs-string,
  .p-code-highlight__code-wrapper .hljs-symbol,
  .p-code-highlight__code-wrapper .hljs-type,
  .p-code-highlight__code-wrapper .hljs-quote {
    color: highlight;
  }

  .p-code-highlight__code-wrapper .hljs-keyword,
  .p-code-highlight__code-wrapper .hljs-selector-tag { @apply
    font-medium
  }
}
</style>