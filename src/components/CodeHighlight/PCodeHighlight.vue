<template>
  <div class="p-code-highlight" :class="classes.root">
    <template v-if="showLineNumbers && multiline">
      <div class="p-code-highlight__line-numbers">
        <div
          v-for="i in splitText.length"
          :key="i"
          class="p-code-highlight__line-number"
        >
          {{ i }}
        </div>
      </div>
    </template>

    <PCode v-bind="attrs" :multiline="multiline" class="p-code-highlight__code-wrapper" :class="classes.codeWrapper">
      <PUnwrap :html="formattedText" />
    </PCode>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PCodeHighlight',
    expose: [],
    components: { PCode },
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { onMounted, ref, computed, useAttrs } from 'vue'
  import { PCode, PUnwrap } from '@/components'
  import type { FormattedMessagePayload, SupportedLanguage } from '@/components/CodeHighlight/types'
  import HighlightWorker from '@/components/CodeHighlight/worker?worker&inline'

  const props = defineProps<{
    text: string,
    lang: SupportedLanguage,
    showLineNumbers?: boolean,
    multiline?: boolean,
  }>()

  const attrs = useAttrs()

  const worker: Worker = new HighlightWorker()
  const loading = ref(true)
  const formattedText = ref('')
  const splitText = computed(() => props.text.split('\n'))

  const classes = computed(() => ({
    root: {
      'p-code-highlight--multiline': props.multiline,
    },
    codeWrapper: {
      'p-code-highlight__code-wrapper--show-line-numbers': props.multiline && props.showLineNumbers,
    },
  }))

  const handleWorkerMessage = (message: FormattedMessagePayload): void => {
    formattedText.value = message.formatted
    loading.value = false
  }

  worker.onmessage = (event: MessageEvent<FormattedMessagePayload>) => handleWorkerMessage(event.data)

  onMounted(() => {
    const { text, lang } = props
    worker.postMessage({ text, lang })
  })
</script>

<style>
.p-code-highlight { @apply
  inline-flex
  bg-background-500
  rounded-md
}

.p-code-highlight--multiline { @apply
  flex
}

.p-code-highlight__line-numbers { @apply
  text-right
  shrink
  w-min
  text-base
  font-mono
  py-2
  text-foreground-100
  dark:text-foreground-200
  px-3
}

.p-code-highlight__code-wrapper { @apply
  grow
  overflow-x-auto
}

.p-code-highlight__code-wrapper--show-line-numbers { @apply
  pl-2
  rounded-l-none
}


/* TODO: It'd be great to move each of these to CSS variables that could be themed more easily */
.p-code-highlight__code-wrapper .hljs { @apply
  text-slate-50
}

/* Comment */
.p-code-highlight__code-wrapper .hljs-comment { @apply
  text-slate-400
}

/* Quote */
.p-code-highlight__code-wrapper .hljs-quote { @apply
  text-slate-100
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
  text-rose-400
}

/* Orange */
.p-code-highlight__code-wrapper .hljs-number,
.p-code-highlight__code-wrapper .hljs-built_in,
.p-code-highlight__code-wrapper .hljs-literal,
.p-code-highlight__code-wrapper .hljs-type,
.p-code-highlight__code-wrapper .hljs-params,
.p-code-highlight__code-wrapper .hljs-meta,
.p-code-highlight__code-wrapper .hljs-link { @apply
  text-orange-400
}

/* Yellow */
.p-code-highlight__code-wrapper .hljs-attr,
.p-code-highlight__code-wrapper .hljs-attribute { @apply
  text-amber-400
}

/* Green */
.p-code-highlight__code-wrapper .hljs-string,
.p-code-highlight__code-wrapper .hljs-symbol,
.p-code-highlight__code-wrapper .hljs-bullet,
.p-code-highlight__code-wrapper .hljs-addition { @apply
  text-emerald-400
}

/* Blue */
.p-code-highlight__code-wrapper .hljs-title,
.p-code-highlight__code-wrapper .hljs-section { @apply
  text-sky-400
}

/* Purple */
.p-code-highlight__code-wrapper .hljs-keyword,
.p-code-highlight__code-wrapper .hljs-selector-tag { @apply
  text-fuchsia-400
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