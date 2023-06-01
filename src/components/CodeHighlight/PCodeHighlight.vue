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
  flex
  bg-background
  shadow
  rounded-lg
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
  text-foreground-300
}

.p-code-highlight__code-wrapper--show-line-numbers { @apply
  pl-2
  rounded-l-none
  border-l
  border-background-400
  dark:border-foreground-200
  py-1
}

.p-code-highlight__line-numbers { @apply
  px-2
  py-1
}

/* TODO: It'd be great to move each of these to CSS variables that could be themed more easily */
.p-code-highlight__code-wrapper .hljs-subst,
.p-code-highlight__code-wrapper .hljs { @apply
  text-foreground-300
}

/* Comment */
.p-code-highlight__code-wrapper .hljs-comment { @apply
  text-foreground-200
}

/* Quote */
.p-code-highlight__code-wrapper .hljs-quote { @apply
  text-foreground-200
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
.p-code-highlight__code-wrapper .hljs-deletion { @apply
  text-rose-500
}

/* Orange */
.p-code-highlight__code-wrapper .hljs-number,
.p-code-highlight__code-wrapper .hljs-built_in,
.p-code-highlight__code-wrapper .hljs-literal,
.p-code-highlight__code-wrapper .hljs-type,
.p-code-highlight__code-wrapper .hljs-params,
.p-code-highlight__code-wrapper .hljs-meta,
.p-code-highlight__code-wrapper .hljs-link { @apply
  text-orange-500
}

/* Yellow */
.p-code-highlight__code-wrapper .hljs-attr,
.p-code-highlight__code-wrapper .hljs-attribute { @apply
  text-amber-500
}

/* Green */
.p-code-highlight__code-wrapper .hljs-string,
.p-code-highlight__code-wrapper .hljs-symbol,
.p-code-highlight__code-wrapper .hljs-bullet,
.p-code-highlight__code-wrapper .hljs-addition { @apply
  text-emerald-500
}

/* Blue */
.p-code-highlight__code-wrapper .hljs-title,
.p-code-highlight__code-wrapper .hljs-section { @apply
  text-sky-500
}

/* Purple */
.p-code-highlight__code-wrapper .hljs-keyword,
.p-code-highlight__code-wrapper .hljs-selector-tag { @apply
  text-fuchsia-500
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